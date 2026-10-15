// lib/tutor-v4/question-banks/maths/cm2/probabilites.bank.ts

import type {
  TutorBankItemV4,
  TutorGeneratedQuestionV4,
  CanvasProbabilitesData,
} from "@/lib/tutor-v4/types";
import { PRENOMS, de, type Prenom } from "@/lib/tutor-v4/questionBank/6e/maths/entiers.bank";

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: readonly T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
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

function probabilitesCanvas(
  data: Omit<CanvasProbabilitesData, "kind">
): CanvasProbabilitesData {
  return {
    kind: "probabilites",
    ...data,
  };
}

// ============================================================
// COULEURS
// ============================================================

const COULEURS = {
  rouge: "#ef4444",
  bleu: "#3b82f6",
  vert: "#22c55e",
  jaune: "#eab308",
  violet: "#a855f7",
  orange: "#f97316",
};

// ============================================================
// HELPERS CANVAS
// ============================================================

type DeFace = 1 | 2 | 3 | 4 | 5 | 6;

function deCanvas(surligne?: DeFace[]): CanvasProbabilitesData {
  return probabilitesCanvas({
    variant: "de",
    de: {
      faces: [1, 2, 3, 4, 5, 6],
      surligne,
    },
  });
}

function roueSimpleCanvas(): CanvasProbabilitesData {
  return probabilitesCanvas({
    variant: "roue",
    roue: {
      segments: [
        { label: "Rouge", poids: 1, couleur: COULEURS.rouge },
        { label: "Bleu", poids: 1, couleur: COULEURS.bleu },
        { label: "Vert", poids: 1, couleur: COULEURS.vert },
        { label: "Jaune", poids: 1, couleur: COULEURS.jaune },
      ],
    },
  });
}

function roueRougeFavoriCanvas(): CanvasProbabilitesData {
  return probabilitesCanvas({
    variant: "roue",
    roue: {
      segments: [
        { label: "Rouge", poids: 3, couleur: COULEURS.rouge },
        { label: "Bleu", poids: 1, couleur: COULEURS.bleu },
        { label: "Vert", poids: 1, couleur: COULEURS.vert },
        { label: "Jaune", poids: 1, couleur: COULEURS.jaune },
      ],
    },
  });
}

function billesCanvas(): CanvasProbabilitesData {
  return probabilitesCanvas({
    variant: "billes",
    billes: {
      elements: [
        { couleur: COULEURS.rouge, label: "R" },
        { couleur: COULEURS.rouge, label: "R" },
        { couleur: COULEURS.rouge, label: "R" },
        { couleur: COULEURS.bleu, label: "B" },
        { couleur: COULEURS.bleu, label: "B" },
        { couleur: COULEURS.vert, label: "V" },
      ],
    },
  });
}

function billesEquilibreesCanvas(): CanvasProbabilitesData {
  return probabilitesCanvas({
    variant: "billes",
    billes: {
      elements: [
        { couleur: COULEURS.rouge, label: "R" },
        { couleur: COULEURS.rouge, label: "R" },
        { couleur: COULEURS.bleu, label: "B" },
        { couleur: COULEURS.bleu, label: "B" },
        { couleur: COULEURS.vert, label: "V" },
        { couleur: COULEURS.vert, label: "V" },
      ],
    },
  });
}

function tableauIssuesDeCanvas(): CanvasProbabilitesData {
  return probabilitesCanvas({
    variant: "tableau",
    tableau: {
      entetes: ["Événement", "Type"],
      lignes: [
        ["Obtenir 7 avec un dé", "impossible"],
        ["Obtenir un nombre de 1 à 6", "certain"],
        ["Obtenir un nombre pair", "possible"],
      ],
      casesSurlignees: [[1, 1]],
    },
  });
}

// ============================================================
// ⛔⛔ 15/10/2026 — « DES QUESTIONS REVIENNENT » : LES PROBABILITÉS DE CM2.
// Mesuré avant (scripts/mesurer-squelettes-coach.ts cm2 probabilite) : les
// 5 micros sous le seuil, 5 à 24 squelettes par micro, 3 à 18 répétitions sur
// une série de 20 à la même étoile. Les gabarits tiraient UNE phrase parmi
// trois ou quatre, sur le même sac de 6 billes et le même dé.
// Même méthode que la 3e (dd5e9f75) : chaque gabarit compose
//   · une SITUATION : seize « urnes » (sac de billes, bocal de bonbons,
//     trousse, tiroir de chaussettes, tombola, pêche aux canards, panier de
//     letchis, pions des petits chevaux, samoussas du pique-nique, glacière du
//     car jaune…), cinq roues ou dés colorés, et dix expériences NUMÉROTÉES
//     (dé, jeu de l’oie, dé de jeu de rôle, roue de la kermesse, loto,
//     tombola, dossards du cross, places du car jaune pour Cilaos…) ;
//   · un ÉVÉNEMENT tiré (une couleur présente ou absente, « pair »,
//     « plus grand que », « qui se termine par 0 »…) ;
//   · une TOURNURE et des prénoms variés.
// Le cran de CM2, au-dessus du CM1 : « 3 chances sur 10 », comparer deux sacs
// ou deux roues, la moitié (« 1 chance sur 2 »), sans formule.
// Tout est en QCM (zéro clavier en CM2) ; les leurres sont les erreurs de
// l'élève (compter les couleurs au lieu des objets, comparer aux AUTRES au
// lieu du total, croire que vouloir change les chances, que le dé a une
// mémoire…).
// ============================================================

type Q = TutorGeneratedQuestionV4;
type Cat = "certain" | "possible" | "impossible";

const ri = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const pick = randomChoice;
const minu = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
const FOIS = ["trois", "quatre", "cinq", "six"];
const maj = (s: string): string => (s.startsWith("« ") ? `« ${maj(s.slice(2))}` : s.charAt(0).toUpperCase() + s.slice(1));
const ilElle = (p: Prenom) => (p.f ? "elle" : "il");
const range = (a: number, b: number) => Array.from({ length: Math.max(0, b - a + 1) }, (_, i) => a + i);
const listeEt = (xs: string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} et ${xs[xs.length - 1]}`);
const listeOu = (xs: string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} ou ${xs[xs.length - 1]}`);
const voy = (s: string) => /^[aeiouéèêh]/i.test(s);
/** « de tirer », « d’attraper ». */
const deV = (s: string) => (voy(s) ? `d’${s}` : `de ${s}`);
/** « le sac », « la boîte », « l’urne ». */
const leN = (nom: string, f: boolean) => (voy(nom) ? `l’${nom}` : f ? `la ${nom}` : `le ${nom}`);
const art = (f: boolean) => (f ? "une" : "un");
/** « 1 chance sur 4 », « 3 chances sur 10 ». */
const chances = (a: number, t: number) => `${a} chance${a > 1 ? "s" : ""} sur ${t}`;
function autre(p: Prenom): Prenom {
  let q = pick(PRENOMS);
  while (q.nom === p.nom) q = pick(PRENOMS);
  return q;
}
/** Bonne réponse + jusqu'à trois leurres distincts, complétés par des secours. */
function qcmN(bon: number, pieges: number[]): string[] {
  const pris: number[] = [];
  for (const x of [...shuffle(pieges), bon + 1, bon + 2, bon - 1, bon + 3]) {
    if (pris.length === 3) break;
    if (x < 0 || x === bon || pris.includes(x)) continue;
    pris.push(x);
  }
  return shuffle([String(bon), ...pris.map(String)]);
}

/* ---------- Les objets que l'on tire ---------- */
type Objet = { s: string; p: string; f: boolean };
type Sorte = {
  /** « une bille rouge », « un letchi ». */
  un: string;
  /** « bille rouge », « letchi » (après « aucun », « pas de »). */
  nu: string;
  /** « billes rouges », « letchis ». */
  nuPl: string;
  f: boolean;
  des: (n: number) => string;
  /** Après « qui n’est pas » : « rouge », « à la fraise », « un letchi ». */
  attr: string;
  /** Après « ne sont pas » : « rouges », « à la fraise », « des letchis ». */
  attrPl: string;
  /** Une couleur (et non une sorte : parfum, garniture, fruit). */
  couleur: boolean;
  /** Le résultat noté : « rouge », « à la fraise », « letchi ». */
  court: string;
  /** Pour « une bille rouge ou bleue » ; null pour les noms (letchi, mangue). */
  suffixe: string | null;
  c: string;
  l: string;
};

const HEX = {
  rouge: COULEURS.rouge,
  bleu: COULEURS.bleu,
  vert: COULEURS.vert,
  jaune: COULEURS.jaune,
  violet: COULEURS.violet,
  orange: COULEURS.orange,
  rose: "#ec4899",
  noir: "#1f2937",
  blanc: "#d1d5db",
  marron: "#92400e",
} as const;

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

function enCouleurs(o: Objet, cs: Coul[]): Sorte[] {
  return cs.map((c) => {
    const [ms, fs, mp, fp] = ACC[c];
    const sg = o.f ? fs : ms;
    const pl = o.f ? fp : mp;
    return {
      un: `${art(o.f)} ${o.s} ${sg}`,
      nu: `${o.s} ${sg}`,
      nuPl: `${o.p} ${pl}`,
      f: o.f,
      des: (n: number) => (n > 1 ? `${n} ${o.p} ${pl}` : `${n} ${o.s} ${sg}`),
      attr: sg,
      attrPl: pl,
      couleur: true,
      court: sg,
      suffixe: sg,
      c: HEX[c],
      l: c === "blanc" ? "W" : c.charAt(0).toUpperCase(),
    };
  });
}
function enQualites(o: Objet, xs: { q: string; qp?: string; c: string }[]): Sorte[] {
  return xs.map(({ q, qp, c }) => ({
    un: `${art(o.f)} ${o.s} ${q}`,
    nu: `${o.s} ${q}`,
    nuPl: `${o.p} ${qp ?? q}`,
    f: o.f,
    des: (n: number) => (n > 1 ? `${n} ${o.p} ${qp ?? q}` : `${n} ${o.s} ${q}`),
    attr: q,
    attrPl: qp ?? q,
    couleur: false,
    court: q,
    suffixe: q,
    c,
    l: q.replace(/^(à la |au |aux |à l’|de type |de jus d’|de jus de )/, "").charAt(0).toUpperCase(),
  }));
}
function enNoms(xs: [string, string, boolean, string][]): Sorte[] {
  return xs.map(([sg, pl, f, c]) => ({
    un: `${art(f)} ${sg}`,
    nu: sg,
    nuPl: pl,
    f,
    des: (n: number) => `${n} ${n > 1 ? pl : sg}`,
    attr: `${art(f)} ${sg}`,
    attrPl: `des ${pl}`,
    couleur: false,
    court: sg,
    suffixe: null,
    c,
    l: sg.charAt(0).toUpperCase(),
  }));
}

/** « une bille rouge ou bleue », « un letchi ou une mangue ». */
function ouPhrase(o: Objet, ss: Sorte[]): string {
  return ss.every((s) => s.suffixe !== null)
    ? `${art(o.f)} ${o.s} ${listeOu(ss.map((s) => s.suffixe as string))}`
    : listeOu(ss.map((s) => s.un));
}
/** « aucune bille jaune », « aucun letchi ». */
const aucun = (s: Sorte) => `${s.f ? "aucune" : "aucun"} ${s.nu}`;

type Urne = {
  o: Objet;
  sortes: Sorte[];
  /** La situation : (prénom, contenu, total). */
  pose: (p: Prenom, contenu: string, total: number) => string;
  /** Le geste (vide pour une roue : la phrase de pose le dit déjà). */
  geste: (p: Prenom) => string;
  /** « tirer », « prendre », « tomber sur ». */
  verbe: string;
  /** Le contenant : [nom, féminin], et la préposition (« dans », « sur »). */
  boite: [string, boolean];
  dans: string;
  roue?: boolean;
};

const O = {
  bille: { s: "bille", p: "billes", f: true },
  bonbon: { s: "bonbon", p: "bonbons", f: false },
  crayon: { s: "crayon", p: "crayons", f: false },
  chaussette: { s: "chaussette", p: "chaussettes", f: true },
  ticket: { s: "ticket", p: "tickets", f: false },
  canard: { s: "canard", p: "canards", f: false },
  jeton: { s: "jeton", p: "jetons", f: false },
  perle: { s: "perle", p: "perles", f: true },
  ballon: { s: "ballon", p: "ballons", f: false },
  carte: { s: "carte", p: "cartes", f: true },
  pion: { s: "pion", p: "pions", f: false },
  samoussa: { s: "samoussa", p: "samoussas", f: false },
  chocolat: { s: "chocolat", p: "chocolats", f: false },
  briquette: { s: "briquette", p: "briquettes", f: true },
  feutre: { s: "feutre", p: "feutres", f: false },
  fruit: { s: "fruit", p: "fruits", f: false },
  case: { s: "case", p: "cases", f: true },
  part: { s: "part", p: "parts", f: true },
  secteur: { s: "secteur", p: "secteurs", f: false },
  face: { s: "face", p: "faces", f: true },
} satisfies Record<string, Objet>;

const URNES: Urne[] = [
  {
    o: O.bille,
    sortes: enCouleurs(O.bille, ["rouge", "bleu", "vert", "jaune", "noir", "blanc"]),
    pose: (p, c) => `Dans le sac ${de(p.nom)}, il y a ${c}.`,
    geste: (p) => `${p.nom} tire une bille sans regarder.`,
    verbe: "tirer",
    boite: ["sac", false],
    dans: "dans",
  },
  {
    o: O.bonbon,
    sortes: enQualites(O.bonbon, [
      { q: "à la fraise", c: HEX.rouge },
      { q: "à la menthe", c: HEX.vert },
      { q: "au citron", c: HEX.jaune },
      { q: "au coco", c: HEX.blanc },
      { q: "à la mangue", c: HEX.orange },
    ]),
    pose: (p, c) => `${p.nom} a un bocal avec ${c}.`,
    geste: (p) => `${maj(ilElle(p))} prend un bonbon les yeux fermés.`,
    verbe: "prendre",
    boite: ["bocal", false],
    dans: "dans",
  },
  {
    o: O.crayon,
    sortes: enCouleurs(O.crayon, ["rouge", "bleu", "vert", "jaune", "noir", "orange"]),
    pose: (p, c) => `Dans la trousse ${de(p.nom)}, il y a ${c}.`,
    geste: (p) => `${p.nom} prend un crayon sans regarder.`,
    verbe: "prendre",
    boite: ["trousse", true],
    dans: "dans",
  },
  {
    o: O.chaussette,
    sortes: enCouleurs(O.chaussette, ["blanc", "noir", "rouge", "bleu", "vert"]),
    pose: (p, c) => `Dans le tiroir ${de(p.nom)}, il y a ${c}.`,
    geste: (p) => `Dans le noir, ${p.nom} attrape une chaussette au hasard.`,
    verbe: "attraper",
    boite: ["tiroir", false],
    dans: "dans",
  },
  {
    o: O.ticket,
    sortes: enCouleurs(O.ticket, ["vert", "jaune", "rose", "bleu", "blanc"]),
    pose: (_p, c) => `À la tombola de l’école, l’urne contient ${c}.`,
    geste: (p) => `${p.nom} tire un ticket au hasard.`,
    verbe: "tirer",
    boite: ["urne", true],
    dans: "dans",
  },
  {
    o: O.canard,
    sortes: enCouleurs(O.canard, ["jaune", "rouge", "bleu", "vert", "orange"]),
    pose: (_p, c) => `Au stand de pêche aux canards de la kermesse, le bassin contient ${c}.`,
    geste: (p) => `${p.nom} pêche un canard sans regarder.`,
    verbe: "pêcher",
    boite: ["bassin", false],
    dans: "dans",
  },
  {
    o: O.fruit,
    sortes: enNoms([
      ["letchi", "letchis", false, "#be123c"],
      ["mangue", "mangues", true, HEX.orange],
      ["banane", "bananes", true, HEX.jaune],
      ["goyave", "goyaves", true, HEX.rose],
      ["ananas", "ananas", false, "#facc15"],
    ]),
    pose: (_p, c) => `Au marché de Saint-Pierre, un panier contient ${c}.`,
    geste: (p) => `${p.nom} prend un fruit sans regarder.`,
    verbe: "prendre",
    boite: ["panier", false],
    dans: "dans",
  },
  {
    o: O.jeton,
    sortes: enCouleurs(O.jeton, ["rouge", "bleu", "vert", "jaune", "violet"]),
    pose: (_p, c) => `Dans la boîte du jeu de société, il y a ${c}.`,
    geste: (p) => `${p.nom} pioche un jeton sans regarder.`,
    verbe: "piocher",
    boite: ["boîte", true],
    dans: "dans",
  },
  {
    o: O.perle,
    sortes: enCouleurs(O.perle, ["rouge", "bleu", "vert", "jaune", "blanc", "violet"]),
    pose: (p, c) => `Pour faire un collier, ${p.nom} a un sachet avec ${c}.`,
    geste: (p) => `${maj(ilElle(p))} prend une perle au hasard.`,
    verbe: "prendre",
    boite: ["sachet", false],
    dans: "dans",
  },
  {
    o: O.ballon,
    sortes: enCouleurs(O.ballon, ["rouge", "bleu", "jaune", "vert", "orange"]),
    pose: (_p, c) => `Au gymnase, le grand filet contient ${c}.`,
    geste: (p) => `${p.nom} attrape un ballon les yeux fermés.`,
    verbe: "attraper",
    boite: ["filet", false],
    dans: "dans",
  },
  {
    o: O.carte,
    sortes: enQualites(O.carte, [
      { q: "de type Feu", c: HEX.rouge },
      { q: "de type Eau", c: HEX.bleu },
      { q: "de type Plante", c: HEX.vert },
      { q: "de type Électrik", c: HEX.jaune },
      { q: "de type Psy", c: HEX.violet },
    ]),
    pose: (p, c) => `La pioche de cartes ${de(p.nom)} contient ${c}.`,
    geste: (p) => `${maj(ilElle(p))} pioche une carte au hasard.`,
    verbe: "piocher",
    boite: ["pioche", true],
    dans: "dans",
  },
  {
    o: O.pion,
    sortes: enCouleurs(O.pion, ["rouge", "bleu", "jaune", "vert"]),
    pose: (_p, c) => `Avant une partie de petits chevaux, on met dans un sac ${c}.`,
    geste: (p) => `${p.nom} tire un pion au hasard pour choisir sa couleur.`,
    verbe: "tirer",
    boite: ["sac", false],
    dans: "dans",
  },
  {
    o: O.samoussa,
    sortes: enQualites(O.samoussa, [
      { q: "au poulet", c: HEX.orange },
      { q: "au thon", c: HEX.bleu },
      { q: "au fromage", c: HEX.jaune },
      { q: "aux légumes", c: HEX.vert },
    ]),
    pose: (_p, c) => `Pour le pique-nique de la classe, un sachet contient ${c}.`,
    geste: (p) => `${p.nom} prend un samoussa au hasard.`,
    verbe: "prendre",
    boite: ["sachet", false],
    dans: "dans",
  },
  {
    o: O.chocolat,
    sortes: enQualites(O.chocolat, [
      { q: "au lait", c: HEX.marron },
      { q: "noir", qp: "noirs", c: HEX.noir },
      { q: "blanc", qp: "blancs", c: HEX.blanc },
      { q: "praliné", qp: "pralinés", c: HEX.orange },
    ]),
    pose: (_p, c) => `Dans la boîte de chocolats de Noël, il y a ${c}.`,
    geste: (p) => `${p.nom} en prend un sans regarder.`,
    verbe: "prendre",
    boite: ["boîte", true],
    dans: "dans",
  },
  {
    o: O.briquette,
    sortes: enQualites(O.briquette, [
      { q: "de jus d’orange", c: HEX.orange },
      { q: "de jus d’ananas", c: HEX.jaune },
      { q: "de jus de goyave", c: HEX.rose },
      { q: "de jus de letchi", c: "#be123c" },
    ]),
    pose: (_p, c) => `Dans la glacière du car jaune, il y a ${c}.`,
    geste: (p) => `${p.nom} prend une briquette sans regarder.`,
    verbe: "prendre",
    boite: ["glacière", true],
    dans: "dans",
  },
  {
    o: O.feutre,
    sortes: enCouleurs(O.feutre, ["rouge", "bleu", "vert", "noir", "violet", "orange"]),
    pose: (_p, c) => `Dans le pot à feutres de la classe, il y a ${c}.`,
    geste: (p) => `${p.nom} prend un feutre au hasard.`,
    verbe: "prendre",
    boite: ["pot", false],
    dans: "dans",
  },
];

/** Les roues et dés COLORÉS : des « urnes » dont chaque objet est une case. */
const ROUES: Urne[] = [
  {
    o: O.case,
    sortes: enCouleurs(O.case, ["rouge", "bleu", "vert", "jaune", "violet", "orange"]),
    pose: (p, c, t) => `À la kermesse, ${p.nom} fait tourner une roue de ${t} cases de même taille : ${c}.`,
    geste: () => "",
    verbe: "tomber sur",
    boite: ["roue", true],
    dans: "sur",
    roue: true,
  },
  {
    o: O.part,
    sortes: enCouleurs(O.part, ["rouge", "bleu", "vert", "jaune", "rose", "orange"]),
    pose: (p, c, t) => `Pour choisir le jeu de la récré, ${p.nom} fait tourner une flèche sur un disque partagé en ${t} parts égales : ${c}.`,
    geste: () => "",
    verbe: "tomber sur",
    boite: ["roue", true],
    dans: "sur",
    roue: true,
  },
  {
    o: O.secteur,
    sortes: enCouleurs(O.secteur, ["rouge", "bleu", "vert", "jaune", "violet", "noir"]),
    pose: (p, c, t) => `La roue du jeu de société ${de(p.nom)} a ${t} secteurs égaux : ${c}. ${maj(ilElle(p))} la fait tourner.`,
    geste: () => "",
    verbe: "tomber sur",
    boite: ["roue", true],
    dans: "sur",
    roue: true,
  },
  {
    o: O.case,
    sortes: enCouleurs(O.case, ["rouge", "bleu", "vert", "jaune", "violet", "orange"]),
    pose: (p, c, t) => `Dans le jeu vidéo ${de(p.nom)}, une roue bonus de ${t} cases égales tourne : ${c}.`,
    geste: () => "",
    verbe: "tomber sur",
    boite: ["roue", true],
    dans: "sur",
    roue: true,
  },
];
const TOUTES = [...URNES, ...ROUES];

type Compo = Array<[Sorte, number]>;
const totalDe = (compo: Compo) => compo.reduce((s, [, n]) => s + n, 0);
/** k sortes distinctes, chacune entre min et max objets ; les sortes absentes à part. */
function tirerCompo(u: Urne, k: number, min: number, max: number, distincts = false): { compo: Compo; absentes: Sorte[] } {
  const ss = shuffle(u.sortes);
  const nombres: number[] = [];
  for (let i = 0; i < k; i++) {
    let n = ri(min, max);
    for (let essai = 0; distincts && nombres.includes(n) && essai < 30; essai++) n = ri(min, max);
    nombres.push(n);
  }
  return { compo: ss.slice(0, k).map((s, i) => [s, nombres[i]] as [Sorte, number]), absentes: ss.slice(k) };
}
const contenu = (compo: Compo) => listeEt(compo.filter(([, n]) => n > 0).map(([s, n]) => s.des(n)));
function poser(u: Urne, p: Prenom, compo: Compo): string {
  return [u.pose(p, contenu(compo), totalDe(compo)), u.geste(p)].filter(Boolean).join(" ");
}
function urneCanvas(u: Urne, compo: Compo): CanvasProbabilitesData | undefined {
  if (totalDe(compo) > 24) return undefined;
  if (u.roue) {
    return probabilitesCanvas({
      variant: "roue",
      roue: { segments: compo.flatMap(([s, n]) => Array.from({ length: n }, () => ({ label: s.l, poids: 1, couleur: s.c }))) },
    });
  }
  return probabilitesCanvas({
    variant: "billes",
    billes: { elements: compo.flatMap(([s, n]) => Array.from({ length: n }, () => ({ couleur: s.c, label: s.l }))) },
  });
}

/* ---------- Les expériences numérotées ---------- */
type ExpNum = {
  N: number;
  pose: (p: Prenom) => string;
  verbe: string;
  nb: string;
  /** [singulier, pluriel, féminin] : ce que l'on compte (« faces », « tickets »). */
  unite: [string, string, boolean];
  canvas?: (fav: number[]) => CanvasProbabilitesData;
};
const roueNum = (N: number, fav: number[]) =>
  probabilitesCanvas({
    variant: "roue",
    roue: { segments: range(1, N).map((i) => ({ label: String(i), poids: 1, couleur: fav.includes(i) ? COULEURS.jaune : undefined })) },
  });
const deSurligne = (fav: number[]) => deCanvas(fav.filter((x): x is DeFace => x >= 1 && x <= 6) as DeFace[]);

const EXPS: Array<() => ExpNum> = [
  () => ({ N: 6, pose: (p) => `${p.nom} lance un dé classique, aux faces numérotées de 1 à 6.`, verbe: "obtenir", nb: "nombre", unite: ["face", "faces", true], canvas: deSurligne }),
  () => ({ N: 6, pose: (p) => `Au jeu de l’oie, ${p.nom} lance le dé (faces de 1 à 6).`, verbe: "obtenir", nb: "nombre", unite: ["face", "faces", true], canvas: deSurligne }),
  () => ({ N: 6, pose: (p) => `Aux petits chevaux, c’est au tour ${de(p.nom)} de lancer le dé (faces de 1 à 6).`, verbe: "obtenir", nb: "nombre", unite: ["face", "faces", true], canvas: deSurligne }),
  () => {
    const N = pick([4, 8, 10, 12]);
    return { N, pose: (p) => `${p.nom} lance un dé de jeu de rôle à ${N} faces, numérotées de 1 à ${N}.`, verbe: "obtenir", nb: "nombre", unite: ["face", "faces", true] };
  },
  () => {
    const N = pick([8, 10, 12]);
    return { N, pose: (p) => `À la kermesse, ${p.nom} fait tourner une roue de ${N} cases égales, numérotées de 1 à ${N}.`, verbe: "tomber sur", nb: "nombre", unite: ["case", "cases", true], canvas: (fav) => roueNum(N, fav) };
  },
  () => {
    const N = pick([10, 12, 15, 20]);
    return { N, pose: (p) => `${p.nom} mélange ${N} cartes numérotées de 1 à ${N} et en pioche une sans regarder.`, verbe: "obtenir", nb: "nombre", unite: ["carte", "cartes", true] };
  },
  () => {
    const N = pick([20, 30, 40, 50]);
    return { N, pose: (p) => `Au loto de l’école, ${p.nom} tire une boule parmi ${N} boules numérotées de 1 à ${N}.`, verbe: "obtenir", nb: "nombre", unite: ["boule", "boules", true] };
  },
  () => {
    const N = pick([50, 100]);
    return { N, pose: (p) => `À la tombola, les ${N} tickets sont numérotés de 1 à ${N}. ${p.nom} en tire un au hasard.`, verbe: "obtenir", nb: "numéro", unite: ["ticket", "tickets", false] };
  },
  () => {
    const N = pick([20, 25, 30, 40]);
    return { N, pose: (p) => `Au cross du collège, ${N} coureurs ont un dossard numéroté de 1 à ${N}. ${p.nom} tire un dossard au hasard pour offrir un cadeau.`, verbe: "obtenir", nb: "numéro", unite: ["dossard", "dossards", false] };
  },
  () => {
    const N = pick([30, 40, 50]);
    return { N, pose: (p) => `Dans le car jaune pour Cilaos, les ${N} places sont numérotées de 1 à ${N}. ${p.nom} tire sa place au sort.`, verbe: "obtenir", nb: "numéro", unite: ["place", "places", true] };
  },
];

type Ev = { txt: string; fav: number[] };
function evenements(e: ExpNum): Ev[] {
  const N = e.N;
  const nb = e.nb;
  const tous = range(1, N);
  const f = (pred: (x: number) => boolean) => tous.filter(pred);
  const k1 = ri(2, N - 1);
  const k2 = ri(2, N);
  const k3 = ri(1, N);
  const m = pick([3, 4, 5]);
  const evs: Ev[] = [
    { txt: `un ${nb} pair`, fav: f((x) => x % 2 === 0) },
    { txt: `un ${nb} impair`, fav: f((x) => x % 2 === 1) },
    { txt: `un ${nb} plus grand que ${k1}`, fav: f((x) => x > k1) },
    { txt: `un ${nb} plus petit que ${k2}`, fav: f((x) => x < k2) },
    { txt: `le ${nb} ${k3}`, fav: [k3] },
    { txt: `le ${nb} ${N + ri(1, 5)}`, fav: [] },
    { txt: `le ${nb} 0`, fav: [] },
    { txt: `un ${nb} plus grand que ${N}`, fav: [] },
    { txt: `un ${nb} entre 1 et ${N}`, fav: tous },
    { txt: `un ${nb} plus petit que ${N + 1}`, fav: tous },
    { txt: `un ${nb} plus grand que 0`, fav: tous },
    { txt: `un ${nb} à deux chiffres`, fav: f((x) => x >= 10 && x <= 99) },
    { txt: `un ${nb} qui se termine par 0`, fav: f((x) => x % 10 === 0) },
    { txt: `un ${nb} qui se termine par 5`, fav: f((x) => x % 10 === 5) },
    { txt: `un multiple de ${m}`, fav: f((x) => x % m === 0) },
  ];
  const vus = new Set<string>();
  return evs.filter((ev) => !vus.has(ev.txt) && (vus.add(ev.txt), true));
}
const catDe = (fav: number[], N: number): Cat => (fav.length === 0 ? "impossible" : fav.length === N ? "certain" : "possible");
function pourquoiNum(e: ExpNum, ev: Ev): string {
  const [, pl, fem] = e.unite;
  const c = catDe(ev.fav, e.N);
  if (c === "impossible") return `Les ${pl} vont de 1 à ${e.N}. ${fem ? "Aucune" : "Aucun"} ne donne ${ev.txt} : c’est impossible.`;
  if (c === "certain") return `Les ${pl} vont de 1 à ${e.N}. ${fem ? "Toutes" : "Tous"} donnent ${ev.txt} : ça arrive à chaque fois, c’est certain.`;
  const a = ev.fav.length;
  if (a === 1) return `${fem ? "Seule la" : "Seul le"} ${e.unite[0]} ${ev.fav[0]} donne ${ev.txt}. Ça peut arriver, mais pas à chaque fois : c’est possible.`;
  const detail = a <= 8 ? ` (${listeEt(ev.fav.map(String))})` : "";
  return `${a} ${pl} sur ${e.N}${detail} donnent ${ev.txt}. Ça peut arriver, mais pas à chaque fois : c’est possible.`;
}

const CATS: Cat[] = ["certain", "possible", "impossible"];

/* =========================================================================
   PROBABILITE_VOCABULAIRE — certain, possible, impossible.
========================================================================= */
type CasUrne = { ev: string; cat: Cat; pourquoi: string };
/** Tous les événements d'une urne, chacun avec sa catégorie et son « pourquoi ». */
function casUrne(u: Urne, compo: Compo, absentes: Sorte[]): CasUrne[] {
  const cas: CasUrne[] = [];
  const presentes = compo.map(([s]) => s);
  if (compo.length === 1) {
    const [s, n] = compo[0];
    cas.push({ ev: s.un, cat: "certain", pourquoi: `Il n’y a que ${s.des(n)} : on obtient forcément ${s.un}. C’est certain.` });
  } else {
    for (const [s, n] of compo) {
      const autres = compo.filter(([t]) => t !== s).map(([t, k]) => t.des(k));
      cas.push({
        ev: s.un,
        cat: "possible",
        pourquoi: `Il y a ${s.des(n)} : ça peut arriver. Mais il y a aussi ${listeEt(autres)} : ce n’est pas sûr. C’est possible.`,
      });
    }
    cas.push({
      ev: ouPhrase(u.o, presentes),
      cat: "certain",
      pourquoi: `Il n’y a que ${contenu(compo)} : on obtient forcément ${ouPhrase(u.o, presentes)}. C’est certain.`,
    });
  }
  for (const a of absentes) {
    cas.push({ ev: a.un, cat: "impossible", pourquoi: `Il n’y a ${aucun(a)} : ça ne peut pas arriver. C’est impossible.` });
    cas.push({
      ev: `${art(u.o.f)} ${u.o.s} qui n’est pas ${a.attr}`,
      cat: "certain",
      pourquoi: `Il n’y a ${aucun(a)} : ${leN(u.o.s, u.o.f)} obtenu${u.o.f ? "e" : ""} n’est jamais ${a.attr}. C’est certain.`,
    });
  }
  return cas;
}

function genVocabUrne(): Q {
  const u = pick(TOUTES);
  const p = pick(PRENOMS);
  const k = Math.random() < 0.12 ? 1 : ri(2, Math.min(3, u.sortes.length - 1));
  const { compo, absentes } = tirerCompo(u, k, 1, 6);
  const tous = casUrne(u, compo, absentes.slice(0, 2));
  // Une catégorie d'abord (pour ne pas servir « certain » une fois sur deux).
  const cat = pick(CATS.filter((c) => tous.some((x) => x.cat === c)));
  const cas = pick(tous.filter((x) => x.cat === cat));
  const situ = poser(u, p, compo);
  const ev = `${u.verbe} ${cas.ev}`;
  const text = pick([
    `${situ}\n${maj(ev)}, c’est :`,
    `${situ}\n« ${maj(ev)} » : est-ce certain, possible ou impossible ?`,
    `${situ}\nQuel mot convient pour l’événement « ${ev} » ?`,
    `${situ}\nPour ${p.nom}, ${ev}, c’est…`,
  ]);
  return {
    text,
    format: "qcm",
    choices: shuffle(CATS),
    expected: [cas.cat],
    comparator: "mcq_exact",
    explanation: cas.pourquoi,
    canvas: urneCanvas(u, compo),
  };
}

function genVocabNombres(): Q {
  const e = pick(EXPS)();
  const p = pick(PRENOMS);
  const evs = evenements(e);
  const cat = pick(CATS.filter((c) => evs.some((x) => catDe(x.fav, e.N) === c)));
  const ev = pick(evs.filter((x) => catDe(x.fav, e.N) === cat));
  const phrase = `${e.verbe} ${ev.txt}`;
  const text = pick([
    `${e.pose(p)}\n${maj(phrase)}, c’est :`,
    `${e.pose(p)}\n« ${maj(phrase)} » : est-ce certain, possible ou impossible ?`,
    `${e.pose(p)}\nQuel mot convient pour l’événement « ${phrase} » ?`,
    `${e.pose(p)}\nPour ${p.nom}, ${phrase}, c’est…`,
  ]);
  return {
    text,
    format: "qcm",
    choices: shuffle(CATS),
    expected: [cat],
    comparator: "mcq_exact",
    explanation: pourquoiNum(e, ev),
    canvas: e.canvas?.([]),
  };
}

/** ★3 : parmi quatre événements, lequel est certain (possible, impossible) ? */
function genVocabLequel(): Q {
  const p = pick(PRENOMS);
  for (let essai = 0; essai < 20; essai++) {
    let situ: string;
    let pool: { txt: string; cat: Cat; pourquoi: string }[];
    let canvas: CanvasProbabilitesData | undefined;
    if (Math.random() < 0.5) {
      const u = pick(TOUTES);
      const { compo, absentes } = tirerCompo(u, ri(2, Math.min(3, u.sortes.length - 1)), 1, 6);
      situ = poser(u, p, compo);
      pool = casUrne(u, compo, absentes).map((c) => ({ txt: `${u.verbe} ${c.ev}`, cat: c.cat, pourquoi: c.pourquoi }));
      canvas = urneCanvas(u, compo);
    } else {
      const e = pick(EXPS)();
      situ = e.pose(p);
      pool = evenements(e).map((ev) => ({ txt: `${e.verbe} ${ev.txt}`, cat: catDe(ev.fav, e.N), pourquoi: pourquoiNum(e, ev) }));
      canvas = e.canvas?.([]);
    }
    const cat = pick(CATS);
    const bons = pool.filter((x) => x.cat === cat);
    const autres = shuffle(pool.filter((x) => x.cat !== cat));
    // Trois leurres, dont au moins un de chaque autre catégorie si possible.
    const leurres: typeof pool = [];
    for (const c of CATS.filter((c) => c !== cat)) {
      const x = autres.find((y) => y.cat === c);
      if (x) leurres.push(x);
    }
    for (const x of autres) if (leurres.length < 3 && !leurres.includes(x)) leurres.push(x);
    if (!bons.length || leurres.length < 3) continue;
    const bon = pick(bons);
    const text = pick([
      `${situ}\nParmi ces événements, lequel est ${cat} ?`,
      `${situ}\nLequel de ces événements est ${cat} ?`,
      `${situ}\n${p.nom} cherche l’événement ${cat}. Lequel est-ce ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: shuffle([bon.txt, ...leurres.map((x) => x.txt)]),
      expected: [bon.txt],
      comparator: "mcq_exact",
      explanation: `« ${maj(bon.txt)} » : ${minu(bon.pourquoi)} Les autres ne sont pas ${cat}s : ${leurres
        .map((x) => `« ${x.txt} » est ${x.cat}`)
        .join(", ")}.`,
      canvas,
    };
  }
  return genVocabUrne();
}

/** ★4 : un élève affirme quelque chose ; a-t-il raison ? */
function genVocabEleve(): Q {
  const u = pick(TOUTES);
  const p = pick(PRENOMS);
  const q = autre(p);
  const { compo, absentes } = tirerCompo(u, ri(2, Math.min(3, u.sortes.length - 1)), 1, 6, true);
  const situ = poser(u, p, compo);
  const [s, n] = pick(compo);
  const [rare, nRare] = [...compo].sort((a, b) => a[1] - b[1])[0];
  const a = absentes[0];
  const presentes = compo.map(([x]) => x);
  const R = {
    oui: `Oui, ${ilElle(q)} a raison.`,
    pasCertain: "Non : c’est possible, mais pas certain.",
    rare: "Non : c’est possible, même si c’est rare.",
    vouloir: "Non : vouloir ne change rien aux chances.",
    memoire: "Non : le hasard n’a pas de mémoire.",
    impossible: "Non : c’est impossible.",
    certain: "Non : c’est certain.",
  };
  const claims: { avant?: string; dit: string; bon: string; leurres: string[]; pourquoi: string }[] = [
    {
      dit: `Il y a ${s.des(n)}, donc ${p.nom} va forcément ${u.verbe} ${s.un}.`,
      bon: R.pasCertain,
      leurres: [R.oui, R.impossible, R.memoire],
      pourquoi: `Il y a ${s.des(n)}, mais aussi ${listeEt(compo.filter(([x]) => x !== s).map(([x, k]) => x.des(k)))}. ${maj(u.verbe)} ${s.un} peut arriver, mais ce n’est pas sûr : c’est possible, pas certain.`,
    },
    {
      dit: `Il n’y a ${aucun(a)}, donc ${u.verbe} ${a.un} est impossible.`,
      bon: R.oui,
      leurres: [R.pasCertain, R.rare, R.certain],
      pourquoi: `En effet, il n’y a ${aucun(a)} : ça ne peut pas arriver. C’est impossible, ${q.nom} a raison.`,
    },
    {
      dit: `${p.nom} veut très fort ${u.verbe} ${s.un}, donc ${ilElle(p)} a plus de chances de l’avoir.`,
      bon: R.vouloir,
      leurres: [R.oui, R.certain, R.impossible],
      pourquoi: `Les chances dépendent seulement de ce qu’il y a : ${contenu(compo)}. Vouloir, préférer ou souffler sur ${leN(u.boite[0], u.boite[1])} ne change rien.`,
    },
    {
      dit: `${maj(u.verbe)} ${ouPhrase(u.o, presentes)}, c’est certain.`,
      bon: R.oui,
      leurres: [R.pasCertain, R.impossible, R.rare],
      pourquoi: `Il n’y a que ${contenu(compo)} : on obtient forcément ${ouPhrase(u.o, presentes)}. C’est certain, ${q.nom} a raison.`,
    },
    {
      dit: `Il n’y a que ${rare.des(nRare)}, donc ${u.verbe} ${rare.un} est impossible.`,
      bon: R.rare,
      leurres: [R.oui, R.certain, R.vouloir],
      pourquoi: `Il y a ${rare.des(nRare)} : c’est peu, mais ça existe. ${maj(u.verbe)} ${rare.un} peut arriver : c’est possible, pas impossible.`,
    },
    {
      avant: `${u.roue ? "" : `On remet toujours ${u.o.f ? "la" : "le"} ${u.o.s} à sa place. `}Trois fois de suite, ${p.nom} a obtenu ${s.un}.`,
      dit: "La prochaine fois, ce sera sûrement autre chose.",
      bon: R.memoire,
      leurres: [R.oui, R.vouloir, R.impossible],
      pourquoi: `${u.roue ? "La roue" : `${maj(leN(u.boite[0], u.boite[1]))}`} ne se souvient pas des tirages d’avant : il y a toujours ${contenu(compo)}. Les chances restent les mêmes à chaque tirage.`,
    },
  ];
  const c = pick(claims);
  const text = pick([
    `${situ}${c.avant ? ` ${c.avant}` : ""}\n${q.nom} dit : « ${c.dit} »\nA-t-${ilElle(q)} raison ?`,
    `${situ}${c.avant ? ` ${c.avant}` : ""}\n« ${c.dit} » affirme ${q.nom}.\nQu’en penses-tu ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: makeChoices(c.bon, c.leurres),
    expected: [c.bon],
    comparator: "mcq_exact",
    explanation: c.pourquoi,
    canvas: urneCanvas(u, compo),
  };
}

/* =========================================================================
   PROBABILITE_HASARD — situation de hasard ou pas ; les résultats possibles.
========================================================================= */
type Situ = { s: (p: Prenom) => string; pourquoi: string };
const HASARD: Situ[] = [
  { s: (p) => `${p.nom} lance un dé`, pourquoi: "Le dé peut tomber sur 1, 2, 3, 4, 5 ou 6 : personne ne sait lequel avant de lancer." },
  { s: (p) => `${p.nom} lance une pièce pour savoir qui commence le match`, pourquoi: "La pièce peut tomber sur pile ou sur face : on ne le sait pas avant." },
  { s: (p) => `${p.nom} tire un ticket de tombola sans regarder`, pourquoi: "Sans regarder, on ne sait pas quel ticket sortira." },
  { s: (p) => `${p.nom} fait tourner la roue de la kermesse`, pourquoi: "On ne sait pas à l’avance sur quelle case la roue va s’arrêter." },
  { s: (p) => `${p.nom} pioche une carte dans un jeu bien mélangé`, pourquoi: "Le jeu est mélangé : on ne sait pas quelle carte viendra." },
  { s: (p) => `${p.nom} tire une bille dans un sac sans regarder`, pourquoi: "Sans regarder, on ne peut pas savoir quelle bille sortira." },
  { s: (p) => `${p.nom} pêche un canard au stand de la kermesse`, pourquoi: "Les canards tournent dans le bassin : on ne sait pas lequel on attrapera." },
  { s: (p) => `on tire au sort le nom du capitaine de l’équipe de ${p.nom}`, pourquoi: "Un tirage au sort ne se prévoit pas : n’importe quel nom peut sortir." },
  { s: (p) => `${p.nom} prend un bonbon dans un bocal, les yeux fermés`, pourquoi: "Les yeux fermés, on ne sait pas quel bonbon on va prendre." },
  { s: (p) => `${p.nom} tire une boule au loto de l’école`, pourquoi: "Les boules sont mélangées : on ne sait pas laquelle sortira." },
  { s: (p) => `${p.nom} lance le dé au jeu de l’oie`, pourquoi: "On ne sait pas sur quelle face le dé va tomber." },
  { s: (p) => `on tire au sort l’ordre de passage de ${p.nom} à l’exposé`, pourquoi: "Le tirage au sort décide : on ne connaît pas l’ordre à l’avance." },
  { s: (p) => `${p.nom} attrape une chaussette dans le noir`, pourquoi: "Dans le noir, on ne voit pas la couleur : on ne sait pas laquelle on aura." },
  { s: (p) => `on tire au sort le groupe de ${p.nom} pour la sortie à Cilaos`, pourquoi: "Le tirage au sort peut donner n’importe quel groupe." },
  { s: (p) => `${p.nom} lance le dé des petits chevaux`, pourquoi: "Personne ne sait quelle face sortira avant le lancer." },
  { s: (p) => `${p.nom} fait tourner la flèche d’une roue de jeu`, pourquoi: "On ne peut pas prévoir où la flèche va s’arrêter." },
  { s: (p) => `${p.nom} prend un samoussa au hasard dans un sachet fermé`, pourquoi: "Le sachet est fermé : on ne voit pas quel samoussa on prend." },
  { s: (p) => `${p.nom} pioche un jeton sans regarder dans la boîte du jeu`, pourquoi: "Sans regarder, n’importe quel jeton peut sortir." },
];
const PAS_HASARD: Situ[] = [
  { s: (p) => `${p.nom} calcule ${ri(12, 48)} + ${ri(11, 39)}`, pourquoi: "Un calcul donne toujours le même résultat : on peut le connaître à l’avance." },
  { s: (p) => `${p.nom} lit l’heure sur l’horloge de la classe`, pourquoi: "L’heure est affichée : on la lit, il n’y a rien d’imprévu." },
  { s: (p) => `${p.nom} compte les élèves de sa classe`, pourquoi: "En comptant bien, on trouve toujours le même nombre." },
  { s: (p) => `${p.nom} pose le dé sur la face 6 avec la main`, pourquoi: "Le dé n’est pas lancé : on choisit la face, on sait déjà que ce sera 6." },
  { s: (p) => `${p.nom} regarde dans le sac et choisit une bille rouge`, pourquoi: "En regardant, on choisit : le résultat est connu à l’avance." },
  { s: (p) => `${p.nom} écrit son prénom au tableau`, pourquoi: "On sait à l’avance ce qui sera écrit." },
  { s: (p) => `${p.nom} mesure la longueur de sa table`, pourquoi: "La table a toujours la même longueur : la mesure ne dépend pas du hasard." },
  { s: (p) => `${p.nom} choisit la carte qu’${ilElle(p)} veut en regardant le jeu`, pourquoi: "Les cartes sont visibles : on choisit, ce n’est pas le hasard." },
  { s: (p) => `${p.nom} lit la date écrite au tableau`, pourquoi: "La date est écrite : on la connaît déjà." },
  { s: (p) => `${p.nom} multiplie ${ri(3, 9)} par ${ri(3, 9)}`, pourquoi: "Une multiplication donne toujours le même résultat." },
  { s: (p) => `${p.nom} compte les faces d’un dé`, pourquoi: "Un dé classique a toujours 6 faces : il n’y a pas de surprise." },
  { s: (p) => `${p.nom} lâche une balle : elle tombe par terre`, pourquoi: "Une balle lâchée tombe toujours : c’est sûr, ce n’est pas du hasard." },
  { s: (p) => `${p.nom} tape ${ri(4, 9)} × ${ri(4, 9)} sur la calculatrice`, pourquoi: "La calculatrice donne toujours le même résultat pour le même calcul." },
  { s: (p) => `${p.nom} range ses crayons par couleur`, pourquoi: "On décide soi-même où va chaque crayon : rien n’est laissé au hasard." },
  { s: (p) => `${p.nom} retourne toutes les cartes et prend celle qu’${ilElle(p)} préfère`, pourquoi: "Les cartes sont retournées face visible : on choisit, ce n’est pas le hasard." },
  { s: (p) => `${p.nom} recopie le numéro de sa place écrit sur son billet`, pourquoi: "Le numéro est écrit : on le connaît déjà." },
  { s: (p) => `${p.nom} pèse ${ri(2, 5)} kg de letchis au marché`, pourquoi: "La balance affiche toujours la même masse pour les mêmes letchis." },
];

const R_HASARD = {
  oui: "Oui : on ne peut pas savoir le résultat à l’avance.",
  non: "Non : on connaît le résultat à l’avance.",
  ouiFaux: "Oui : le résultat est toujours le même.",
  nonFaux: "Non : on ne peut pas prévoir le résultat.",
};

function genHasardOuiNon(): Q {
  const p = pick(PRENOMS);
  const estHasard = Math.random() < 0.5;
  const sit = pick(estHasard ? HASARD : PAS_HASARD);
  const s = sit.s(p);
  const text = pick([
    `Est-ce une situation de hasard : ${s} ?`,
    `${maj(s)}.\nEst-ce une situation de hasard ?`,
    `${maj(s)}.\nPeut-on connaître le résultat avant ?`,
    `Voici une situation : ${s}.\nY a-t-il du hasard ?`,
  ]);
  const bon = estHasard ? R_HASARD.oui : R_HASARD.non;
  return {
    text,
    format: "qcm",
    choices: shuffle(Object.values(R_HASARD)),
    expected: [bon],
    comparator: "mcq_exact",
    explanation: `${sit.pourquoi} ${estHasard ? "C’est une situation de hasard." : "Ce n’est pas une situation de hasard."}`,
  };
}

/** ★2 : laquelle de ces quatre situations est (n’est pas) une situation de hasard ? */
function genHasardLaquelle(): Q {
  const cherche = Math.random() < 0.6; // true : on cherche LA situation de hasard
  const prenoms = shuffle(PRENOMS).slice(0, 4);
  const bon = pick(cherche ? HASARD : PAS_HASARD);
  const autres = shuffle(cherche ? PAS_HASARD : HASARD).slice(0, 3);
  const txts = [bon, ...autres].map((x, i) => maj(x.s(prenoms[i])));
  const intro = pick([
    "",
    `${pick(PRENOMS).nom} prépare un exposé sur le hasard.\n`,
    "La maîtresse affiche quatre situations.\n",
    "Au jeu des questions de la classe :\n",
  ]);
  const text = cherche
    ? `${intro}${pick(["Laquelle de ces situations est une situation de hasard ?", "Dans quelle situation le résultat dépend-il du hasard ?"])}`
    : `${intro}${pick(["Laquelle de ces situations n’est PAS une situation de hasard ?", "Dans quelle situation connaît-on le résultat à l’avance ?"])}`;
  return {
    text,
    format: "qcm",
    choices: shuffle(txts),
    expected: [txts[0]],
    comparator: "mcq_exact",
    explanation: cherche
      ? `« ${txts[0]} » : ${minu(bon.pourquoi)} Dans les trois autres, on connaît le résultat à l’avance.`
      : `« ${txts[0]} » : ${minu(bon.pourquoi)} Dans les trois autres, on ne peut pas savoir le résultat avant.`,
  };
}

/** Les résultats possibles d'une expérience : une urne, un dé, une pièce. */
function genHasardIssues(): Q {
  const p = pick(PRENOMS);
  const r = Math.random();
  const tour = pick([
    "Quels sont tous les résultats possibles ?",
    "Quelle liste donne tous les résultats possibles, et seulement eux ?",
    `Quels résultats ${p.nom} peut-${p.f ? "elle" : "il"} obtenir ?`,
  ]);
  if (r < 0.6) {
    const u = pick(TOUTES);
    const k = ri(2, Math.min(4, u.sortes.length - 1));
    const { compo, absentes } = tirerCompo(u, k, 1, 5);
    const situ = poser(u, p, compo);
    const noms = compo.map(([s]) => s.court);
    const grand = [...compo].sort((a, b) => b[1] - a[1])[0][0];
    const petit = [...compo].sort((a, b) => a[1] - b[1])[0][0];
    const bon = listeEt(noms);
    const leurres = [
      listeEt(noms.filter((x) => x !== petit.court)),
      listeEt([...noms, absentes[0].court]),
      `seulement ${grand.court}`,
      listeEt(shuffle([...noms.slice(1), absentes[0].court])),
    ];
    return {
      text: `${situ}\n${tour}`,
      format: "qcm",
      choices: makeChoices(bon, leurres),
      expected: [bon],
      comparator: "mcq_exact",
      explanation: `On peut obtenir chaque sorte présente, même si elle est peu nombreuse : ${bon}. Il n’y a ${aucun(absentes[0])} : ${absentes[0].court} n’est pas un résultat possible.`,
      canvas: urneCanvas(u, compo),
    };
  }
  if (r < 0.8) {
    const N = pick([4, 6, 6, 8]);
    const situ = pick([
      `${p.nom} lance un dé à ${N} faces, numérotées de 1 à ${N}.`,
      `À la kermesse, ${p.nom} fait tourner une roue de ${N} cases numérotées de 1 à ${N}.`,
      `${p.nom} tire une carte parmi ${N} cartes numérotées de 1 à ${N}.`,
    ]);
    const bon = range(1, N).join(", ");
    const leurres = [range(1, N - 1).join(", "), range(0, N).join(", "), range(1, N).filter((x) => x % 2 === 0).join(", "), `seulement ${N}`];
    return {
      text: `${situ}\n${tour}`,
      format: "qcm",
      choices: makeChoices(bon, leurres),
      expected: [bon],
      comparator: "mcq_exact",
      explanation: `Les résultats possibles sont tous les nombres de 1 à ${N} : ${bon}. Le 0 n’existe pas, et le ${N} est possible lui aussi.`,
      canvas: N === 6 ? deCanvas() : undefined,
    };
  }
  const situ = pick([
    `Pour savoir qui commence le match, ${p.nom} lance une pièce.`,
    `${p.nom} joue à pile ou face avec ${autre(p).nom}.`,
    `Avant la partie de dominos, ${p.nom} lance une pièce de 1 euro.`,
  ]);
  const bon = "pile, face";
  return {
    text: `${situ}\n${tour}`,
    format: "qcm",
    choices: makeChoices(bon, ["seulement pile", "seulement face", "1, 2", "pile, face, pile"]),
    expected: [bon],
    comparator: "mcq_exact",
    explanation: "Une pièce a deux côtés : pile et face. Il y a donc deux résultats possibles : pile, face.",
  };
}

/** ★3 : combien de résultats possibles ? Le piège : compter les objets au lieu des sortes. */
function genHasardCombien(): Q {
  const p = pick(PRENOMS);
  if (Math.random() < 0.6) {
    const u = pick(TOUTES);
    const k = ri(2, Math.min(4, u.sortes.length - 1));
    const { compo } = tirerCompo(u, k, 2, 5);
    const T = totalDe(compo);
    const quoi = u.sortes[0].couleur ? "couleurs" : "sortes";
    const text = `${poser(u, p, compo)}\n${pick([
      `Combien de résultats différents ${p.nom} peut-${ilElle(p)} obtenir ?`,
      `On note ce que l’on obtient. Combien y a-t-il de résultats possibles ?`,
    ])}`;
    return {
      text,
      format: "qcm",
      choices: qcmN(k, [T, k - 1, k + 1, compo[0][1]]),
      expected: [String(k)],
      comparator: "mcq_exact",
      explanation: `Il y a ${T} ${u.o.p}, mais seulement ${k} ${quoi} différentes : ${listeEt(compo.map(([s]) => s.court))}. Il y a donc ${k} résultats possibles (et non ${T}).`,
      canvas: urneCanvas(u, compo),
    };
  }
  const e = pick(EXPS)();
  const text = `${e.pose(p)}\n${pick([`Combien y a-t-il de résultats possibles ?`, `Combien de ${e.nb}s différents ${p.nom} peut-${ilElle(p)} obtenir ?`])}`;
  return {
    text,
    format: "qcm",
    choices: qcmN(e.N, [e.N - 1, e.N + 1, Math.floor(e.N / 2)]),
    expected: [String(e.N)],
    comparator: "mcq_exact",
    explanation: `On peut obtenir chaque ${e.nb} de 1 à ${e.N}, sans en oublier : cela fait ${e.N} résultats possibles.`,
    canvas: e.canvas?.([]),
  };
}

/** ★4 : est-ce encore du hasard ? les chances sont-elles les mêmes ? le dé a-t-il une mémoire ? */
function genHasardTriche(): Q {
  const p = pick(PRENOMS);
  const q = autre(p);
  const type = ri(0, 4);
  const NON_REGARDE = "Non : en regardant, on choisit le résultat.";
  const OUI = "Oui : on ne peut pas savoir le résultat à l’avance.";
  const MEMOIRE = "Non : le dé n’a pas de mémoire, les chances restent les mêmes.";
  const TRUQUE = "Non : certaines faces ont plus de chances que les autres.";
  const pieges = [
    "Oui : c’est toujours du hasard, quoi qu’on fasse.",
    "Non : le résultat est déjà écrit à l’avance.",
    "Oui : le résultat est toujours le même.",
  ];
  if (type <= 1) {
    const u = pick(URNES);
    const { compo } = tirerCompo(u, ri(2, 3), 1, 6);
    const [s] = pick(compo);
    const regarde = type === 0;
    const sit = `${u.pose(p, contenu(compo), totalDe(compo))} ${
      regarde ? `${p.nom} ouvre ${leN(u.boite[0], u.boite[1])}, regarde dedans et prend ${s.un}.` : `${p.nom} secoue bien ${leN(u.boite[0], u.boite[1])}, ferme les yeux et en prend un${u.o.f ? "e" : ""}.`
    }`;
    const bon = regarde ? NON_REGARDE : OUI;
    return {
      text: `${sit}\n${pick(["Est-ce encore une situation de hasard ?", "Le résultat dépend-il du hasard ?"])}`,
      format: "qcm",
      choices: makeChoices(bon, [regarde ? OUI : NON_REGARDE, ...pieges]),
      expected: [bon],
      comparator: "mcq_exact",
      explanation: regarde
        ? `${p.nom} voit ce qu’${ilElle(p)} prend : ${ilElle(p)} choisit ${s.un}. Ce n’est plus le hasard qui décide.`
        : `Les yeux fermés, après avoir secoué, ${p.nom} ne peut pas savoir ce qu’${ilElle(p)} prendra : c’est bien le hasard.`,
      canvas: urneCanvas(u, compo),
    };
  }
  if (type === 2) {
    const face = ri(1, 6);
    const foisMot = FOIS[ri(0, 2)];
    const sit = pick([
      `Aux petits chevaux, ${p.nom} a obtenu le ${face} ${foisMot} fois de suite avec le dé.`,
      `Au jeu de l’oie, ${p.nom} vient de faire le ${face} ${foisMot} fois de suite.`,
      `${p.nom} lance un dé classique : ${face}, encore ${face}… ${foisMot} fois de suite !`,
    ]);
    const dit = pick([`Le prochain lancer ne peut pas donner ${face}.`, `Au prochain lancer, ${face} a moins de chances de sortir.`, `Au prochain lancer, ${face} va forcément ressortir.`]);
    return {
      text: `${sit}\n${q.nom} dit : « ${dit} »\nA-t-${ilElle(q)} raison ?`,
      format: "qcm",
      choices: makeChoices(MEMOIRE, [`Oui, ${ilElle(q)} a raison.`, TRUQUE, "Oui : un dé change après plusieurs lancers."]),
      expected: [MEMOIRE],
      comparator: "mcq_exact",
      explanation: `Le dé ne se souvient pas des lancers d’avant. Au prochain lancer, chaque face, dont le ${face}, a toujours 1 chance sur 6.`,
      canvas: deCanvas([face as DeFace]),
    };
  }
  if (type === 3) {
    const face = ri(1, 6);
    const sit = pick([
      `${q.nom} a collé un petit poids sous une face du dé : il tombe très souvent sur ${face}.`,
      `Le dé ${de(q.nom)} est abîmé : il retombe presque toujours sur ${face}.`,
      `${q.nom} a un dé truqué qui tombe souvent sur ${face}.`,
    ]);
    return {
      text: `${sit}\n${pick(["Toutes les faces ont-elles autant de chances ?", `Avec ce dé, ${p.nom} a-t-${ilElle(p)} autant de chances d’obtenir chaque face ?`])}`,
      format: "qcm",
      choices: makeChoices(TRUQUE, ["Oui : un dé a toujours 1 chance sur 6 par face.", "Oui : c’est quand même un lancer de dé.", "Non : le dé ne peut plus tomber sur les autres faces."]),
      expected: [TRUQUE],
      comparator: "mcq_exact",
      explanation: `Le dé est truqué : la face ${face} sort plus souvent. Les autres faces restent possibles, mais elles n’ont plus autant de chances. Le jeu n’est plus juste.`,
      canvas: deCanvas([face as DeFace]),
    };
  }
  const coul = pick(["rouge", "bleue", "verte", "jaune"]);
  const foisMot = FOIS[ri(0, 3)];
  const MEM_ROUE = "Non : la roue n’a pas de mémoire, les chances restent les mêmes.";
  return {
    text: `${pick([`À la kermesse, la roue a ${pick([4, 6, 8])} cases égales de couleurs différentes.`, `${p.nom} fait tourner la roue du jeu de société, aux cases égales.`])} Elle est tombée ${foisMot} fois de suite sur la case ${coul}.\n${q.nom} dit : « ${pick([`La prochaine fois, ce ne sera sûrement pas la ${coul}.`, `La case ${coul} est maintenant la plus probable.`])} »\nA-t-${ilElle(q)} raison ?`,
    format: "qcm",
    choices: makeChoices(MEM_ROUE, [`Oui, ${ilElle(q)} a raison.`, "Oui : la roue change après plusieurs tours.", "Non : la case ne peut plus sortir."]),
    expected: [MEM_ROUE],
    comparator: "mcq_exact",
    explanation: `La roue ne se souvient pas des tours d’avant. Les cases sont égales : au prochain tour, la case ${coul} a exactement les mêmes chances qu’avant.`,
  };
}

/* =========================================================================
   PROBABILITE_ROUE_DE_SAC — compter les cas favorables ; « 3 chances sur 10 ».
========================================================================= */
/** ★1 : compter dans le sac (en tout, ceux qui ne sont pas X, les favorables). */
function genRoueCompter(): Q {
  const u = pick(TOUTES);
  const p = pick(PRENOMS);
  const k = ri(2, Math.min(3, u.sortes.length - 1));
  const { compo } = tirerCompo(u, k, 1, 7, true);
  const T = totalDe(compo);
  const [s, n] = pick(compo);
  const situ = poser(u, p, compo);
  const type = ri(0, 2);
  if (type === 0) {
    return {
      text: `${situ}\n${pick([`Combien de ${u.o.p} y a-t-il en tout ?`, `Combien de résultats sont possibles en comptant chaque ${u.o.s} ?`])}`,
      format: "qcm",
      choices: qcmN(T, [k, T - 1, T + 1, n]),
      expected: [String(T)],
      comparator: "mcq_exact",
      explanation: `On additionne : ${compo.map(([, x]) => x).join(" + ")} = ${T}. Il y a ${T} ${u.o.p} en tout.`,
      canvas: urneCanvas(u, compo),
    };
  }
  if (type === 1) {
    return {
      text: `${situ}\n${pick([`Combien de ${u.o.p} ne sont pas ${s.attrPl} ?`, `${p.nom} ne veut pas ${voy(s.nu) ? "d’" : "de "}${s.nu}. Combien de ${u.o.p} lui conviennent ?`])}`,
      format: "qcm",
      choices: qcmN(T - n, [n, T, k - 1, T - n + 1]),
      expected: [String(T - n)],
      comparator: "mcq_exact",
      explanation: `Il y a ${T} ${u.o.p} en tout, dont ${s.des(n)}. Les autres : ${T} − ${n} = ${T - n}.`,
      canvas: urneCanvas(u, compo),
    };
  }
  return {
    text: `${situ}\n${pick([`Combien de ${u.o.p} permettent ${deV(u.verbe)} ${s.un} ?`, `Pour ${u.verbe} ${s.un}, combien y a-t-il de cas favorables ?`])}`,
    format: "qcm",
    choices: qcmN(n, [T, 1, T - n, k]),
    expected: [String(n)],
    comparator: "mcq_exact",
    explanation: `Les cas favorables sont les ${s.nuPl} : il y en a ${n}. Les ${T - n} autres ${u.o.p} ne conviennent pas.`,
    canvas: urneCanvas(u, compo),
  };
}

/** « a chances sur T » : les leurres comparent aux AUTRES, comptent les couleurs, inversent. */
/**
 * Un QCM « a chances sur T » : trois leurres DISTINCTS EN VALEUR, et de la
 * bonne réponse (jamais « 1 chance sur 2 » à côté de « 2 chances sur 4 »).
 * Les pièges écrits passent d'abord, des voisins complètent.
 */
function qcmChances(bon: [number, number], pieges: [number, number][]): string[] {
  const v = ([a, t]: [number, number]) => a / t;
  const pris: [number, number][] = [];
  const secours: [number, number][] = [
    [bon[0] + 1, bon[1]],
    [bon[0], bon[1] + 1],
    [bon[0] + 2, bon[1] + 1],
    [Math.max(1, bon[0] - 1), bon[1]],
  ];
  for (const f of [...shuffle(pieges), ...secours]) {
    if (pris.length === 3) break;
    if (f[0] < 1 || f[1] < 1) continue;
    if ([bon, ...pris].some((g) => Math.abs(v(g) - v(f)) < 1e-9)) continue;
    pris.push(f);
  }
  return shuffle([chances(bon[0], bon[1]), ...pris.map(([a, t]) => chances(a, t))]);
}
/** Les leurres de « a chances sur T » : comparer aux AUTRES, compter les sortes, inverser. */
function chancesQcm(a: number, T: number, k: number): string[] {
  return qcmChances([a, T], [[a, T - a], [1, k], [T, a], [a, T + 1], [T - a, T]]);
}

/** ★2 (et ★3) : combien de chances sur combien ? */
function genRoueChances(): Q {
  const u = pick(TOUTES);
  const p = pick(PRENOMS);
  const k = ri(2, Math.min(3, u.sortes.length - 1));
  const { compo } = tirerCompo(u, k, 1, 6);
  const T = totalDe(compo);
  const [s, a] = pick(compo);
  const situ = poser(u, p, compo);
  const text = `${situ}\n${pick([
    `Combien de chances sur combien ${p.nom} a-t-${ilElle(p)} ${deV(u.verbe)} ${s.un} ?`,
    `${maj(u.verbe)} ${s.un} : combien de chances sur combien ?`,
    `Complète : ${p.nom} a … ${deV(u.verbe)} ${s.un}.`,
  ])}`;
  return {
    text,
    format: "qcm",
    choices: chancesQcm(a, T, k),
    expected: [chances(a, T)],
    comparator: "mcq_exact",
    explanation: `Il y a ${T} ${u.o.p} en tout (${compo.map(([, x]) => x).join(" + ")} = ${T}), dont ${s.des(a)}. On a donc ${chances(a, T)} ${deV(u.verbe)} ${s.un}. On compare au TOTAL, pas aux autres ${u.o.p}.`,
    canvas: urneCanvas(u, compo),
  };
}

/** ★3 : expériences numérotées — combien de cas favorables, ou combien de chances sur combien. */
function genRoueFavorables(): Q {
  const e = pick(EXPS)();
  const p = pick(PRENOMS);
  const evs = evenements(e).filter((x) => x.fav.length > 0 && x.fav.length < e.N);
  const ev = pick(evs);
  const a = ev.fav.length;
  const [sg, pl, fem] = e.unite;
  const detail = a <= 10 ? ` : ${listeEt(ev.fav.map(String))}` : "";
  if (Math.random() < 0.5) {
    return {
      text: `${e.pose(p)}\n${pick([`Combien de ${pl} permettent ${deV(e.verbe)} ${ev.txt} ?`, `Pour ${e.verbe} ${ev.txt}, combien y a-t-il de ${pl} favorables ?`])}`,
      format: "qcm",
      choices: qcmN(a, [e.N - a, e.N, a + 1, a - 1]),
      expected: [String(a)],
      comparator: "mcq_exact",
      explanation: `On cherche les ${pl} qui conviennent${detail}. Il y en a ${a} sur ${e.N}.`,
      canvas: e.canvas?.([]),
    };
  }
  return {
    text: `${e.pose(p)}\n${pick([`Combien de chances sur combien ${p.nom} a-t-${ilElle(p)} ${deV(e.verbe)} ${ev.txt} ?`, `${maj(e.verbe)} ${ev.txt} : combien de chances sur combien ?`])}`,
    format: "qcm",
    choices: qcmChances([a, e.N], [[a, e.N - a], [e.N - a, e.N], [1, e.N], [e.N, a]]),
    expected: [chances(a, e.N)],
    comparator: "mcq_exact",
    explanation: `Il y a ${e.N} ${pl} en tout. ${a > 1 ? `${fem ? "Celles" : "Ceux"} qui conviennent` : `${fem ? "Celle" : "Celui"} qui convient`}${detail} : ${a} ${a > 1 ? pl : sg}. On a donc ${chances(a, e.N)}.`,
    canvas: e.canvas?.([]),
  };
}

/** ★3 : NE PAS obtenir X — (T − a) chances sur T. */
function genRoueContraire(): Q {
  const u = pick(TOUTES);
  const p = pick(PRENOMS);
  const k = ri(2, Math.min(3, u.sortes.length - 1));
  const { compo } = tirerCompo(u, k, 1, 6);
  const T = totalDe(compo);
  const [s, a] = pick(compo);
  const b = T - a;
  const text = `${poser(u, p, compo)}\n${pick([
    `Combien de chances sur combien ${p.nom} a-t-${ilElle(p)} de NE PAS ${u.verbe} ${s.un} ?`,
    `${p.nom} gagne si ${ilElle(p)} n’obtient pas ${s.un}. Combien de chances sur combien a-t-${ilElle(p)} de gagner ?`,
  ])}`;
  return {
    text,
    format: "qcm",
    choices: qcmChances([b, T], [[a, T], [b, a], [1, T], [T, b]]),
    expected: [chances(b, T)],
    comparator: "mcq_exact",
    explanation: `Il y a ${T} ${u.o.p} en tout, dont ${s.des(a)}. Les autres : ${T} − ${a} = ${b}. On a donc ${chances(b, T)} de ne pas ${u.verbe} ${s.un}.`,
    canvas: urneCanvas(u, compo),
  };
}

/** ★4 : remonter des chances au contenu du sac. */
function genRoueInverse(): Q {
  const u = pick(URNES);
  const p = pick(PRENOMS);
  const [s, t] = shuffle(u.sortes);
  const type = ri(0, 2);
  const lieu = leN(u.boite[0], u.boite[1]);
  if (type === 0) {
    // 1 chance sur 2 : autant de X que de Y.
    const b = ri(2, 9);
    return {
      text: `${maj(lieu)} ne contient que des ${s.nuPl} et des ${t.nuPl}. Il y a ${t.des(b)}.\nOn a 1 chance sur 2 ${deV(u.verbe)} ${s.un}. Combien y a-t-il de ${s.nuPl} ?`,
      format: "qcm",
      choices: qcmN(b, [2 * b, b + 1, Math.max(1, b - 1), 2]),
      expected: [String(b)],
      comparator: "mcq_exact",
      explanation: `1 chance sur 2, c’est la moitié. Les ${s.nuPl} sont donc la moitié du total : il y en a autant que de ${t.nuPl}, soit ${b}.`,
    };
  }
  if (type === 1) {
    // 1 chance sur T0, m objets X : total m × T0.
    const T0 = ri(3, 5);
    const m = ri(2, 5);
    return {
      text: `Dans ${lieu} ${de(p.nom)}, il y a ${s.des(m)}.\nOn a 1 chance sur ${T0} ${deV(u.verbe)} ${s.un}. Combien de ${u.o.p} y a-t-il en tout ?`,
      format: "qcm",
      choices: qcmN(m * T0, [m + T0, m * T0 - m, T0, m * (T0 - 1)]),
      expected: [String(m * T0)],
      comparator: "mcq_exact",
      explanation: `1 chance sur ${T0} : pour 1 ${s.nu}, il y a ${T0} ${u.o.p} en tout. Avec ${m} ${s.nuPl}, il y a ${m} fois plus de ${u.o.p} : ${m} × ${T0} = ${m * T0}.`,
    };
  }
  // a chances sur T, combien de NON-X ?
  const T = ri(6, 15);
  const a = ri(1, T - 2);
  return {
    text: `Dans ${lieu} ${de(p.nom)}, il y a ${T} ${u.o.p}, seulement des ${s.nuPl} et des ${t.nuPl}.\nOn a ${chances(a, T)} ${deV(u.verbe)} ${s.un}. Combien y a-t-il de ${t.nuPl} ?`,
    format: "qcm",
    choices: qcmN(T - a, [a, T, T + a, T - a + 1]),
    expected: [String(T - a)],
    comparator: "mcq_exact",
    explanation: `${chances(a, T)} : il y a ${a} ${a > 1 ? s.nuPl : s.nu} sur ${T} ${u.o.p}. Les autres sont des ${t.nuPl} : ${T} − ${a} = ${T - a}.`,
  };
}

/* =========================================================================
   PROBABILITE_DEFI — le plus probable, la moitié, ajouter, deux sacs.
========================================================================= */
function genDefiPlusProbable(): Q {
  const u = pick(TOUTES);
  const p = pick(PRENOMS);
  const k = ri(3, Math.min(4, u.sortes.length - 1));
  const { compo, absentes } = tirerCompo(u, k, 1, 7, true);
  const tri = [...compo].sort((a, b) => b[1] - a[1]);
  const plus = Math.random() < 0.55;
  const [bon, nb] = plus ? tri[0] : tri[tri.length - 1];
  const T = totalDe(compo);
  const verbe = deV(u.verbe);
  const question = plus
    ? pick([`Qu’est-ce qui a le plus de chances ?`, `Qu’est-ce que ${p.nom} a le plus de chances ${verbe} ?`, `Quel est le résultat le plus probable ?`])
    : pick([`Qu’est-ce qui a le moins de chances ?`, `Qu’est-ce que ${p.nom} a le moins de chances ${verbe} ?`, `Quel est le résultat le moins probable (mais possible) ?`]);
  const choix = [...compo.map(([s]) => s.un), ...(k < 4 && absentes[0] ? [absentes[0].un] : [])];
  return {
    text: `${poser(u, p, compo)}\n${question}`,
    format: "qcm",
    choices: makeChoices(bon.un, choix),
    expected: [bon.un],
    comparator: "mcq_exact",
    explanation: `Sur ${T} ${u.o.p} : ${tri.map(([s, n]) => `${chances(n, T)} pour ${s.un}`).join(", ")}. ${maj(bon.un)} a ${plus ? "le plus" : "le moins"} de chances (${chances(nb, T)}).`,
    canvas: urneCanvas(u, compo),
  };
}

function genDefiEvenements(): Q {
  const p = pick(PRENOMS);
  for (let essai = 0; essai < 30; essai++) {
    const e = pick(EXPS)();
    const evs = shuffle(evenements(e).filter((x) => x.fav.length > 0 && x.fav.length < e.N));
    const pris: Ev[] = [];
    for (const x of evs) if (pris.length < 3 && !pris.some((y) => y.fav.length === x.fav.length)) pris.push(x);
    if (pris.length < 3) continue;
    const plus = Math.random() < 0.55;
    const tri = [...pris].sort((a, b) => b.fav.length - a.fav.length);
    const bon = plus ? tri[0] : tri[2];
    const txt = (x: Ev) => `${e.verbe} ${x.txt}`;
    return {
      text: `${e.pose(p)}\n${plus ? "Lequel de ces événements a le plus de chances ?" : "Lequel de ces événements a le moins de chances ?"}`,
      format: "qcm",
      choices: shuffle(pris.map(txt)),
      expected: [txt(bon)],
      comparator: "mcq_exact",
      explanation: `On compte les ${e.unite[1]} favorables, sur ${e.N} : ${tri.map((x) => `« ${txt(x)} » : ${chances(x.fav.length, e.N)}`).join(" ; ")}. Le ${plus ? "plus" : "moins"} probable : « ${txt(bon)} ».`,
      canvas: e.canvas?.([]),
    };
  }
  return genDefiPlusProbable();
}

/** ★4 : plus, moins, ou exactement 1 chance sur 2 ? */
function genDefiMoitie(): Q {
  const u = pick(TOUTES);
  const p = pick(PRENOMS);
  const k = ri(2, Math.min(3, u.sortes.length - 1));
  const vise = pick(["plus", "moins", "egal"]);
  let tire = tirerCompo(u, k, 1, 7).compo;
  for (let essai = 0; essai < 40; essai++) {
    const [, a0] = tire[0];
    const T0 = totalDe(tire);
    if (vise === "plus" ? 2 * a0 > T0 : vise === "moins" ? 2 * a0 < T0 : 2 * a0 === T0) break;
    tire = tirerCompo(u, k, 1, 7).compo;
  }
  const [s, a] = tire[0];
  const T = totalDe(tire);
  const compo = shuffle(tire);
  const PLUS = "plus d’1 chance sur 2";
  const MOINS = "moins d’1 chance sur 2";
  const EGAL = "exactement 1 chance sur 2";
  const bon = 2 * a > T ? PLUS : 2 * a < T ? MOINS : EGAL;
  const moitie = T % 2 === 0 ? `${T / 2}` : `${Math.floor(T / 2)} et demi`;
  return {
    text: `${poser(u, p, compo)}\n${pick([
      `${maj(u.verbe)} ${s.un} : a-t-on plus ou moins d’1 chance sur 2 ?`,
      `${p.nom} a-t-${ilElle(p)} plus d’1 chance sur 2 ${deV(u.verbe)} ${s.un} ?`,
    ])}`,
    format: "qcm",
    choices: shuffle([PLUS, MOINS, EGAL, "c’est certain"]),
    expected: [bon],
    comparator: "mcq_exact",
    explanation: `On a ${chances(a, T)}. La moitié de ${T}, c’est ${moitie}. ${a} est ${bon === PLUS ? "plus grand que" : bon === MOINS ? "plus petit que" : "égal à"} la moitié : ${bon}.`,
    canvas: urneCanvas(u, compo),
  };
}

/** ★5 : on ajoute des objets — combien pour être à égalité ? ou les nouvelles chances. */
function genDefiAjout(): Q {
  const u = pick(URNES);
  const p = pick(PRENOMS);
  const [s, t] = shuffle(u.sortes);
  const a = ri(1, 6);
  const b = ri(a + 1, a + 6);
  const lieu = leN(u.boite[0], u.boite[1]);
  const compo: Compo = [
    [s, a],
    [t, b],
  ];
  const situ = `${maj(lieu)} ${de(p.nom)} contient ${contenu(compo)}.`;
  if (Math.random() < 0.5) {
    const d = b - a;
    return {
      text: `${situ}\n${pick([
        `Combien de ${s.nuPl} faut-il ajouter pour avoir autant de chances ${deV(u.verbe)} ${s.un} que ${t.un} ?`,
        `${p.nom} veut 1 chance sur 2 ${deV(u.verbe)} ${s.un}. Combien de ${s.nuPl} doit-${ilElle(p)} ajouter ?`,
      ])}`,
      format: "qcm",
      choices: qcmN(d, [b, a + b, d + 1, a]),
      expected: [String(d)],
      comparator: "mcq_exact",
      explanation: `Pour avoir autant de chances, il faut autant de ${s.nuPl} que de ${t.nuPl}, soit ${b}. Il y en a ${a} : on en ajoute ${b} − ${a} = ${d}. Alors on a ${b} chances sur ${2 * b}, c’est 1 chance sur 2.`,
      canvas: urneCanvas(u, compo),
    };
  }
  const m = ri(1, 5);
  const T = a + b;
  return {
    text: `${situ}\n${p.nom} ajoute ${s.des(m)}. ${pick([
      `Combien de chances sur combien a-t-${ilElle(p)} maintenant ${deV(u.verbe)} ${s.un} ?`,
      `Maintenant, ${u.verbe} ${s.un} : combien de chances sur combien ?`,
    ])}`,
    format: "qcm",
    choices: qcmChances([a + m, T + m], [[a + m, T], [a, T + m], [a, T], [a + m, b]]),
    expected: [chances(a + m, T + m)],
    comparator: "mcq_exact",
    explanation: `Après l’ajout : ${a} + ${m} = ${a + m} ${a + m > 1 ? s.nuPl : s.nu}, et ${T} + ${m} = ${T + m} ${u.o.p} en tout. On a donc ${chances(a + m, T + m)}. Attention : le total change aussi !`,
    canvas: urneCanvas(u, [
      [s, a + m],
      [t, b],
    ]),
  };
}

/** Deux sacs (ou deux roues) : dans lequel a-t-on le plus de chances ? `dur` : totaux multiples. */
function deuxSacs(dur: boolean): Q {
  const u = pick(TOUTES);
  const p = pick(PRENOMS);
  const [s, t] = shuffle(u.sortes);
  const [nom, f] = u.boite;
  let a1: number, T1: number, a2: number, T2: number;
  let raison: string;
  if (dur) {
    T1 = ri(2, 5);
    const m = T1 <= 3 ? ri(2, 4) : ri(2, 3);
    T2 = m * T1;
    a1 = ri(1, T1 - 1);
    const cible = pick(["autant", "A", "B"]);
    a2 = cible === "autant" ? a1 * m : cible === "A" ? ri(1, a1 * m - 1) : ri(a1 * m + 1, T2 - 1);
    if (a2 < 1 || a2 >= T2) a2 = a1 * m;
    raison = `${chances(a1, T1)}, c’est comme ${chances(a1 * m, T2)} (on multiplie tout par ${m}). On compare ${a1 * m} et ${a2} chances sur ${T2}.`;
  } else {
    const type = ri(0, 2);
    if (type === 0) {
      // même nombre de favorables, totaux différents
      a1 = a2 = ri(1, 4);
      T1 = ri(a1 + 1, a1 + 8);
      do T2 = ri(a1 + 1, a1 + 12); while (T2 === T1);
      raison = `Il y a ${s.des(a1)} de chaque côté. Mais ${chances(a1, T1)} et ${chances(a1, T2)} : moins il y a de ${u.o.p} en tout, plus on a de chances.`;
    } else if (type === 1) {
      // même total, favorables différents
      T1 = T2 = ri(5, 12);
      a1 = ri(1, T1 - 1);
      a2 = ri(1, T2 - 1);
      raison = `Même total des deux côtés (${T1}) : on compare ${a1} et ${a2} chances sur ${T1}.`;
    } else {
      // le double : autant
      a1 = ri(1, 4);
      T1 = ri(a1 + 1, a1 + 4);
      a2 = 2 * a1;
      T2 = 2 * T1;
      raison = `${maj(chances(a1, T1))}, c’est comme ${chances(a2, T2)} : tout est doublé. Les chances sont les mêmes.`;
    }
  }
  const v1 = a1 * T2;
  const v2 = a2 * T1;
  const NA = `${leN(nom, f)} A`;
  const NB = `${leN(nom, f)} B`;
  const AUTANT = "autant dans les deux";
  const bon = v1 > v2 ? NA : v1 < v2 ? NB : AUTANT;
  const ilsContient = u.roue ? "a" : "contient";
  const desc = (a: number, T: number) => `${s.des(a)} et ${t.des(T - a)}`;
  const text = `${maj(NA)} ${ilsContient} ${desc(a1, T1)}.\n${maj(NB)} ${ilsContient} ${desc(a2, T2)}.\n${pick([
    `${maj(u.dans)} quel${f ? "le" : ""} ${nom} ${p.nom} a-t-${ilElle(p)} le plus de chances ${deV(u.verbe)} ${s.un} ?`,
    `${p.nom} veut ${u.verbe} ${s.un}. Quel${f ? "le" : ""} ${nom} doit-${ilElle(p)} choisir ?`,
  ])}`;
  return {
    text,
    format: "qcm",
    choices: shuffle([NA, NB, AUTANT, "on ne peut pas comparer"]),
    expected: [bon],
    comparator: "mcq_exact",
    explanation: `${maj(NA)} : ${chances(a1, T1)}. ${maj(NB)} : ${chances(a2, T2)}. ${raison} Réponse : ${bon}.`,
  };
}
const genDefiDeuxSacs = () => deuxSacs(true);

/* =========================================================================
   PROBABILITE_COMPARER — qui a le plus de chances ?
========================================================================= */
function genComparerUrne(): Q {
  const u = pick(TOUTES);
  const p = pick(PRENOMS);
  const k = ri(2, Math.min(3, u.sortes.length - 1));
  const { compo } = tirerCompo(u, k, 1, 7);
  if (Math.random() < 0.25) compo[1][1] = compo[0][1];
  const [[s1, n1], [s2, n2]] = compo;
  const affiche = shuffle(compo);
  const AUTANT = "autant de chances pour les deux";
  const bon = n1 > n2 ? s1.un : n1 < n2 ? s2.un : AUTANT;
  const verbe = deV(u.verbe);
  const text = `${poser(u, p, affiche)}\n${pick([
    `Qu’est-ce que ${p.nom} a le plus de chances ${verbe} : ${s1.un} ou ${s2.un} ?`,
    `${maj(s1.un)} ou ${s2.un} : qu’est-ce qui a le plus de chances ?`,
    `${p.nom} et ${autre(p).nom} font un pari. Sur quoi vaut-il mieux parier : ${s1.un} ou ${s2.un} ?`,
  ])}`;
  return {
    text,
    format: "qcm",
    choices: shuffle([s1.un, s2.un, AUTANT, "on ne peut pas savoir"]),
    expected: [bon],
    comparator: "mcq_exact",
    explanation:
      bon === AUTANT
        ? `Il y a ${s1.des(n1)} et ${s2.des(n2)} : autant des deux. Les chances sont égales.`
        : `On compare : ${s1.des(n1)} contre ${s2.des(n2)}. Les ${(n1 > n2 ? s1 : s2).nuPl} sont plus ${(n1 > n2 ? s1 : s2).f ? "nombreuses" : "nombreux"} : on a ${chances(Math.max(n1, n2), totalDe(compo))} contre ${chances(Math.min(n1, n2), totalDe(compo))}. Le plus probable : ${n1 > n2 ? s1.un : s2.un}.`,
    canvas: urneCanvas(u, affiche),
  };
}

function genComparerEvenements(): Q {
  const p = pick(PRENOMS);
  for (let essai = 0; essai < 30; essai++) {
    const e = pick(EXPS)();
    const evs = shuffle(evenements(e).filter((x) => x.fav.length > 0 && x.fav.length < e.N));
    if (evs.length < 2) continue;
    const [e1, e2] = evs;
    const a1 = e1.fav.length;
    const a2 = e2.fav.length;
    const t1 = `${e.verbe} ${e1.txt}`;
    const t2 = `${e.verbe} ${e2.txt}`;
    const AUTANT = "autant l’un que l’autre";
    const bon = a1 > a2 ? t1 : a1 < a2 ? t2 : AUTANT;
    const d1 = a1 <= 8 ? ` (${listeEt(e1.fav.map(String))})` : "";
    const d2 = a2 <= 8 ? ` (${listeEt(e2.fav.map(String))})` : "";
    return {
      text: `${e.pose(p)}\n${pick([
        `Qu’est-ce qui a le plus de chances : ${t1}, ou ${t2} ?`,
        `${p.nom} hésite : ${t1}, ou ${t2}. Lequel est le plus probable ?`,
      ])}`,
      format: "qcm",
      choices: shuffle([t1, t2, AUTANT, "on ne peut pas savoir"]),
      expected: [bon],
      comparator: "mcq_exact",
      explanation: `On compte les ${e.unite[1]} favorables. « ${t1} » : ${a1}${d1}, donc ${chances(a1, e.N)}. « ${t2} » : ${a2}${d2}, donc ${chances(a2, e.N)}. ${bon === AUTANT ? "C’est autant." : `Le plus probable : « ${bon} ».`}`,
      canvas: e.canvas?.([]),
    };
  }
  return genComparerUrne();
}
const genComparerDeuxSacs = () => deuxSacs(false);

/** Un gabarit de la notion « probabilite » (CM2). */
function gabCm2(
  id: string,
  microId: string,
  difficulty: 1 | 2 | 3 | 4 | 5,
  hint: string,
  tags: string[],
  generate: () => Q,
): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["cm2", "probabilite", ...tags, "template", "qcm"],
    generate,
  };
}

// ============================================================
// BANK
// ============================================================

export const probabilitesBank: TutorBankItemV4[] = [
  // ============================================================
  // PROBABILITE_VOCABULAIRE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_probabilite_vocabulaire_fixed_1_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "En probabilité, un événement “certain” est un événement qui...",
    format: "qcm",
    choices: [
      "se produit toujours",
      "ne se produit jamais",
      "peut se produire mais pas toujours",
      "est choisi au hasard",
    ],
    expected: ["se produit toujours"],
    comparator: "mcq_exact",
    hint: "Certain veut dire que cela arrive à chaque fois.",
    explanation:
      "Un événement certain se produit toujours. Par exemple, avec un dé classique, obtenir un nombre entre 1 et 6 est certain.",
    tags: ["cm2", "probabilite", "vocabulaire", "certain", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_vocabulaire_fixed_2_impossible",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "En probabilité, un événement “impossible” est un événement qui...",
    format: "qcm",
    choices: [
      "ne peut jamais se produire",
      "se produit toujours",
      "se produit une fois sur deux",
      "est plus fréquent que les autres",
    ],
    expected: ["ne peut jamais se produire"],
    comparator: "mcq_exact",
    hint: "Impossible veut dire que cela ne peut pas arriver.",
    explanation:
      "Un événement impossible ne peut jamais se produire. Par exemple, obtenir 7 avec un dé classique est impossible.",
    tags: ["cm2", "probabilite", "vocabulaire", "impossible", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_vocabulaire_fixed_3_possible",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Un événement “possible” est un événement qui...",
    format: "qcm",
    choices: [
      "peut se produire",
      "ne peut jamais se produire",
      "se produit obligatoirement",
      "est toujours le plus probable",
    ],
    expected: ["peut se produire"],
    comparator: "mcq_exact",
    hint: "Possible veut dire que cela peut arriver.",
    explanation:
      "Un événement possible peut se produire, mais il n’est pas forcément certain.",
    tags: ["cm2", "probabilite", "vocabulaire", "possible", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_vocabulaire_fixed_4_de_obtenir_7",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Avec un dé classique, obtenir 7 est...",
    format: "qcm",
    choices: ["impossible", "certain", "possible", "obligatoire"],
    expected: ["impossible"],
    comparator: "mcq_exact",
    hint: "Un dé classique a les faces 1, 2, 3, 4, 5 et 6.",
    explanation:
      "Un dé classique n’a pas de face 7. Obtenir 7 est donc impossible.",
    tags: ["cm2", "probabilite", "vocabulaire", "de", "impossible", "qcm", "canvas"],
    canvas: deCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_vocabulaire_fixed_5_de_1_a_6",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Avec un dé classique, obtenir un nombre entre 1 et 6 est...",
    format: "qcm",
    choices: ["certain", "impossible", "rare", "faux"],
    expected: ["certain"],
    comparator: "mcq_exact",
    hint: "Toutes les faces du dé sont entre 1 et 6.",
    explanation:
      "Toutes les faces d’un dé classique sont 1, 2, 3, 4, 5 ou 6. Obtenir un nombre entre 1 et 6 est donc certain.",
    tags: ["cm2", "probabilite", "vocabulaire", "de", "certain", "qcm", "canvas"],
    canvas: deCanvas([1, 2, 3, 4, 5, 6]),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_vocabulaire_fixed_6_de_pair",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Avec un dé classique, obtenir un nombre pair est...",
    format: "qcm",
    choices: ["possible", "impossible", "certain", "obligatoire"],
    expected: ["possible"],
    comparator: "mcq_exact",
    hint: "Les nombres pairs du dé sont 2, 4 et 6.",
    explanation:
      "Obtenir un nombre pair est possible car les faces 2, 4 et 6 existent. Mais ce n’est pas certain, car on peut aussi obtenir 1, 3 ou 5.",
    tags: ["cm2", "probabilite", "vocabulaire", "de", "pair", "qcm", "canvas"],
    canvas: deCanvas([2, 4, 6]),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_vocabulaire_fixed_7_de_impair",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Avec un dé classique, obtenir un nombre impair est...",
    format: "qcm",
    choices: ["possible", "certain", "impossible", "sans hasard"],
    expected: ["possible"],
    comparator: "mcq_exact",
    hint: "Les nombres impairs du dé sont 1, 3 et 5.",
    explanation:
      "Obtenir un nombre impair est possible car les faces 1, 3 et 5 existent. Ce n’est pas certain, car il existe aussi des faces paires.",
    tags: ["cm2", "probabilite", "vocabulaire", "de", "impair", "qcm", "canvas"],
    canvas: deCanvas([1, 3, 5]),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_vocabulaire_fixed_8_roue_couleur",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Avec cette roue, tomber sur rouge est...",
    format: "qcm",
    choices: ["possible", "impossible", "certain", "toujours sûr"],
    expected: ["possible"],
    comparator: "mcq_exact",
    hint: "La roue contient une partie rouge, mais aussi d’autres couleurs.",
    explanation:
      "Tomber sur rouge est possible car la roue contient une partie rouge. Mais ce n’est pas certain car il existe aussi d’autres couleurs.",
    tags: ["cm2", "probabilite", "vocabulaire", "roue", "possible", "qcm", "canvas"],
    canvas: roueSimpleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_vocabulaire_fixed_9_roue_noir",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Avec cette roue, tomber sur noir est...",
    format: "qcm",
    choices: ["impossible", "possible", "certain", "plus probable"],
    expected: ["impossible"],
    comparator: "mcq_exact",
    hint: "Regarde les couleurs présentes sur la roue.",
    explanation:
      "La roue ne contient aucune partie noire. Tomber sur noir est donc impossible.",
    tags: ["cm2", "probabilite", "vocabulaire", "roue", "impossible", "qcm", "canvas"],
    canvas: roueSimpleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_vocabulaire_fixed_10_billes_rouge",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Dans ce sac, tirer une bille rouge est...",
    format: "qcm",
    choices: ["possible", "impossible", "certain", "sans hasard"],
    expected: ["possible"],
    comparator: "mcq_exact",
    hint: "Observe les billes rouges dans le sac.",
    explanation:
      "Il y a des billes rouges dans le sac. Tirer une bille rouge est donc possible.",
    tags: ["cm2", "probabilite", "vocabulaire", "billes", "possible", "qcm", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_vocabulaire_fixed_11_billes_jaune",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Dans ce sac, tirer une bille jaune est...",
    format: "qcm",
    choices: ["impossible", "possible", "certain", "plus probable que rouge"],
    expected: ["impossible"],
    comparator: "mcq_exact",
    hint: "Cherche s’il y a une bille jaune.",
    explanation:
      "Le sac contient des billes rouges, bleues et vertes, mais pas de bille jaune. Tirer une bille jaune est impossible.",
    tags: ["cm2", "probabilite", "vocabulaire", "billes", "impossible", "qcm", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_vocabulaire_fixed_12_tableau_vocabulaire",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    text: "Dans le tableau, quel mot correspond à “Obtenir un nombre de 1 à 6” avec un dé ?",
    format: "qcm",
    choices: ["certain", "impossible", "possible", "rare"],
    expected: ["certain"],
    comparator: "mcq_exact",
    hint: "Toutes les faces du dé sont de 1 à 6.",
    explanation:
      "Avec un dé classique, obtenir un nombre de 1 à 6 est certain, car toutes les faces sont dans cet intervalle.",
    tags: ["cm2", "probabilite", "vocabulaire", "tableau", "certain", "qcm", "canvas"],
    canvas: tableauIssuesDeCanvas(),
  },




  {
    kind: "template",
    id: "cm2_probabilite_vocabulaire_tpl_1_de",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde les faces possibles du dé.",
    tags: ["cm2", "probabilite", "vocabulaire", "de", "template", "qcm", "canvas"],
    generate: genVocabNombres,
  },

  {
    kind: "template",
    id: "cm2_probabilite_vocabulaire_tpl_2_billes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde si la couleur existe dans le sac.",
    tags: ["cm2", "probabilite", "vocabulaire", "billes", "template", "qcm", "canvas"],
    generate: genVocabUrne,
  },

    // ============================================================
  // PROBABILITE_HASARD
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_probabilite_hasard_fixed_1_definition",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 1,
    theme: "neutral",
    text: "Une situation de hasard est une situation où...",
    format: "qcm",
    choices: [
      "on ne peut pas prévoir avec certitude le résultat",
      "on connaît toujours le résultat à l’avance",
      "il n’y a jamais de résultat possible",
      "il n’y a pas besoin d’observer",
    ],
    expected: ["on ne peut pas prévoir avec certitude le résultat"],
    comparator: "mcq_exact",
    hint: "Avec le hasard, on ne sait pas exactement ce qui va arriver.",
    explanation:
      "Une situation de hasard est une situation dont on ne connaît pas le résultat à l’avance. On peut seulement dire ce qui est possible, impossible ou certain.",
    tags: ["cm2", "probabilite", "hasard", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_hasard_fixed_2_lancer_de",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 1,
    theme: "neutral",
    text: "Lancer un dé classique est une situation de hasard parce que...",
    format: "qcm",
    choices: [
      "on ne sait pas à l’avance quelle face va sortir",
      "on obtient toujours 6",
      "il n’y a aucune face possible",
      "le résultat est choisi par l’élève après le lancer",
    ],
    expected: ["on ne sait pas à l’avance quelle face va sortir"],
    comparator: "mcq_exact",
    hint: "Avant le lancer, plusieurs faces peuvent sortir.",
    explanation:
      "Quand on lance un dé, plusieurs résultats sont possibles. On ne sait pas à l’avance quelle face va sortir : c’est une situation de hasard.",
    tags: ["cm2", "probabilite", "hasard", "de", "qcm", "canvas"],
    canvas: deCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_hasard_fixed_3_roue",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 1,
    theme: "neutral",
    text: "Faire tourner cette roue est une situation de hasard parce que...",
    format: "qcm",
    choices: [
      "on ne sait pas à l’avance sur quelle couleur la roue va s’arrêter",
      "la roue s’arrête toujours sur rouge",
      "la roue n’a aucune couleur",
      "on peut choisir la couleur après avoir tourné",
    ],
    expected: ["on ne sait pas à l’avance sur quelle couleur la roue va s’arrêter"],
    comparator: "mcq_exact",
    hint: "La roue peut s’arrêter sur plusieurs couleurs.",
    explanation:
      "La roue contient plusieurs couleurs. Avant de la faire tourner, on ne sait pas exactement sur quelle couleur elle va s’arrêter.",
    tags: ["cm2", "probabilite", "hasard", "roue", "qcm", "canvas"],
    canvas: roueSimpleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_hasard_fixed_4_tirer_bille",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 1,
    theme: "neutral",
    text: "Tirer une bille au hasard dans un sac sans regarder est...",
    format: "qcm",
    choices: [
      "une situation de hasard",
      "une situation certaine",
      "un calcul posé",
      "une construction géométrique",
    ],
    expected: ["une situation de hasard"],
    comparator: "mcq_exact",
    hint: "On ne voit pas la bille avant de la tirer.",
    explanation:
      "Quand on tire une bille sans regarder, on ne connaît pas la couleur à l’avance. C’est donc une situation de hasard.",
    tags: ["cm2", "probabilite", "hasard", "billes", "qcm", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_hasard_fixed_5_pas_hasard_2plus3",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer 2 + 3 est-il une situation de hasard ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le résultat de 2 + 3 est toujours le même.",
    explanation:
      "Non. Calculer 2 + 3 n’est pas une situation de hasard, car le résultat est toujours 5.",
    tags: ["cm2", "probabilite", "hasard", "non_hasard", "calcul", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_hasard_fixed_6_pas_hasard_date",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 2,
    theme: "neutral",
    text: "Lire la date du jour au tableau est-il une situation de hasard ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La date est déjà connue.",
    explanation:
      "Non. Lire la date du jour n’est pas une situation de hasard, car l’information est déjà connue.",
    tags: ["cm2", "probabilite", "hasard", "non_hasard", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_hasard_fixed_7_hasard_piece",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 2,
    theme: "neutral",
    text: "Lancer une pièce de monnaie est une situation de hasard parce que...",
    format: "qcm",
    choices: [
      "on peut obtenir pile ou face",
      "on obtient toujours pile",
      "il n’y a aucun résultat possible",
      "le résultat est connu avant de lancer",
    ],
    expected: ["on peut obtenir pile ou face"],
    comparator: "mcq_exact",
    hint: "Avant le lancer, deux résultats sont possibles.",
    explanation:
      "Quand on lance une pièce, on peut obtenir pile ou face. On ne connaît pas le résultat avant le lancer.",
    tags: ["cm2", "probabilite", "hasard", "piece", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_hasard_fixed_8_reunion_tombola",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 2,
    theme: "reunion",
    text: "À une tombola d’école à La Réunion, on tire un ticket au hasard. Pourquoi est-ce une situation de hasard ?",
    format: "qcm",
    choices: [
      "on ne sait pas à l’avance quel ticket sera tiré",
      "le même ticket gagne toujours",
      "il n’y a aucun ticket",
      "on choisit le gagnant après avoir vu le ticket",
    ],
    expected: ["on ne sait pas à l’avance quel ticket sera tiré"],
    comparator: "mcq_exact",
    hint: "Avant le tirage, plusieurs tickets peuvent sortir.",
    explanation:
      "Dans une tombola, plusieurs tickets peuvent être tirés. On ne sait pas à l’avance lequel sortira : c’est une situation de hasard.",
    tags: ["cm2", "probabilite", "hasard", "reunion", "tombola", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_hasard_fixed_9_reunion_meteo",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 3,
    theme: "reunion",
    text: "Dire “il pleuvra sûrement demain” est-il une certitude mathématique ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La météo peut être prévue, mais pas avec certitude absolue.",
    explanation:
      "Non. La météo donne une prévision, mais on ne connaît pas toujours le résultat avec certitude. Il y a une part d’incertitude.",
    tags: ["cm2", "probabilite", "hasard", "reunion", "meteo", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_hasard_fixed_10_experience_aleatoire",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 3,
    theme: "neutral",
    text: "Une expérience aléatoire est une expérience dont...",
    format: "qcm",
    choices: [
      "le résultat n’est pas connu avec certitude avant de la réaliser",
      "le résultat est toujours impossible",
      "le résultat est toujours choisi par le professeur",
      "le résultat ne peut jamais changer",
    ],
    expected: ["le résultat n’est pas connu avec certitude avant de la réaliser"],
    comparator: "mcq_exact",
    hint: "Aléatoire veut dire lié au hasard.",
    explanation:
      "Une expérience aléatoire est une expérience liée au hasard. On connaît les résultats possibles, mais pas forcément celui qui va se produire.",
    tags: ["cm2", "probabilite", "hasard", "experience_aleatoire", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_hasard_fixed_11_resultats_possibles",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 3,
    theme: "neutral",
    text: "Quand on lance un dé classique, les résultats possibles sont...",
    format: "qcm",
    choices: [
      "1, 2, 3, 4, 5 et 6",
      "seulement 1",
      "7, 8 et 9",
      "aucun résultat",
    ],
    expected: ["1, 2, 3, 4, 5 et 6"],
    comparator: "mcq_exact",
    hint: "Regarde les faces du dé.",
    explanation:
      "Un dé classique possède les faces 1, 2, 3, 4, 5 et 6. Ce sont les résultats possibles.",
    tags: ["cm2", "probabilite", "hasard", "de", "issues", "qcm", "canvas"],
    canvas: deCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_hasard_fixed_12_resultats_roue",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 3,
    theme: "neutral",
    text: "Avec cette roue, quels résultats sont possibles ?",
    format: "qcm",
    choices: [
      "Rouge, Bleu, Vert ou Jaune",
      "Seulement Rouge",
      "Noir ou Blanc",
      "Aucun résultat",
    ],
    expected: ["Rouge, Bleu, Vert ou Jaune"],
    comparator: "mcq_exact",
    hint: "Lis les couleurs présentes sur la roue.",
    explanation:
      "La roue contient les couleurs Rouge, Bleu, Vert et Jaune. Ce sont les résultats possibles.",
    tags: ["cm2", "probabilite", "hasard", "roue", "issues", "qcm", "canvas"],
    canvas: roueSimpleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_hasard_fixed_13_erreur_toujours_rouge",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : “Comme il y a du rouge sur la roue, on tombera forcément sur rouge.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La roue contient aussi d’autres couleurs.",
    explanation:
      "Non. Rouge est possible, mais pas certain, car la roue contient aussi Bleu, Vert et Jaune.",
    tags: ["cm2", "probabilite", "hasard", "erreur", "roue", "qcm", "canvas"],
    canvas: roueSimpleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_hasard_fixed_14_erreur_de_choisir",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève lance un dé puis choisit lui-même le résultat. Est-ce encore une vraie situation de hasard ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Dans le hasard, on ne choisit pas le résultat après coup.",
    explanation:
      "Non. Si l’élève choisit le résultat, ce n’est plus une vraie situation de hasard. Dans une situation de hasard, le résultat n’est pas décidé après coup.",
    tags: ["cm2", "probabilite", "hasard", "erreur", "de", "qcm"],
  },




  {
    kind: "template",
    id: "cm2_probabilite_hasard_tpl_1_reconnaitre",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 2,
    theme: "neutral",
    hint: "Demande-toi si le résultat est connu à l’avance.",
    tags: ["cm2", "probabilite", "hasard", "reconnaitre", "template", "qcm"],
    generate: genHasardOuiNon,
  },

  {
    kind: "template",
    id: "cm2_probabilite_hasard_tpl_2_resultats_possibles",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 3,
    theme: "neutral",
    hint: "Liste seulement les résultats qui peuvent vraiment arriver.",
    tags: ["cm2", "probabilite", "hasard", "issues", "template", "qcm", "canvas"],
    generate: genHasardIssues,
  },
    // ============================================================
  // PROBABILITE_ROUE_DE_SAC
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_probabilite_roue_sac_fixed_1_de_faces",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 1,
    theme: "neutral",
    text: "Avec un dé classique, combien y a-t-il de faces possibles ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Compte les faces du dé : 1, 2, 3, 4, 5 et 6.",
    explanation:
      "Un dé classique possède 6 faces. Les résultats possibles sont 1, 2, 3, 4, 5 et 6.",
    tags: ["cm2", "probabilite", "de", "issues", "short", "canvas"],
    canvas: deCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_roue_sac_fixed_2_de_pair",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    text: "Avec un dé classique, combien de faces permettent d’obtenir un nombre pair ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Les nombres pairs du dé sont 2, 4 et 6.",
    explanation:
      "Les faces favorables sont 2, 4 et 6. Il y a donc 3 faces qui permettent d’obtenir un nombre pair.",
    tags: ["cm2", "probabilite", "de", "pair", "short", "canvas"],
    canvas: deCanvas([2, 4, 6]),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_roue_sac_fixed_3_de_superieur_4",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    text: "Avec un dé classique, combien de faces permettent d’obtenir un nombre supérieur à 4 ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Les nombres supérieurs à 4 sont 5 et 6.",
    explanation:
      "Les faces favorables sont 5 et 6. Il y a donc 2 faces qui permettent d’obtenir un nombre supérieur à 4.",
    tags: ["cm2", "probabilite", "de", "superieur", "short", "canvas"],
    canvas: deCanvas([5, 6]),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_roue_sac_fixed_4_de_obtenir_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    text: "Avec un dé classique, combien de faces permettent d’obtenir exactement 1 ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Une seule face porte le nombre 1.",
    explanation:
      "Une seule face du dé porte le nombre 1. Il y a donc 1 face favorable.",
    tags: ["cm2", "probabilite", "de", "face", "short", "canvas"],
    canvas: deCanvas([1]),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_roue_sac_fixed_5_roue_nombre_segments",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    text: "Sur cette roue simple, combien de couleurs différentes peut-on obtenir ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Compte les couleurs indiquées sur la roue.",
    explanation:
      "La roue contient Rouge, Bleu, Vert et Jaune. Il y a donc 4 couleurs possibles.",
    tags: ["cm2", "probabilite", "roue", "issues", "short", "canvas"],
    canvas: roueSimpleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_roue_sac_fixed_6_roue_rouge_parts",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    text: "Sur cette roue, quelle couleur occupe le plus de place ?",
    format: "qcm",
    choices: ["Rouge", "Bleu", "Vert", "Jaune"],
    expected: ["Rouge"],
    comparator: "mcq_exact",
    hint: "Regarde la couleur qui a la plus grande part.",
    explanation:
      "Rouge occupe plus de place que les autres couleurs. C’est donc la couleur qui a le plus de chances de sortir.",
    tags: ["cm2", "probabilite", "roue", "comparer", "qcm", "canvas"],
    canvas: roueRougeFavoriCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_roue_sac_fixed_7_roue_bleu_possible",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    text: "Sur cette roue, tomber sur Bleu est-il possible ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Cherche s’il y a une partie bleue.",
    explanation:
      "Oui. La roue contient une partie bleue. Tomber sur Bleu est donc possible.",
    tags: ["cm2", "probabilite", "roue", "possible", "qcm", "canvas"],
    canvas: roueRougeFavoriCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_roue_sac_fixed_8_roue_noir_impossible",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    text: "Sur cette roue, tomber sur Noir est-il possible ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Regarde si la couleur noire apparaît sur la roue.",
    explanation:
      "Non. La roue ne contient aucune partie noire. Tomber sur Noir est impossible.",
    tags: ["cm2", "probabilite", "roue", "impossible", "qcm", "canvas"],
    canvas: roueSimpleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_roue_sac_fixed_9_billes_nombre_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de billes y a-t-il dans ce sac ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Compte toutes les billes représentées.",
    explanation:
      "On compte toutes les billes du sac : 3 rouges, 2 bleues et 1 verte. Il y a donc 6 billes.",
    tags: ["cm2", "probabilite", "billes", "total", "short", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_roue_sac_fixed_10_billes_rouges",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de billes rouges y a-t-il dans ce sac ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Compte les billes marquées R.",
    explanation:
      "Il y a 3 billes rouges dans le sac.",
    tags: ["cm2", "probabilite", "billes", "rouge", "short", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_roue_sac_fixed_11_billes_bleues",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de billes bleues y a-t-il dans ce sac ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Compte les billes marquées B.",
    explanation:
      "Il y a 2 billes bleues dans le sac.",
    tags: ["cm2", "probabilite", "billes", "bleu", "short", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_roue_sac_fixed_12_billes_vertes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de billes vertes y a-t-il dans ce sac ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Compte les billes marquées V.",
    explanation:
      "Il y a 1 bille verte dans le sac.",
    tags: ["cm2", "probabilite", "billes", "vert", "short", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_roue_sac_fixed_13_billes_jaunes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de billes jaunes y a-t-il dans ce sac ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Cherche les billes jaunes.",
    explanation:
      "Il n’y a aucune bille jaune dans ce sac. Il y a donc 0 bille jaune.",
    tags: ["cm2", "probabilite", "billes", "jaune", "impossible", "short", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_roue_sac_fixed_14_billes_evenement_rouge",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 3,
    theme: "neutral",
    text: "Dans ce sac, tirer une bille rouge correspond à combien de billes favorables ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Les billes favorables sont les billes rouges.",
    explanation:
      "Les billes favorables sont les billes rouges. Il y en a 3.",
    tags: ["cm2", "probabilite", "billes", "favorable", "rouge", "short", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_roue_sac_fixed_15_billes_evenement_non_verte",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 4,
    theme: "neutral",
    text: "Dans ce sac, tirer une bille qui n’est pas verte correspond à combien de billes favorables ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Compte les billes rouges et bleues.",
    explanation:
      "Les billes qui ne sont pas vertes sont les rouges et les bleues. Il y en a 3 + 2 = 5.",
    tags: ["cm2", "probabilite", "billes", "non_verte", "short", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_roue_sac_fixed_16_erreur_billes_total",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit qu’il y a 5 billes dans le sac. A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Compte toutes les billes.",
    explanation:
      "Non. Il y a 3 billes rouges, 2 bleues et 1 verte, donc 6 billes au total.",
    tags: ["cm2", "probabilite", "billes", "erreur", "total", "qcm", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_roue_sac_fixed_17_erreur_roue_part",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : “Sur cette roue, toutes les couleurs ont autant de chances.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Regarde la place occupée par Rouge.",
    explanation:
      "Non. Rouge occupe plus de place que les autres couleurs. Toutes les couleurs n’ont donc pas autant de chances.",
    tags: ["cm2", "probabilite", "roue", "erreur", "qcm", "canvas"],
    canvas: roueRougeFavoriCanvas(),
  },




  {
    kind: "template",
    id: "cm2_probabilite_roue_sac_tpl_1_de_faces_favorables",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les faces qui vérifient la condition.",
    tags: ["cm2", "probabilite", "de", "faces_favorables", "template", "short", "canvas"],
    generate: genRoueFavorables,
  },

  {
    kind: "template",
    id: "cm2_probabilite_roue_sac_tpl_2_sac_billes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les billes concernées.",
    tags: ["cm2", "probabilite", "billes", "template", "short", "canvas"],
    generate: genRoueChances,
  },

  {
    kind: "template",
    id: "cm2_probabilite_roue_sac_tpl_3_roue",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 3,
    theme: "neutral",
    hint: "Observe la taille des parts.",
    tags: ["cm2", "probabilite", "roue", "template", "qcm", "canvas"],
    generate: genRoueContraire,
  },
    // ============================================================
  // PROBABILITE_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_probabilite_defi_fixed_1_sac_plus_probable",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Dans ce sac, quelle couleur a le plus de chances d’être tirée ?",
    format: "qcm",
    choices: ["rouge", "bleue", "verte", "jaune"],
    expected: ["rouge"],
    comparator: "mcq_exact",
    hint: "Compte les billes de chaque couleur.",
    explanation:
      "Il y a 3 billes rouges, 2 billes bleues et 1 bille verte. La couleur rouge est donc la plus probable.",
    tags: ["cm2", "probabilite", "defi", "billes", "plus_probable", "qcm", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_defi_fixed_2_sac_moins_probable",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Dans ce sac, quelle couleur a le moins de chances d’être tirée ?",
    format: "qcm",
    choices: ["verte", "rouge", "bleue", "autant"],
    expected: ["verte"],
    comparator: "mcq_exact",
    hint: "Cherche la couleur la moins représentée.",
    explanation:
      "Il y a 1 bille verte, contre 2 bleues et 3 rouges. La bille verte est donc la moins probable.",
    tags: ["cm2", "probabilite", "defi", "billes", "moins_probable", "qcm", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_defi_fixed_3_sac_non_verte",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Dans ce sac, combien de billes permettent de tirer une bille qui n’est pas verte ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Compte les billes rouges et bleues.",
    explanation:
      "Les billes qui ne sont pas vertes sont les rouges et les bleues. Il y en a 3 + 2 = 5.",
    tags: ["cm2", "probabilite", "defi", "billes", "non_verte", "short", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_defi_fixed_4_de_plus_probable",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Avec un dé classique, lequel est le plus probable ?",
    format: "qcm",
    choices: [
      "obtenir un nombre pair",
      "obtenir 6",
      "obtenir 7",
      "obtenir 1",
    ],
    expected: ["obtenir un nombre pair"],
    comparator: "mcq_exact",
    hint: "Compte les faces favorables.",
    explanation:
      "Obtenir un nombre pair correspond à 3 faces : 2, 4 et 6. Obtenir 6 ou 1 correspond à une seule face, et obtenir 7 est impossible.",
    tags: ["cm2", "probabilite", "defi", "de", "comparer", "qcm", "canvas"],
    canvas: deCanvas([2, 4, 6]),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_defi_fixed_5_de_impossible",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Avec un dé classique, lequel est impossible ?",
    format: "qcm",
    choices: [
      "obtenir 8",
      "obtenir 2",
      "obtenir un nombre pair",
      "obtenir un nombre inférieur à 6",
    ],
    expected: ["obtenir 8"],
    comparator: "mcq_exact",
    hint: "Regarde les faces du dé.",
    explanation:
      "Un dé classique possède les faces 1, 2, 3, 4, 5 et 6. Obtenir 8 est donc impossible.",
    tags: ["cm2", "probabilite", "defi", "de", "impossible", "qcm", "canvas"],
    canvas: deCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_defi_fixed_6_de_autant",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Avec un dé classique, obtenir un nombre pair et obtenir un nombre impair ont-ils autant de chances ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Compte les faces paires et les faces impaires.",
    explanation:
      "Il y a 3 faces paires : 2, 4 et 6. Il y a aussi 3 faces impaires : 1, 3 et 5. Les chances sont donc les mêmes.",
    tags: ["cm2", "probabilite", "defi", "de", "autant", "qcm", "canvas"],
    canvas: deCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_defi_fixed_7_roue_plus_probable",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Sur cette roue, quelle couleur est la plus probable ?",
    format: "qcm",
    choices: ["Rouge", "Bleu", "Vert", "Jaune"],
    expected: ["Rouge"],
    comparator: "mcq_exact",
    hint: "Regarde quelle couleur occupe le plus de place.",
    explanation:
      "Rouge occupe plus de place que les autres couleurs sur la roue. Rouge est donc la couleur la plus probable.",
    tags: ["cm2", "probabilite", "defi", "roue", "plus_probable", "qcm", "canvas"],
    canvas: roueRougeFavoriCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_defi_fixed_8_roue_erreur_autant",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : “J’ai fait tourner la roue et j’ai eu Bleu, donc Bleu était le plus probable.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Un seul tour suffit-il à décider ce qui est le plus probable ?",
    explanation:
      "Non. Le résultat d’un tour ne dit rien sur les chances de départ : le moins probable sort parfois, c’est même pour ça qu’on parle de hasard. Ce qui décide, c’est la place occupée sur la roue — et Rouge en occupe le plus.",
    tags: ["cm2", "probabilite", "defi", "roue", "erreur", "qcm", "canvas"],
    canvas: roueRougeFavoriCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_defi_fixed_9_roue_simple_autant",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Sur cette roue simple, Rouge et Bleu ont-ils autant de chances de sortir ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Compare la taille des deux parts.",
    explanation:
      "Oui. Sur cette roue, les parts Rouge et Bleu ont la même taille. Les deux couleurs ont autant de chances.",
    tags: ["cm2", "probabilite", "defi", "roue", "autant", "qcm", "canvas"],
    canvas: roueSimpleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_defi_fixed_10_reunion_tombola",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "reunion",
    text: "À une tombola d’école à La Réunion, il y a 100 tickets dont 5 gagnants. Est-il certain de gagner avec un ticket ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il y a aussi beaucoup de tickets non gagnants.",
    explanation:
      "Non. Il y a 5 tickets gagnants sur 100, mais aussi 95 tickets non gagnants. Gagner est possible, mais ce n’est pas certain.",
    tags: ["cm2", "probabilite", "defi", "reunion", "tombola", "certain", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_defi_fixed_11_reunion_sac_bonbons",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Dans un sachet de bonbons, il y a 6 bonbons coco et 2 bonbons mangue. Quel goût a le plus de chances d’être tiré ?",
    format: "qcm",
    choices: ["coco", "mangue", "autant", "impossible"],
    expected: ["coco"],
    comparator: "mcq_exact",
    hint: "Compare 6 et 2.",
    explanation:
      "Il y a 6 bonbons coco et 2 bonbons mangue. Coco est donc le goût le plus probable.",
    tags: ["cm2", "probabilite", "defi", "reunion", "bonbons", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_defi_fixed_12_reunion_roue_kermesse",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "reunion",
    text: "À une kermesse, une roue contient une grande partie Rouge et de petites parties Bleu, Vert et Jaune. Quelle couleur a le plus de chances de sortir ?",
    format: "qcm",
    choices: ["Rouge", "Bleu", "Vert", "Jaune"],
    expected: ["Rouge"],
    comparator: "mcq_exact",
    hint: "La plus grande partie donne le plus de chances.",
    explanation:
      "La partie Rouge est la plus grande. Rouge a donc plus de chances de sortir.",
    tags: ["cm2", "probabilite", "defi", "reunion", "roue", "qcm", "canvas"],
    canvas: roueRougeFavoriCanvas(),
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_defi_fixed_13_erreur_preference",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : “Je préfère le vert, donc le vert a plus de chances de sortir.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Les chances ne dépendent pas de ce qu’on préfère.",
    explanation:
      "Non. Les chances dépendent des données : nombre de billes, faces du dé ou taille des parts. Elles ne dépendent pas de la préférence de l’élève.",
    tags: ["cm2", "probabilite", "defi", "erreur", "preference", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_probabilite_defi_fixed_14_erreur_possible_certain",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : “Comme tirer rouge est possible, c’est certain.” A-t-il raison ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Possible ne veut pas dire certain.",
    explanation:
      "Non. Possible signifie que cela peut arriver. Certain signifie que cela arrive toujours. Ce n’est pas la même chose.",
    tags: ["cm2", "probabilite", "defi", "erreur", "possible", "certain", "qcm"],
  },





  {
    kind: "template",
    id: "cm2_probabilite_defi_tpl_1_sac",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte les billes favorables.",
    tags: ["cm2", "probabilite", "defi", "billes", "template", "qcm", "canvas"],
    generate: genDefiPlusProbable,
  },

  {
    kind: "template",
    id: "cm2_probabilite_defi_tpl_2_de",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte les faces favorables.",
    tags: ["cm2", "probabilite", "defi", "de", "template", "qcm", "canvas"],
    generate: genDefiEvenements,
  },

  {
    kind: "template",
    id: "cm2_probabilite_defi_tpl_3_roue",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare les parts de la roue.",
    tags: ["cm2", "probabilite", "defi", "roue", "template", "qcm", "canvas"],
    generate: genDefiMoitie,
  },

  {
    kind: "template",
    id: "cm2_probabilite_defi_tpl_4_reunion",
    niveau: "cm2",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Compare les quantités données.",
    tags: ["cm2", "probabilite", "defi", "reunion", "template", "qcm"],
    generate: genDefiAjout,
  },

  // ============================================================
  // 15/10/2026 — LES GÉNÉRATEURS (situation × événement × tournure)
  // ============================================================
  gabCm2("cm2_probabilite_vocabulaire_tpl_3_urnes", "probabilite_vocabulaire", 1, "Regarde ce qu’il y a vraiment dedans.", ["vocabulaire", "urne"], genVocabUrne),
  gabCm2("cm2_probabilite_vocabulaire_tpl_4_nombres", "probabilite_vocabulaire", 1, "Cherche les résultats qui conviennent.", ["vocabulaire", "nombres"], genVocabNombres),
  gabCm2("cm2_probabilite_vocabulaire_tpl_5_lequel", "probabilite_vocabulaire", 3, "Classe chaque événement : certain, possible ou impossible.", ["vocabulaire", "lequel"], genVocabLequel),
  gabCm2("cm2_probabilite_vocabulaire_tpl_7_eleve", "probabilite_vocabulaire", 4, "Vérifie avec ce qu’il y a vraiment.", ["vocabulaire", "erreur"], genVocabEleve),
  gabCm2("cm2_probabilite_hasard_tpl_3_oui_non", "probabilite_hasard", 1, "Peut-on connaître le résultat avant ?", ["hasard"], genHasardOuiNon),
  gabCm2("cm2_probabilite_hasard_tpl_4_laquelle", "probabilite_hasard", 2, "Hasard : on ne peut pas prévoir le résultat.", ["hasard", "laquelle"], genHasardLaquelle),
  gabCm2("cm2_probabilite_hasard_tpl_5_combien", "probabilite_hasard", 3, "Compte les résultats différents, pas les objets.", ["hasard", "issues"], genHasardCombien),
  gabCm2("cm2_probabilite_hasard_tpl_6_triche", "probabilite_hasard", 4, "Le hasard n’a pas de mémoire, mais on peut tricher.", ["hasard", "erreur"], genHasardTriche),
  gabCm2("cm2_probabilite_roue_sac_tpl_4_compter", "probabilite_roue_de_sac", 1, "Compte bien chaque objet.", ["roue_de_sac", "compter"], genRoueCompter),
  gabCm2("cm2_probabilite_roue_sac_tpl_5_chances", "probabilite_roue_de_sac", 2, "Compte les cas favorables, puis le total.", ["roue_de_sac", "chances"], genRoueChances),
  gabCm2("cm2_probabilite_roue_sac_tpl_6_favorables", "probabilite_roue_de_sac", 2, "Liste les résultats qui conviennent.", ["roue_de_sac", "favorables"], genRoueFavorables),
  gabCm2("cm2_probabilite_roue_sac_tpl_7_inverse", "probabilite_roue_de_sac", 4, "Pars des chances pour retrouver le contenu.", ["roue_de_sac", "inverse"], genRoueInverse),
  gabCm2("cm2_probabilite_roue_sac_tpl_8_contraire", "probabilite_roue_de_sac", 4, "Ne pas obtenir : compte tous les autres.", ["roue_de_sac", "contraire"], genRoueContraire),
  gabCm2("cm2_probabilite_defi_tpl_5_deux_sacs", "probabilite_defi", 5, "Ramène les deux au même total.", ["defi", "comparer"], genDefiDeuxSacs),
  gabCm2("cm2_probabilite_defi_tpl_6_plus_probable", "probabilite_defi", 4, "Compare les nombres de chaque sorte.", ["defi", "plus_probable"], genDefiPlusProbable),
  gabCm2("cm2_probabilite_comparer_tpl_1_urne", "probabilite_comparer", 1, "Compare le nombre d’objets de chaque sorte.", ["comparer", "urne"], genComparerUrne),
  gabCm2("cm2_probabilite_comparer_tpl_2_evenements", "probabilite_comparer", 2, "Compte les résultats favorables de chaque côté.", ["comparer", "evenements"], genComparerEvenements),
  gabCm2("cm2_probabilite_comparer_tpl_3_deux_sacs", "probabilite_comparer", 3, "Même total ? même nombre de favorables ? Compare.", ["comparer", "deux_sacs"], genComparerDeuxSacs),
];
