// lib/tutor-v4/question-banks/maths/cm1/probabilites.bank.ts

import type {
  TutorBankItemV4,
  TutorGeneratedQuestionV4,
  CanvasProbabilitesData,
} from "@/lib/tutor-v4/types";

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(arr: readonly T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]): string[] {
  // ⚠️ 04/08/2026 — la bonne réponse était jetée dans le même chapeau que les
  // pièges : à cinq pièges écrits, le mélange pouvait la laisser au fond et
  // le découpage à quatre l'emportait. L'élève voyait alors quatre pièges et
  // rien d'autre. On la met de côté, on tire trois distracteurs, on mélange.
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function exp(
  definition: string,
  methode: string,
  observation: string,
  conclusion: string
) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nObservation : ${observation}\n\nConclusion : ${conclusion}`;
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
  rose: "#ec4899",
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

function roueAvecPoidsCanvas(args: {
  rouge: number;
  bleu: number;
  vert: number;
  jaune?: number;
}): CanvasProbabilitesData {
  return probabilitesCanvas({
    variant: "roue",
    roue: {
      segments: [
        { label: "Rouge", poids: args.rouge, couleur: COULEURS.rouge },
        { label: "Bleu", poids: args.bleu, couleur: COULEURS.bleu },
        { label: "Vert", poids: args.vert, couleur: COULEURS.vert },
        {
          label: "Jaune",
          poids: args.jaune ?? 1,
          couleur: COULEURS.jaune,
        },
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

function billesVariablesCanvas(args: {
  rouges: number;
  bleues: number;
  vertes: number;
  jaunes?: number;
}): CanvasProbabilitesData {
  const elements = [
    ...Array.from({ length: args.rouges }, () => ({
      couleur: COULEURS.rouge,
      label: "R",
    })),
    ...Array.from({ length: args.bleues }, () => ({
      couleur: COULEURS.bleu,
      label: "B",
    })),
    ...Array.from({ length: args.vertes }, () => ({
      couleur: COULEURS.vert,
      label: "V",
    })),
    ...Array.from({ length: args.jaunes ?? 0 }, () => ({
      couleur: COULEURS.jaune,
      label: "J",
    })),
  ];

  return probabilitesCanvas({
    variant: "billes",
    billes: {
      elements,
    },
  });
}

function tableauVocabulaireCanvas(): CanvasProbabilitesData {
  return probabilitesCanvas({
    variant: "tableau",
    tableau: {
      entetes: ["Situation", "Type"],
      lignes: [
        ["Obtenir 7 avec un dé", "impossible"],
        ["Obtenir un nombre de 1 à 6", "certain"],
        ["Obtenir un nombre pair", "possible"],
      ],
      casesSurlignees: [[1, 1]],
    },
  });
}

function couleurLabel(couleur: string) {
  if (couleur === "rouge") return "Rouge";
  if (couleur === "bleu") return "Bleu";
  if (couleur === "vert") return "Vert";
  if (couleur === "jaune") return "Jaune";
  return couleur;
}

// ============================================================
// ⛔ 15/10/2026 — « DES QUESTIONS REVIENNENT » : LES GÉNÉRATEURS
// Mesuré avant (scripts/mesurer-squelettes-coach.ts cm1 probabilite) :
// 11 à 14 squelettes par micro, 10 à 15 répétitions sur une série de 20.
// Les gabarits tiraient des NOMBRES dans une phrase fixe : l'élève
// reconnaissait la phrase.
// Même méthode que la 3e (dd5e9f75) : chaque gabarit croise
//   · une SITUATION : un objet (billes, bonbons, jetons, perles, crayons,
//     chaussettes, tickets…) dans un contenant (sac, bocal, trousse, tiroir,
//     chapeau…) avec des couleurs tirées ; un dé (petits chevaux, jeu de
//     l'oie…) ; une roue (kermesse, fête du letchi…) ; une pièce ; des
//     cartes numérotées ; une tombola ;
//   · une TOURNURE (trois ou quatre façons de poser la même question) ;
//   · des nombres tirés, et un prénom.
// Niveau CM1 : phrases courtes, certain / possible / impossible,
// « plus de chances », « 1 chance sur 4 ». Pas de fraction.
// ============================================================

type Q = TutorGeneratedQuestionV4;
type Niv = 1 | 2 | 3 | 4;
type Mot = "certain" | "possible" | "impossible";

function melange<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const maj = (s: string): string =>
  s.startsWith("« ") ? `« ${maj(s.slice(2))}` : s.charAt(0).toUpperCase() + s.slice(1);
/** « a », « a et b », « a, b et c ». */
const listeFr = (xs: string[]) =>
  xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} et ${xs[xs.length - 1]}`;
/** « a », « a ou b », « a, b ou c ». */
const listeOu = (xs: string[]) =>
  xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} ou ${xs[xs.length - 1]}`;
/** « 1 chance sur 6 », « 3 chances sur 8 ». */
const chanceSur = (a: number, t: number) => `${a} ${a > 1 ? "chances" : "chance"} sur ${t}`;

const PRENOMS_CM1 = [
  "Inès", "Hugo", "Léa", "Mamadou", "Chloé", "Yanis", "Aïcha", "Lucas", "Emma", "Noah",
  "Jade", "Rayan", "Zoé", "Kenji", "Sofia", "Maëlys", "Timothé", "Kylian", "Anaïs", "Nathan",
  "Lou", "Ilan", "Manon", "Enzo", "Soane", "Tiana", "Mathis", "Naïa",
] as const;
const prenom = (): string => randomChoice(PRENOMS_CM1);
function prenoms(k: number): string[] {
  return melange(PRENOMS_CM1).slice(0, k);
}
/** « de Léa », « d’Inès ». */
const deP = (n: string) => (/^[AEIOUÉÈÊÂÎH]/i.test(n) ? `d’${n}` : `de ${n}`);

// ---------- Couleurs (accordées) ----------
type Coul = { ms: string; fs: string; mp: string; fp: string; hex?: string; lettre?: string };
const COULS: Coul[] = [
  { ms: "rouge", fs: "rouge", mp: "rouges", fp: "rouges", hex: COULEURS.rouge, lettre: "R" },
  { ms: "bleu", fs: "bleue", mp: "bleus", fp: "bleues", hex: COULEURS.bleu, lettre: "B" },
  { ms: "vert", fs: "verte", mp: "verts", fp: "vertes", hex: COULEURS.vert, lettre: "V" },
  { ms: "jaune", fs: "jaune", mp: "jaunes", fp: "jaunes", hex: COULEURS.jaune, lettre: "J" },
  { ms: "violet", fs: "violette", mp: "violets", fp: "violettes", hex: COULEURS.violet, lettre: "Vi" },
  { ms: "orange", fs: "orange", mp: "orange", fp: "orange", hex: COULEURS.orange, lettre: "O" },
  { ms: "rose", fs: "rose", mp: "roses", fp: "roses", hex: COULEURS.rose, lettre: "Ro" },
];
/** Des couleurs qu'on n'utilise jamais dans un sac : pour l'impossible. */
const ABSENTES: Coul[] = [
  { ms: "noir", fs: "noire", mp: "noirs", fp: "noires" },
  { ms: "blanc", fs: "blanche", mp: "blancs", fp: "blanches" },
  { ms: "marron", fs: "marron", mp: "marron", fp: "marron" },
  { ms: "gris", fs: "grise", mp: "gris", fp: "grises" },
];
const adj = (c: Coul, f: boolean, pl: boolean) => (pl ? (f ? c.fp : c.mp) : f ? c.fs : c.ms);

// ---------- Objets et contenants ----------
type Cont = { un: string; le: string; nom: string; f: boolean };
const ct = (un: string, le: string, nom: string, f: boolean): Cont => ({ un, le, nom, f });
const SAC = ct("un sac", "le sac", "sac", false);
const BOITE = ct("une boîte", "la boîte", "boîte", true);
const BOCAL = ct("un bocal", "le bocal", "bocal", false);
const SACHET = ct("un sachet", "le sachet", "sachet", false);
const URNE = ct("une urne", "l’urne", "urne", true);
const PANIER = ct("un panier", "le panier", "panier", false);
const TROUSSE = ct("une trousse", "la trousse", "trousse", true);
const POT = ct("un pot", "le pot", "pot", false);
const TIROIR = ct("un tiroir", "le tiroir", "tiroir", false);
const CHAPEAU = ct("un chapeau", "le chapeau", "chapeau", false);
const BAC = ct("un bac", "le bac", "bac", false);
const FILET = ct("un filet", "le filet", "filet", false);

type Obj = { s: string; p: string; f: boolean; conts: Cont[] };
const OBJETS: Obj[] = [
  { s: "bille", p: "billes", f: true, conts: [SAC, BOITE, BOCAL] },
  { s: "bonbon", p: "bonbons", f: false, conts: [SACHET, BOCAL, BOITE] },
  { s: "jeton", p: "jetons", f: false, conts: [SAC, BOITE, URNE] },
  { s: "boule", p: "boules", f: true, conts: [URNE, SAC] },
  { s: "perle", p: "perles", f: true, conts: [BOITE, POT, SACHET] },
  { s: "balle", p: "balles", f: true, conts: [PANIER, SAC, BAC] },
  { s: "crayon", p: "crayons", f: false, conts: [TROUSSE, POT] },
  { s: "cube", p: "cubes", f: false, conts: [SAC, BOITE, BAC] },
  { s: "sucette", p: "sucettes", f: true, conts: [BOCAL, SACHET] },
  { s: "ballon", p: "ballons", f: false, conts: [FILET, BAC] },
  { s: "chaussette", p: "chaussettes", f: true, conts: [TIROIR] },
  { s: "ticket", p: "tickets", f: false, conts: [URNE, CHAPEAU] },
  { s: "gomme", p: "gommes", f: true, conts: [TROUSSE, BOITE] },
  { s: "craie", p: "craies", f: true, conts: [BOITE, POT] },
  { s: "pion", p: "pions", f: false, conts: [SAC, BOITE] },
  { s: "feutre", p: "feutres", f: false, conts: [TROUSSE, POT] },
];
/** « 3 billes rouges », « 1 bonbon vert ». */
const nb = (n: number, o: Obj, c: Coul) => `${n} ${n > 1 ? o.p : o.s} ${adj(c, o.f, n > 1)}`;
/** « une bille », « un bonbon vert ». */
const unO = (o: Obj, c?: Coul) => `${o.f ? "une" : "un"} ${o.s}${c ? ` ${adj(c, o.f, false)}` : ""}`;
/** « la bille tirée », « le bonbon tiré ». */
const leTire = (o: Obj) => `${o.f ? "la" : "le"} ${o.s} ${o.f ? "tirée" : "tiré"}`;
const tousLes = (o: Obj) => `${o.f ? "toutes" : "tous"} les ${o.p}`;
const aucun = (o: Obj, c: Coul) => `${o.f ? "aucune" : "aucun"} ${o.s} ${adj(c, o.f, false)}`;

type Urne = { o: Obj; cont: Cont; couls: Coul[]; n: number[] };
function urne(k: number, opts?: { min?: number; max?: number; distincts?: boolean; o?: Obj }): Urne {
  const o = opts?.o ?? randomChoice(OBJETS);
  const cont = randomChoice(o.conts);
  const couls = melange(COULS).slice(0, k);
  const min = opts?.min ?? 1;
  const max = opts?.max ?? 5;
  let n: number[];
  do {
    n = couls.map(() => randomInt(min, max));
  } while (opts?.distincts && new Set(n).size < n.length);
  return { o, cont, couls, n };
}
const totalU = (u: { n: number[] }) => u.n.reduce((a, b) => a + b, 0);
const compo = (u: Urne) => listeFr(u.couls.map((c, i) => nb(u.n[i], u.o, c)));
function introUrne(u: Urne, P: string): string {
  const c = compo(u);
  return randomChoice([
    `Dans ${u.cont.un}, il y a ${c}.`,
    `${maj(u.cont.un)} contient ${c}.`,
    `${P} a ${u.cont.un}. Dedans, il y a ${c}.`,
    `${P} met ${c} dans ${u.cont.un}.`,
  ]);
}
function tirage(u: Urne, P: string): string {
  return randomChoice([
    `${P} tire ${unO(u.o)} sans regarder.`,
    `${P} prend ${unO(u.o)} au hasard.`,
    `${P} pioche ${unO(u.o)} les yeux fermés.`,
  ]);
}
function canvasUrne(u: { couls: Coul[]; n: number[] }): CanvasProbabilitesData | undefined {
  if (totalU(u) > 15 || u.couls.some((c) => !c.hex)) return undefined;
  return probabilitesCanvas({
    variant: "billes",
    billes: {
      elements: u.couls.flatMap((c, i) =>
        Array.from({ length: u.n[i] }, () => ({ couleur: c.hex as string, label: c.lettre })),
      ),
    },
  });
}

// ---------- Roues ----------
const NOMS_ROUES = [
  "la roue de la kermesse",
  "la roue de la fête de l’école",
  "la roue du jeu de société",
  "la roue de la loterie",
  "la roue du marché de Noël",
  "la roue de la fête du letchi",
  "la roue du stand de Saint-Gilles",
];
type Roue = { nom: string; couls: Coul[]; n: number[] };
function roue(k: number, opts?: { min?: number; max?: number; distincts?: boolean }): Roue {
  const couls = melange(COULS).slice(0, k);
  const min = opts?.min ?? 1;
  const max = opts?.max ?? 3;
  let n: number[];
  do {
    n = couls.map(() => randomInt(min, max));
  } while (opts?.distincts && new Set(n).size < n.length);
  return { nom: randomChoice(NOMS_ROUES), couls, n };
}
const nbParts = (n: number, c: Coul) => `${n} ${n > 1 ? "parts" : "part"} ${adj(c, true, n > 1)}`;
const partsTxt = (r: Roue) => listeFr(r.couls.map((c, i) => nbParts(r.n[i], c)));
function introRoue(r: Roue, P: string): string {
  const t = totalU(r);
  return randomChoice([
    `${maj(r.nom)} a ${t} parts égales : ${partsTxt(r)}. ${P} la fait tourner.`,
    `${P} fait tourner ${r.nom}. Elle a ${t} parts de même taille : ${partsTxt(r)}.`,
    `Sur ${r.nom}, il y a ${partsTxt(r)}. Toutes les parts ont la même taille. ${P} lance la roue.`,
  ]);
}
function canvasRoue(r: Roue): CanvasProbabilitesData {
  return probabilitesCanvas({
    variant: "roue",
    roue: { segments: r.couls.map((c, i) => ({ label: maj(c.fs), poids: r.n[i], couleur: c.hex })) },
  });
}

// ---------- Dés, pièces, cartes ----------
const DES = [
  "un dé classique",
  "le dé des petits chevaux",
  "le dé du jeu de l’oie",
  "un dé à six faces",
  "le dé du jeu de l’échelle",
  "le dé du jeu de société",
];
const PIECES = ["une pièce de 1 euro", "une pièce de 2 euros", "une pièce de 50 centimes", "une pièce de 20 centimes"];
const FACES: DeFace[] = [1, 2, 3, 4, 5, 6];
const facesTxt = (fs: number[]) => listeFr(fs.map(String));

type EvDe = { txt: string; faces: DeFace[] };
/** Un événement sur un dé, avec au moins une face favorable et pas toutes. */
function evDe(): EvDe {
  const t = randomInt(0, 5);
  if (t === 0) {
    const k = randomChoice(FACES);
    return { txt: `le ${k}`, faces: [k] };
  }
  if (t === 1)
    return randomChoice([
      { txt: "un nombre pair", faces: [2, 4, 6] as DeFace[] },
      { txt: "un nombre impair", faces: [1, 3, 5] as DeFace[] },
    ]);
  if (t === 2) {
    const k = randomInt(2, 6);
    return { txt: `un nombre plus petit que ${k}`, faces: FACES.filter((f) => f < k) };
  }
  if (t === 3) {
    const k = randomInt(1, 5);
    return { txt: `un nombre plus grand que ${k}`, faces: FACES.filter((f) => f > k) };
  }
  if (t === 4) {
    const fs = melange(FACES).slice(0, 2).sort((x, y) => x - y);
    return { txt: `un ${fs[0]} ou un ${fs[1]}`, faces: fs };
  }
  const fs = melange(FACES).slice(0, 3).sort((x, y) => x - y);
  return { txt: `un ${fs[0]}, un ${fs[1]} ou un ${fs[2]}`, faces: fs };
}

type EvCartes = { txt: string; cartes: number[] };
function evCartes(n: number): EvCartes {
  const toutes = Array.from({ length: n }, (_, i) => i + 1);
  const t = randomInt(0, 3);
  if (t === 0) return { txt: "un nombre pair", cartes: toutes.filter((x) => x % 2 === 0) };
  if (t === 1) return { txt: "un nombre impair", cartes: toutes.filter((x) => x % 2 === 1) };
  if (t === 2) {
    const k = randomInt(2, n - 1);
    return { txt: `un nombre plus grand que ${k}`, cartes: toutes.filter((x) => x > k) };
  }
  const k = randomInt(2, n - 1);
  return { txt: `un nombre plus petit que ${k}`, cartes: toutes.filter((x) => x < k) };
}

// ============================================================
// PROBABILITE_VOCABULAIRE — certain / possible / impossible
// ============================================================

type CasMot = { sit: string; evt: string; rep: Mot; pourquoi: string; canvas?: CanvasProbabilitesData };
const MOTS: Mot[] = ["certain", "possible", "impossible"];

function casUrneMot(niv: Niv): CasMot {
  const P = prenom();
  const rep = randomChoice(MOTS);
  if (rep === "certain") {
    if (niv >= 2 && Math.random() < 0.5) {
      const u = urne(2);
      const [c1, c2] = u.couls;
      return {
        sit: `${introUrne(u, P)} ${tirage(u, P)}`,
        evt: `tirer ${unO(u.o, c1)} ou ${adj(c2, u.o.f, false)}`,
        rep,
        pourquoi: `${maj(tousLes(u.o))} sont ${adj(c1, u.o.f, true)} ou ${adj(c2, u.o.f, true)} : ${leTire(u.o)} sera forcément de l’une de ces deux couleurs.`,
        canvas: canvasUrne(u),
      };
    }
    const u = urne(1, { min: 2, max: 7 });
    const c = u.couls[0];
    return {
      sit: `${introUrne(u, P)} ${tirage(u, P)}`,
      evt: `tirer ${unO(u.o, c)}`,
      rep,
      pourquoi: `${maj(tousLes(u.o))} sont ${adj(c, u.o.f, true)} : on tire forcément ${unO(u.o, c)}.`,
      canvas: canvasUrne(u),
    };
  }
  if (rep === "possible") {
    const u = urne(randomInt(2, 3));
    const i = randomInt(0, u.couls.length - 1);
    return {
      sit: `${introUrne(u, P)} ${tirage(u, P)}`,
      evt: `tirer ${unO(u.o, u.couls[i])}`,
      rep,
      pourquoi: `Il y a ${nb(u.n[i], u.o, u.couls[i])}, mais il y a aussi d’autres couleurs : ce n’est pas sûr.`,
      canvas: canvasUrne(u),
    };
  }
  const u = urne(randomInt(1, 3));
  const c = randomChoice([...ABSENTES, ...COULS.filter((x) => !u.couls.includes(x))]);
  return {
    sit: `${introUrne(u, P)} ${tirage(u, P)}`,
    evt: `tirer ${unO(u.o, c)}`,
    rep,
    pourquoi: `Il n’y a ${aucun(u.o, c)} dans ${u.cont.le} : cela ne peut pas arriver.`,
    canvas: canvasUrne(u),
  };
}

function casDeMot(niv: Niv): CasMot {
  const P = prenom();
  const D = randomChoice(DES);
  const sit = `${P} lance ${D}.`;
  const rep = randomChoice(MOTS);
  type C = { evt: string; pourquoi: string; faces: DeFace[] };
  const cands: C[] = [];
  if (rep === "possible") {
    const k = randomChoice(FACES);
    cands.push({ evt: `obtenir ${k}`, pourquoi: `La face ${k} existe, mais les autres faces peuvent sortir aussi.`, faces: [k] });
    if (niv >= 2) {
      const e = evDe();
      cands.push({
        evt: `obtenir ${e.txt}`,
        pourquoi: `Les faces qui conviennent sont ${facesTxt(e.faces)}. Les autres faces peuvent aussi sortir.`,
        faces: e.faces,
      });
    }
  } else if (rep === "impossible") {
    const k = randomInt(7, 12);
    cands.push({ evt: `obtenir ${k}`, pourquoi: `Le dé n’a pas de face ${k} : ses faces vont de 1 à 6.`, faces: [] });
    cands.push({ evt: "obtenir 0", pourquoi: "Le dé n’a pas de face 0 : ses faces vont de 1 à 6.", faces: [] });
    if (niv >= 2) {
      const g = randomInt(6, 9);
      cands.push({ evt: `obtenir un nombre plus grand que ${g}`, pourquoi: `La plus grande face est 6 : aucune face n’est plus grande que ${g}.`, faces: [] });
      cands.push({ evt: "obtenir un nombre plus petit que 1", pourquoi: "La plus petite face est 1 : aucune face n’est plus petite que 1.", faces: [] });
    }
  } else {
    cands.push({ evt: "obtenir un nombre de 1 à 6", pourquoi: "Toutes les faces du dé vont de 1 à 6.", faces: FACES });
    if (niv >= 2) {
      const p = randomInt(7, 10);
      cands.push({ evt: `obtenir un nombre plus petit que ${p}`, pourquoi: `La plus grande face est 6, et 6 est plus petit que ${p} : toutes les faces conviennent.`, faces: FACES });
      cands.push({ evt: "obtenir un nombre pair ou impair", pourquoi: "Chaque face est paire (2, 4, 6) ou impaire (1, 3, 5).", faces: FACES });
      cands.push({ evt: "obtenir un nombre plus grand que 0", pourquoi: "La plus petite face est 1, plus grande que 0 : toutes les faces conviennent.", faces: FACES });
    }
  }
  const c = randomChoice(cands);
  return { sit, evt: c.evt, rep, pourquoi: c.pourquoi, canvas: deCanvas(c.faces) };
}

function casRoueMot(niv: Niv): CasMot {
  const P = prenom();
  const rep = randomChoice(MOTS);
  if (rep === "certain") {
    if (niv >= 2 && Math.random() < 0.5) {
      const r = roue(2);
      const [c1, c2] = r.couls;
      return {
        sit: introRoue(r, P),
        evt: `tomber sur une part ${c1.fs} ou ${c2.fs}`,
        rep,
        pourquoi: `Toutes les parts sont ${c1.fp} ou ${c2.fp} : la roue s’arrête forcément sur l’une d’elles.`,
        canvas: canvasRoue(r),
      };
    }
    const r = roue(1, { min: 4, max: 8 });
    const c = r.couls[0];
    return {
      sit: introRoue(r, P),
      evt: `tomber sur une part ${c.fs}`,
      rep,
      pourquoi: `Toutes les parts sont ${c.fp} : la roue tombe forcément sur une part ${c.fs}.`,
      canvas: canvasRoue(r),
    };
  }
  if (rep === "possible") {
    const r = roue(randomInt(2, 4));
    const i = randomInt(0, r.couls.length - 1);
    return {
      sit: introRoue(r, P),
      evt: `tomber sur une part ${r.couls[i].fs}`,
      rep,
      pourquoi: `Il y a ${nbParts(r.n[i], r.couls[i])}, mais aussi des parts d’autres couleurs : ce n’est pas sûr.`,
      canvas: canvasRoue(r),
    };
  }
  const r = roue(randomInt(2, 4));
  const c = randomChoice([...ABSENTES, ...COULS.filter((x) => !r.couls.includes(x))]);
  return {
    sit: introRoue(r, P),
    evt: `tomber sur une part ${c.fs}`,
    rep,
    pourquoi: `La roue n’a aucune part ${c.fs} : cela ne peut pas arriver.`,
    canvas: canvasRoue(r),
  };
}

function casPieceMot(): CasMot {
  const P = prenom();
  const piece = randomChoice(PIECES);
  const sit = randomChoice([`${P} lance ${piece}.`, `${P} joue à pile ou face avec ${piece}.`]);
  const rep = randomChoice(MOTS);
  if (rep === "possible") {
    const cote = randomChoice(["pile", "face"]);
    return { sit, evt: `tomber sur ${cote}`, rep, pourquoi: `La pièce peut tomber sur ${cote}, mais aussi sur l’autre côté.` };
  }
  if (rep === "certain")
    return { sit, evt: "tomber sur pile ou sur face", rep, pourquoi: "Une pièce n’a que deux côtés : pile et face. Elle tombe forcément sur l’un des deux." };
  const k = randomInt(1, 9);
  return { sit, evt: `obtenir le nombre ${k}`, rep, pourquoi: `Une pièce donne pile ou face, jamais le nombre ${k}.` };
}

function casCartesMot(): CasMot {
  const P = prenom();
  const n = randomInt(5, 10);
  const sit = randomChoice([
    `${P} mélange ${n} cartes numérotées de 1 à ${n} et en tire une sans regarder.`,
    `Sur la table, il y a ${n} cartes retournées, numérotées de 1 à ${n}. ${P} en retourne une.`,
  ]);
  const rep = randomChoice(MOTS);
  if (rep === "possible") {
    const k = randomInt(1, n);
    return { sit, evt: `tirer la carte ${k}`, rep, pourquoi: `La carte ${k} existe, mais il y a ${n} cartes : ce n’est pas sûr.` };
  }
  if (rep === "impossible") {
    const k = randomInt(n + 1, n + 6);
    return { sit, evt: `tirer la carte ${k}`, rep, pourquoi: `Les cartes vont de 1 à ${n} : il n’y a pas de carte ${k}.` };
  }
  return { sit, evt: `tirer une carte numérotée de 1 à ${n}`, rep, pourquoi: `Toutes les cartes sont numérotées de 1 à ${n}.` };
}

function questionMot(c: CasMot): Q {
  const text = randomChoice([
    `${c.sit} ${maj(c.evt)}, c’est…`,
    `${c.sit} « ${maj(c.evt)} » : est-ce certain, possible ou impossible ?`,
    `${c.sit} Quel mot convient pour « ${c.evt} » ?`,
    `${c.sit} Complète : ${c.evt} est un événement…`,
  ]);
  const def = {
    certain: "Certain : cela arrive à coup sûr.",
    possible: "Possible : cela peut arriver, mais ce n’est pas sûr.",
    impossible: "Impossible : cela ne peut jamais arriver.",
  }[c.rep];
  return {
    text,
    format: "qcm",
    choices: melange(MOTS),
    expected: [c.rep],
    comparator: "mcq_exact",
    explanation: exp(def, "On regarde tout ce qui peut sortir.", c.pourquoi, `${maj(c.evt)} est ${c.rep}.`),
    canvas: c.canvas,
  };
}

function genVocabulaire(niv: Niv): Q {
  const fams: Array<() => CasMot> =
    niv === 1
      ? [() => casUrneMot(1), () => casDeMot(1), () => casRoueMot(1), casPieceMot]
      : [() => casUrneMot(2), () => casDeMot(2), () => casRoueMot(2), casPieceMot, casCartesMot];
  return questionMot(randomChoice(fams)());
}

// ============================================================
// PROBABILITE_HASARD — reconnaître une situation de hasard
// ============================================================

type Action = { txt: string; pourquoi: string };
function actionHasard(): Action {
  const f = randomInt(0, 11);
  if (f === 0) return { txt: `lance ${randomChoice(DES)}`, pourquoi: "On ne sait pas quelle face va sortir." };
  if (f === 1) {
    const o = randomChoice(OBJETS);
    return { txt: `tire ${unO(o)} dans ${randomChoice(o.conts).un} sans regarder`, pourquoi: `On ne sait pas quel${o.f ? "le" : ""} ${o.s} va sortir.` };
  }
  if (f === 2) return { txt: `fait tourner ${randomChoice(NOMS_ROUES)}`, pourquoi: "On ne sait pas où la roue va s’arrêter." };
  if (f === 3) return { txt: `lance ${randomChoice(PIECES)}`, pourquoi: "La pièce peut tomber sur pile ou sur face." };
  if (f === 4) return { txt: "tire une carte dans un paquet bien mélangé", pourquoi: "N’importe quelle carte peut sortir." };
  if (f === 5) return { txt: `tire un ticket de tombola dans ${randomChoice(["un chapeau", "une urne", "un panier"])}`, pourquoi: "On ne sait pas quel ticket va sortir." };
  if (f === 6) return { txt: "pioche un domino retourné", pourquoi: "Les dominos sont cachés : on ne sait pas lequel on prend." };
  if (f === 7) return { txt: `tire au sort ${randomChoice(["le chef d’équipe", "le gardien de but", "l’élève qui commence", "le gagnant du jeu"])}`, pourquoi: "Le nom sort au hasard." };
  if (f === 8) return { txt: `pioche une lettre au Scrabble sans regarder`, pourquoi: "On ne sait pas quelle lettre on va piocher." };
  if (f === 9) return { txt: `lance les deux dés ${randomChoice(["du Monopoly", "du jeu de société", "des petits chevaux"])}`, pourquoi: "On ne sait pas quelles faces vont sortir." };
  if (f === 10) {
    const o = randomChoice(OBJETS);
    return { txt: `prend ${unO(o)} au hasard dans ${randomChoice(o.conts).un}`, pourquoi: `On ne sait pas de quelle couleur sera ${leTire(o)}.` };
  }
  return { txt: "fait tourner une toupie à six côtés numérotés", pourquoi: "On ne sait pas sur quel côté la toupie va s’arrêter." };
}
function actionPasHasard(): Action {
  const f = randomInt(0, 11);
  if (f === 0) {
    const a = randomInt(10, 60);
    const b = randomInt(2, 30);
    return { txt: `calcule ${a} + ${b}`, pourquoi: `${a} + ${b} fait toujours ${a + b}.` };
  }
  if (f === 1) {
    const a = randomInt(2, 9);
    const b = randomInt(2, 9);
    return { txt: `calcule ${a} × ${b}`, pourquoi: `${a} × ${b} fait toujours ${a * b}.` };
  }
  if (f === 2) {
    const o = randomChoice(OBJETS);
    return { txt: `compte les ${o.p} de son ${randomChoice(["étagère", "bureau", "cartable", "coffre"]) === "étagère" ? "étagère" : "cartable"}`, pourquoi: "Il suffit de compter : le nombre ne change pas." };
  }
  if (f === 3) {
    const o = randomChoice(OBJETS);
    const c = randomChoice(COULS);
    return { txt: `regarde dans ${randomChoice(o.conts).un} et choisit ${unO(o, c)}`, pourquoi: `On regarde et on choisit : on sait déjà que ce sera ${unO(o, c)}.` };
  }
  if (f === 4) {
    const k = randomInt(1, 6);
    return { txt: `pose le dé sur la face ${k}, sans le lancer`, pourquoi: `On choisit la face : on sait que ce sera ${k}.` };
  }
  if (f === 5) return { txt: "lit l’heure sur l’horloge de la classe", pourquoi: "L’heure se lit : il n’y a pas de hasard." };
  if (f === 6) return { txt: "écrit son prénom sur son cahier", pourquoi: "On sait déjà ce qui sera écrit." };
  if (f === 7) {
    const n = randomInt(15, 30);
    return { txt: `mesure sa règle de ${n} cm`, pourquoi: `La règle mesure toujours ${n} cm.` };
  }
  if (f === 8) {
    const a = randomInt(10, 99);
    let b = randomInt(10, 99);
    while (b === a) b = randomInt(10, 99);
    return { txt: `cherche le plus grand nombre entre ${a} et ${b}`, pourquoi: `On compare : c’est toujours ${Math.max(a, b)}.` };
  }
  if (f === 9) {
    const n = randomInt(10, 120);
    return { txt: `ouvre son livre à la page ${n}`, pourquoi: `On choisit la page : ce sera la page ${n}.` };
  }
  if (f === 10) {
    const c = randomChoice(COULS);
    return { txt: `arrête ${randomChoice(NOMS_ROUES)} avec la main sur une part ${c.fs}`, pourquoi: `On arrête la roue où on veut : on sait que ce sera ${c.fs}.` };
  }
  return { txt: "regarde la date sur le calendrier", pourquoi: "La date se lit : il n’y a pas de hasard." };
}

const DEF_HASARD = "Une situation de hasard : on ne connaît pas le résultat à l’avance.";

function genHasard(niv: Niv): Q {
  const t = randomInt(0, niv === 1 ? 3 : 6);
  const P = prenom();
  if (t <= 3) {
    const h = Math.random() < 0.5;
    const a = h ? actionHasard() : actionPasHasard();
    const sit = `${P} ${a.txt}.`;
    const concl = h ? "C’est une situation de hasard." : "Ce n’est pas une situation de hasard.";
    const base = { format: "qcm" as const, comparator: "mcq_exact" as const, explanation: exp(DEF_HASARD, "On se demande si on connaît le résultat à l’avance.", a.pourquoi, concl) };
    if (t === 0) return { ...base, text: `${sit} Est-ce une situation de hasard ?`, choices: ["oui", "non"], expected: [h ? "oui" : "non"] };
    if (t === 1) return { ...base, text: `${sit} Peut-on connaître le résultat à l’avance ?`, choices: ["oui", "non"], expected: [h ? "non" : "oui"] };
    if (t === 2) return { ...base, text: `${sit} Le résultat dépend-il du hasard ?`, choices: ["oui", "non"], expected: [h ? "oui" : "non"] };
    return { ...base, text: `Hasard ou pas ? ${sit}`, choices: ["c’est du hasard", "ce n’est pas du hasard"], expected: [h ? "c’est du hasard" : "ce n’est pas du hasard"] };
  }
  if (t === 4 || t === 5) {
    // Laquelle EST / N'EST PAS une situation de hasard ?
    const est = t === 4;
    const [p1, p2, p3, p4] = prenoms(4);
    const bonne = est ? actionHasard() : actionPasHasard();
    const autres: Action[] = [];
    while (autres.length < 3) {
      const a = est ? actionPasHasard() : actionHasard();
      if (!autres.some((x) => x.txt === a.txt)) autres.push(a);
    }
    const correct = `${p1} ${bonne.txt}`;
    return {
      text: est ? "Laquelle de ces situations est une situation de hasard ?" : "Laquelle de ces situations n’est PAS une situation de hasard ?",
      format: "qcm",
      choices: melange([correct, `${p2} ${autres[0].txt}`, `${p3} ${autres[1].txt}`, `${p4} ${autres[2].txt}`]),
      expected: [correct],
      comparator: "mcq_exact",
      explanation: exp(
        DEF_HASARD,
        "Pour chaque situation, on se demande si on connaît le résultat à l’avance.",
        `${correct} : ${bonne.pourquoi.charAt(0).toLowerCase()}${bonne.pourquoi.slice(1)}`,
        est ? `${correct} : c’est la situation de hasard.` : `${correct} : ce n’est pas du hasard. Les trois autres sont des situations de hasard.`,
      ),
    };
  }
  // Pourquoi est-ce une situation de hasard ?
  const a = actionHasard();
  const correct = "on ne sait pas à l’avance quel sera le résultat";
  return {
    text: `${P} ${a.txt}. Pourquoi est-ce une situation de hasard ?`,
    format: "qcm",
    choices: makeChoices(correct, [
      "le résultat est toujours le même",
      `${P} choisit le résultat`,
      "il n’y a qu’un seul résultat possible",
      "on peut calculer le résultat",
    ]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(DEF_HASARD, "On cherche si plusieurs résultats peuvent arriver.", a.pourquoi, `C’est du hasard : ${correct}.`),
  };
}

// ============================================================
// PROBABILITE_COMPARER — « plus de chances », « moins de chances »
// ============================================================

const AUTANT_COUL = "toutes les couleurs ont autant de chances";

function cmpCouleurs(niv: Niv, support: "urne" | "roue"): Q {
  const P = prenom();
  const k = niv === 2 ? randomInt(2, 3) : 3;
  const egal = Math.random() < 0.15;
  const plus = Math.random() < 0.6;
  let couls: Coul[], n: number[], intro: string, canvas: CanvasProbabilitesData | undefined, f: boolean, detail: string, def: string;
  if (support === "urne") {
    const u = urne(k, { distincts: !egal, min: egal ? 2 : 1, max: egal ? 4 : 6 });
    if (egal) u.n = u.n.map(() => u.n[0]);
    couls = u.couls; n = u.n; f = u.o.f;
    intro = `${introUrne(u, P)} ${tirage(u, P)}`;
    canvas = canvasUrne(u);
    detail = `On compte : ${compo(u)}.`;
    def = `Plus il y a de ${u.o.p} d’une couleur, plus cette couleur a de chances de sortir.`;
  } else {
    const r = roue(k, { distincts: !egal, min: 1, max: egal ? 3 : 4 });
    if (egal) r.n = r.n.map(() => r.n[0]);
    couls = r.couls; n = r.n; f = true;
    intro = introRoue(r, P);
    canvas = canvasRoue(r);
    detail = `On compte les parts : ${partsTxt(r)}.`;
    def = "Plus une couleur a de parts sur la roue, plus elle a de chances de sortir.";
  }
  const question = plus
    ? randomChoice([
        "Quelle couleur a le plus de chances de sortir ?",
        "Quelle couleur a le plus de chances d’être tirée ?",
        "Sur quelle couleur vaut-il mieux parier ?",
      ])
    : randomChoice(["Quelle couleur a le moins de chances de sortir ?", "Quelle couleur sortira le moins souvent ?"]);
  const noms = couls.map((c) => adj(c, f, false));
  const ext = plus ? Math.max(...n) : Math.min(...n);
  const correct = egal ? AUTANT_COUL : noms[n.indexOf(ext)];
  const wrongs = egal ? noms : [...noms.filter((x) => x !== correct), AUTANT_COUL];
  return {
    text: `${intro} ${support === "roue" ? question.replace("d’être tirée", "de sortir") : question}`,
    format: "qcm",
    choices: makeChoices(correct, wrongs),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      def,
      "On compte pour chaque couleur, puis on compare les nombres.",
      detail,
      egal
        ? `Chaque couleur en a ${n[0]} : ${AUTANT_COUL}.`
        : `${maj(correct)} : ${ext} est le ${plus ? "plus grand" : "plus petit"} nombre. C’est la couleur qui a le ${plus ? "plus" : "moins"} de chances.`,
    ),
    canvas,
  };
}

function cmpOuiNon(): Q {
  const P = prenom();
  const u = urne(randomInt(2, 3), { min: 1, max: 6 });
  const [i, j] = melange(u.couls.map((_, x) => x)).slice(0, 2);
  const a = u.n[i];
  const b = u.n[j];
  const OUI = "oui";
  const MOINS = "non, moins de chances";
  const AUT = "non, autant de chances";
  const correct = a > b ? OUI : a < b ? MOINS : AUT;
  const e1 = unO(u.o, u.couls[i]);
  const e2 = unO(u.o, u.couls[j]);
  return {
    text: `${introUrne(u, P)} ${tirage(u, P)} A-t-on plus de chances de tirer ${e1} qu’${e2} ?`,
    format: "qcm",
    choices: melange([OUI, MOINS, AUT]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "La couleur qui a le plus d’objets a le plus de chances.",
      "On compare les deux nombres.",
      `Il y a ${nb(a, u.o, u.couls[i])} et ${nb(b, u.o, u.couls[j])}.`,
      a > b ? `${a} est plus grand que ${b} : oui, plus de chances.` : a < b ? `${a} est plus petit que ${b} : non, moins de chances.` : `${a} = ${b} : autant de chances.`,
    ),
    canvas: canvasUrne(u),
  };
}

function cmpDe(): Q {
  const P = prenom();
  const D = randomChoice(DES);
  const e1 = evDe();
  let e2 = evDe();
  while (e2.txt === e1.txt) e2 = evDe();
  const AUT = "les deux ont autant de chances";
  const o1 = `obtenir ${e1.txt}`;
  const o2 = `obtenir ${e2.txt}`;
  const a = e1.faces.length;
  const b = e2.faces.length;
  const correct = a > b ? maj(o1) : a < b ? maj(o2) : AUT;
  return {
    text: randomChoice([
      `${P} lance ${D}. Qu’est-ce qui a le plus de chances : ${o1} ou ${o2} ?`,
      `${P} lance ${D}. Quel est le plus facile : ${o1} ou ${o2} ?`,
    ]),
    format: "qcm",
    choices: melange([maj(o1), maj(o2), AUT]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Plus il y a de faces qui conviennent, plus on a de chances.",
      "On compte les faces qui conviennent pour chaque événement.",
      `${maj(o1)} : ${a} ${a > 1 ? "faces" : "face"} (${facesTxt(e1.faces)}). ${maj(o2)} : ${b} ${b > 1 ? "faces" : "face"} (${facesTxt(e2.faces)}).`,
      a === b ? `${a} = ${b} : ${AUT}.` : `${correct} : ${Math.max(a, b)} faces contre ${Math.min(a, b)}.`,
    ),
    canvas: deCanvas(),
  };
}

function cmpJoueurs(): Q {
  const [P1, P2] = prenoms(2);
  const u = urne(randomInt(2, 3), { min: 1, max: 6 });
  const [i, j] = melange(u.couls.map((_, x) => x)).slice(0, 2);
  const a = u.n[i];
  const b = u.n[j];
  const AUT = "autant de chances pour les deux";
  const correct = a > b ? P1 : a < b ? P2 : AUT;
  return {
    text: `${introUrne(u, prenom())} On tire ${unO(u.o)} au hasard. ${P1} gagne si ${leTire(u.o)} est ${adj(u.couls[i], u.o.f, false)}. ${P2} gagne ${u.o.f ? "si elle" : "s’il"} est ${adj(u.couls[j], u.o.f, false)}. Qui a le plus de chances de gagner ?`,
    format: "qcm",
    choices: melange([P1, P2, AUT]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Celui qui gagne avec la couleur la plus nombreuse a le plus de chances.",
      "On compte les objets de chaque couleur.",
      `${P1} gagne avec ${nb(a, u.o, u.couls[i])}, ${P2} avec ${nb(b, u.o, u.couls[j])}.`,
      a === b ? `${a} = ${b} : ${AUT}.` : `${correct} a le plus de chances.`,
    ),
    canvas: canvasUrne(u),
  };
}

function cmpDeuxSacs(): Q {
  const [P1, P2] = prenoms(2);
  const o = randomChoice(OBJETS);
  const cont = randomChoice(o.conts);
  const [c1, c2] = melange(COULS).slice(0, 2);
  const t = randomInt(4, 10);
  const a = randomInt(1, t - 1);
  const b = randomInt(1, t - 1);
  const s1 = `${cont.le} ${deP(P1)}`;
  const s2 = `${cont.le} ${deP(P2)}`;
  const AUT = "c’est pareil";
  const correct = a > b ? s1 : a < b ? s2 : AUT;
  return {
    text: `${maj(s1)} contient ${nb(a, o, c1)} et ${nb(t - a, o, c2)}. ${maj(s2)} contient ${nb(b, o, c1)} et ${nb(t - b, o, c2)}. Pour tirer ${unO(o, c1)}, quel${cont.f ? "le" : ""} ${cont.nom} vaut-il mieux choisir ?`,
    format: "qcm",
    choices: melange([s1, s2, AUT]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      `Quand il y a autant d’objets en tout, on a plus de chances là où il y a plus d’objets de la bonne couleur.`,
      `On vérifie que les deux ont le même nombre de ${o.p}, puis on compare.`,
      `Les deux ont ${t} ${o.p} en tout. ${maj(s1)} : ${nb(a, o, c1)}. ${maj(s2)} : ${nb(b, o, c1)}.`,
      a === b ? `${a} = ${b} : c’est pareil.` : `Il vaut mieux choisir ${correct}.`,
    ),
  };
}

const TOMBOLAS = [
  "la tombola de l’école",
  "la tombola de la kermesse",
  "la loterie de la fête du quartier",
  "la tombola du club de foot",
  "le tirage au sort de la fête du letchi",
  "la tombola du marché de Saint-Paul",
];
function cmpTombola(plusOuMoins: boolean = Math.random() < 0.6): Q {
  const k = randomInt(2, 3);
  const ps = prenoms(k);
  let n: number[];
  do {
    n = ps.map(() => randomInt(1, 9));
  } while (new Set(n).size < n.length);
  const ext = plusOuMoins ? Math.max(...n) : Math.min(...n);
  const correct = ps[n.indexOf(ext)];
  const txt = listeFr(ps.map((p, i) => `${p} a ${n[i]} ${n[i] > 1 ? "tickets" : "ticket"}`));
  return {
    text: `À ${randomChoice(TOMBOLAS)}, ${txt}. Un seul ticket gagne. Qui a le ${plusOuMoins ? "plus" : "moins"} de chances de gagner ?`,
    format: "qcm",
    choices: makeChoices(correct, [...ps, "ils ont tous autant de chances"]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      "Plus on a de tickets, plus on a de chances de gagner.",
      "On compare les nombres de tickets.",
      `${txt}.`,
      `${correct} a ${ext} ${ext > 1 ? "tickets" : "ticket"} : c’est le ${plusOuMoins ? "plus grand" : "plus petit"} nombre. ${correct} a le ${plusOuMoins ? "plus" : "moins"} de chances.`,
    ),
  };
}

function genComparer(niv: Niv): Q {
  if (niv <= 2)
    return randomChoice([() => cmpCouleurs(2, "urne"), () => cmpCouleurs(2, "roue"), cmpOuiNon, () => cmpTombola()])();
  return randomChoice([() => cmpCouleurs(3, "urne"), () => cmpCouleurs(3, "roue"), cmpDe, cmpJoueurs, cmpDeuxSacs])();
}

// ============================================================
// PROBABILITE_ROUE_DE_SAC — compter, « 1 chance sur 4 »
// ============================================================

function rdsCompter(): Q {
  const P = prenom();
  const t = randomInt(0, 3);
  if (t === 0) {
    const u = urne(randomInt(2, 3), { max: 6 });
    const T = totalU(u);
    return {
      text: `${introUrne(u, P)} ${randomChoice([`Combien y a-t-il de ${u.o.p} en tout ?`, `Combien de ${u.o.p} ${P} peut-${"il"} tirer en tout ?`])}`.replace(`${P} peut-il tirer`, "peut-on tirer"),
      format: "short",
      expected: [String(T)],
      comparator: "number_equal",
      explanation: exp("Pour raisonner avec un sac, on compte d’abord tous les objets.", "On ajoute les nombres de chaque couleur.", `${u.n.join(" + ")} = ${T}.`, `Il y a ${T} ${u.o.p} en tout.`),
      canvas: canvasUrne(u),
    };
  }
  if (t === 1) {
    const r = roue(randomInt(2, 4));
    const T = totalU(r);
    return {
      text: `Sur ${r.nom}, il y a ${partsTxt(r)}. Combien de parts a la roue en tout ?`,
      format: "short",
      expected: [String(T)],
      comparator: "number_equal",
      explanation: exp("Pour raisonner avec une roue, on compte ses parts.", "On ajoute les parts de chaque couleur.", `${r.n.join(" + ")} = ${T}.`, `La roue a ${T} parts.`),
      canvas: canvasRoue(r),
    };
  }
  if (t === 2) {
    const u = urne(randomInt(2, 4), { max: 4 });
    return {
      text: `${introUrne(u, P)} ${tirage(u, P)} Combien de couleurs différentes peut-on obtenir ?`,
      format: "short",
      expected: [String(u.couls.length)],
      comparator: "number_equal",
      explanation: exp("Les résultats possibles, ce sont les couleurs présentes.", "On liste les couleurs, sans compter les objets.", `Les couleurs sont : ${listeFr(u.couls.map((c) => adj(c, u.o.f, false)))}.`, `On peut obtenir ${u.couls.length} couleurs différentes.`),
      canvas: canvasUrne(u),
    };
  }
  const s = randomInt(0, 2);
  if (s === 0)
    return {
      text: `${P} lance ${randomChoice(DES)}. Combien de résultats différents peut-${"on"} obtenir ?`,
      format: "short",
      expected: ["6"],
      comparator: "number_equal",
      explanation: exp("Les résultats possibles d’un dé sont ses faces.", "On compte les faces.", "Les faces sont 1, 2, 3, 4, 5 et 6.", "Il y a 6 résultats possibles."),
      canvas: deCanvas(),
    };
  if (s === 1)
    return {
      text: `${P} lance ${randomChoice(PIECES)}. Combien de résultats différents peut-on obtenir ?`,
      format: "short",
      expected: ["2"],
      comparator: "number_equal",
      explanation: exp("Les résultats possibles d’une pièce sont ses deux côtés.", "On compte les côtés.", "La pièce tombe sur pile ou sur face.", "Il y a 2 résultats possibles."),
    };
  const n = randomInt(5, 12);
  return {
    text: `${P} tire une carte parmi ${n} cartes numérotées de 1 à ${n}. Combien de résultats différents peut-on obtenir ?`,
    format: "short",
    expected: [String(n)],
    comparator: "number_equal",
    explanation: exp("Chaque carte est un résultat possible.", "On compte les cartes.", `Les cartes vont de 1 à ${n}.`, `Il y a ${n} résultats possibles.`),
  };
}

function rdsFavorables(): Q {
  const P = prenom();
  const t = randomInt(0, 3);
  if (t === 0) {
    const e = evDe();
    return {
      text: `${P} lance ${randomChoice(DES)}. Pour gagner, il faut obtenir ${e.txt}. Combien de faces font gagner ?`,
      format: "short",
      expected: [String(e.faces.length)],
      comparator: "number_equal",
      explanation: exp("On cherche les faces qui font gagner.", "On regarde chaque face de 1 à 6.", `Les faces gagnantes sont : ${facesTxt(e.faces)}.`, `${e.faces.length} ${e.faces.length > 1 ? "faces font" : "face fait"} gagner.`),
      canvas: deCanvas(e.faces),
    };
  }
  if (t === 1) {
    const e = evDe();
    const correct = facesTxt(e.faces);
    const comp = FACES.filter((f) => !e.faces.includes(f));
    const plus1 = e.faces.map((f) => f + 1).filter((f) => f <= 6);
    const moins1 = e.faces.map((f) => f - 1).filter((f) => f >= 1);
    const avecUne = [...e.faces, ...comp.slice(0, 1)].sort((x, y) => x - y);
    const wrongs = [comp, plus1, moins1, avecUne].filter((x) => x.length > 0).map(facesTxt);
    return {
      text: `${P} lance ${randomChoice(DES)}. ${P} gagne avec ${e.txt}. Quelles faces font gagner ?`,
      format: "qcm",
      choices: makeChoices(correct, wrongs),
      expected: [correct],
      comparator: "mcq_exact",
      explanation: exp("On cherche les faces qui font gagner.", "On regarde chaque face de 1 à 6.", `Avec ${e.txt}, les faces qui conviennent sont ${correct}.`, `La bonne réponse est : ${correct}.`),
      canvas: deCanvas(e.faces),
    };
  }
  if (t === 2) {
    const u = urne(randomInt(2, 3), { max: 5 });
    const i = randomInt(0, u.couls.length - 1);
    const T = totalU(u);
    return {
      text: `${introUrne(u, P)} ${tirage(u, P)} Tirer ${unO(u.o, u.couls[i])} : combien de chances sur ${T} ?`,
      format: "short",
      expected: [String(u.n[i])],
      comparator: "number_equal",
      explanation: exp(`Chaque ${u.o.s} est une chance. Il y a ${T} ${u.o.p} en tout.`, "On compte les objets de la bonne couleur.", `Il y a ${nb(u.n[i], u.o, u.couls[i])}.`, `C’est ${chanceSur(u.n[i], T)}.`),
      canvas: canvasUrne(u),
    };
  }
  const n = randomInt(6, 12);
  const e = evCartes(n);
  return {
    text: `${P} mélange ${n} cartes numérotées de 1 à ${n} et en tire une. Pour gagner, il faut tirer ${e.txt}. Combien de cartes font gagner ?`,
    format: "short",
    expected: [String(e.cartes.length)],
    comparator: "number_equal",
    explanation: exp("On cherche les cartes qui font gagner.", `On regarde chaque carte de 1 à ${n}.`, `Les cartes gagnantes sont : ${facesTxt(e.cartes)}.`, `${e.cartes.length} ${e.cartes.length > 1 ? "cartes font" : "carte fait"} gagner.`),
  };
}

function leurresChances(a: number, t: number, nCouleurs?: number): string[] {
  const l = [chanceSur(t, a), chanceSur(a, t + 1), chanceSur(t - a, t)];
  if (t - a !== t) l.push(chanceSur(a, t - a));
  if (a !== 1) l.push(chanceSur(1, t));
  if (nCouleurs && nCouleurs !== t) l.push(chanceSur(1, nCouleurs));
  return l;
}

function rdsChances(): Q {
  const P = prenom();
  const t = randomInt(0, 3);
  const question = randomChoice(["Quelles sont ses chances ?", "Combien de chances a-t-on ?", "Quelle phrase est juste ?"]);
  if (t === 0) {
    const e = evDe();
    const a = e.faces.length;
    const correct = chanceSur(a, 6);
    return {
      text: `${P} lance ${randomChoice(DES)}. Pour gagner, il faut obtenir ${e.txt}. ${question}`,
      format: "qcm",
      choices: makeChoices(correct, leurresChances(a, 6)),
      expected: [correct],
      comparator: "mcq_exact",
      explanation: exp("Un dé a 6 faces : on compte sur 6.", "On compte les faces qui font gagner.", a > 1 ? `Les faces gagnantes sont ${facesTxt(e.faces)} : il y en a ${a}.` : `Une seule face fait gagner : le ${e.faces[0]}.`, `On a ${correct}.`),
      canvas: deCanvas(e.faces),
    };
  }
  if (t === 1) {
    const u = urne(randomInt(2, 3), { max: 5 });
    const i = randomInt(0, u.couls.length - 1);
    const T = totalU(u);
    const a = u.n[i];
    const correct = chanceSur(a, T);
    return {
      text: `${introUrne(u, P)} ${tirage(u, P)} ${maj(unO(u.o, u.couls[i]))} : ${question.toLowerCase()}`,
      format: "qcm",
      choices: makeChoices(correct, leurresChances(a, T, u.couls.length)),
      expected: [correct],
      comparator: "mcq_exact",
      explanation: exp(`On compte tous les ${u.o.p}, puis ceux de la bonne couleur.`, `${u.n.join(" + ")} = ${T} ${u.o.p} en tout.`, `Il y a ${nb(a, u.o, u.couls[i])}.`, `On a ${correct}.`),
      canvas: canvasUrne(u),
    };
  }
  if (t === 2) {
    const r = roue(randomInt(2, 4));
    const i = randomInt(0, r.couls.length - 1);
    const T = totalU(r);
    const a = r.n[i];
    const correct = chanceSur(a, T);
    return {
      text: `${introRoue(r, P)} Tomber sur une part ${r.couls[i].fs} : ${question.toLowerCase()}`,
      format: "qcm",
      choices: makeChoices(correct, leurresChances(a, T, r.couls.length)),
      expected: [correct],
      comparator: "mcq_exact",
      explanation: exp("Les parts ont la même taille : chaque part est une chance.", `${r.n.join(" + ")} = ${T} parts en tout.`, `Il y a ${nbParts(a, r.couls[i])}.`, `On a ${correct}.`),
      canvas: canvasRoue(r),
    };
  }
  const n = randomInt(6, 12);
  const e = evCartes(n);
  const a = e.cartes.length;
  const correct = chanceSur(a, n);
  return {
    text: `${P} mélange ${n} cartes numérotées de 1 à ${n} et en tire une. Pour gagner, il faut tirer ${e.txt}. ${question}`,
    format: "qcm",
    choices: makeChoices(correct, leurresChances(a, n)),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(`Il y a ${n} cartes : on compte sur ${n}.`, "On compte les cartes qui font gagner.", a > 1 ? `Les cartes gagnantes sont ${facesTxt(e.cartes)} : il y en a ${a}.` : `Une seule carte fait gagner : le ${e.cartes[0]}.`, `On a ${correct}.`),
  };
}

function genRoueDeSac(niv: Niv): Q {
  if (niv <= 1) return rdsCompter();
  if (niv === 2) return rdsFavorables();
  return rdsChances();
}

// ============================================================
// PROBABILITE_DEFI — défis courts
// ============================================================

function defiQuelEvenement(): Q {
  const rep = randomChoice(MOTS);
  const P = prenom();
  if (Math.random() < 0.5) {
    // Le dé
    const imp = `obtenir ${randomInt(7, 12)}`;
    const cer = randomChoice(["obtenir un nombre de 1 à 6", `obtenir un nombre plus petit que ${randomInt(7, 9)}`]);
    const pos = [`obtenir ${randomInt(1, 6)}`, `obtenir ${evDe().txt}`];
    const par: Record<Mot, string[]> = { impossible: [imp, "obtenir 0"], certain: [cer], possible: pos };
    const correct = maj(randomChoice(par[rep]));
    const autres = MOTS.filter((m) => m !== rep).flatMap((m) => par[m]).map(maj);
    return {
      text: `${P} lance ${randomChoice(DES)}. Quel événement est ${rep} ?`,
      format: "qcm",
      choices: makeChoices(correct, autres),
      expected: [correct],
      comparator: "mcq_exact",
      explanation: exp(
        { certain: "Certain : cela arrive à coup sûr.", possible: "Possible : cela peut arriver, mais pas sûr.", impossible: "Impossible : cela ne peut jamais arriver." }[rep],
        "On regarde les faces du dé : 1, 2, 3, 4, 5 et 6.",
        `${correct} : ${rep === "impossible" ? "aucune face ne convient" : rep === "certain" ? "toutes les faces conviennent" : "certaines faces conviennent, pas toutes"}.`,
        `L’événement ${rep} est : ${correct}.`,
      ),
      canvas: deCanvas(),
    };
  }
  // Le sac
  const u = urne(3, { max: 5 });
  const absente = randomChoice(ABSENTES);
  const par: Record<Mot, string[]> = {
    possible: u.couls.map((c) => `tirer ${unO(u.o, c)}`),
    impossible: [`tirer ${unO(u.o, absente)}`],
    certain: [`tirer ${unO(u.o, u.couls[0])}, ${adj(u.couls[1], u.o.f, false)} ou ${adj(u.couls[2], u.o.f, false)}`],
  };
  const correct = maj(randomChoice(par[rep]));
  const autres = MOTS.filter((m) => m !== rep).flatMap((m) => par[m]).map(maj);
  return {
    text: `${introUrne(u, P)} ${tirage(u, P)} Quel événement est ${rep} ?`,
    format: "qcm",
    choices: makeChoices(correct, autres),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      { certain: "Certain : cela arrive à coup sûr.", possible: "Possible : cela peut arriver, mais pas sûr.", impossible: "Impossible : cela ne peut jamais arriver." }[rep],
      "On regarde les couleurs présentes.",
      `Il y a ${compo(u)}, et ${aucun(u.o, absente)}.`,
      `L’événement ${rep} est : ${correct}.`,
    ),
    canvas: canvasUrne(u),
  };
}

function defiQuelContenant(): Q {
  const [P1, P2, P3] = prenoms(3);
  const o = randomChoice(OBJETS);
  const cont = randomChoice(o.conts);
  const [c, d, e] = melange(COULS).slice(0, 3);
  const nA = randomInt(2, 6);
  const nB1 = randomInt(1, 4), nB2 = randomInt(1, 4);
  const nC = randomInt(2, 6);
  // P1 : que des c (certain) ; P2 : c et d (possible) ; P3 : que des e (impossible)
  const desc = [
    { p: P1, txt: nb(nA, o, c) },
    { p: P2, txt: `${nb(nB1, o, c)} et ${nb(nB2, o, d)}` },
    { p: P3, txt: nb(nC, o, e) },
  ];
  const sur = Math.random() < 0.5;
  const s = (p: string) => `${cont.le} ${deP(p)}`;
  const correct = sur ? s(P1) : s(P3);
  const ordre = melange(desc);
  const quel = `quel${cont.f ? "le" : ""} ${cont.nom}`;
  return {
    text: `${ordre.map((x) => `${maj(s(x.p))} contient ${x.txt}.`).join(" ")} Dans ${quel} ${sur ? "est-on sûr" : "est-il impossible"} de tirer ${unO(o, c)} ?`,
    format: "qcm",
    choices: makeChoices(correct, [s(P1), s(P2), s(P3), cont.f ? "aucune" : "aucun"]),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      sur ? "On est sûr quand tous les objets sont de la bonne couleur." : "C’est impossible quand il n’y a aucun objet de cette couleur.",
      "On regarde ce que contient chacun.",
      `${maj(s(P1))} : que des ${o.p} ${adj(c, o.f, true)}. ${maj(s(P2))} : des ${adj(c, o.f, true)} et des ${adj(d, o.f, true)}. ${maj(s(P3))} : que des ${o.p} ${adj(e, o.f, true)}.`,
      `La réponse est ${correct}.`,
    ),
  };
}

function defiAjouterEnlever(): Q {
  const P = prenom();
  const u = urne(2, { min: 1, max: 7, distincts: true });
  const [i, j] = u.n[0] < u.n[1] ? [0, 1] : [1, 0];
  const a = u.n[i];
  const b = u.n[j];
  const ci = u.couls[i];
  const cj = u.couls[j];
  const ajouter = Math.random() < 0.5;
  const d = b - a;
  const but = `avoir autant de chances de tirer ${unO(u.o, ci)} qu’${unO(u.o, cj)}`;
  return {
    text: ajouter
      ? `${introUrne(u, P)} Combien de ${u.o.p} ${adj(ci, u.o.f, true)} faut-il ajouter pour ${but} ?`
      : `${introUrne(u, P)} Combien de ${u.o.p} ${adj(cj, u.o.f, true)} faut-il enlever pour ${but} ?`,
    format: "short",
    expected: [String(d)],
    comparator: "number_equal",
    explanation: exp(
      "Deux couleurs ont autant de chances quand il y a le même nombre d’objets de chaque couleur.",
      ajouter ? `On ajoute des ${adj(ci, u.o.f, true)} jusqu’à en avoir ${b}.` : `On enlève des ${adj(cj, u.o.f, true)} jusqu’à en avoir ${a}.`,
      `Il y a ${nb(a, u.o, ci)} et ${nb(b, u.o, cj)} : ${b} − ${a} = ${d}.`,
      `Il faut ${ajouter ? "ajouter" : "enlever"} ${d} ${d > 1 ? u.o.p : u.o.s}.`,
    ),
    canvas: canvasUrne(u),
  };
}

function defiRendre(): Q {
  const P = prenom();
  const u = urne(randomInt(2, 3), { min: 2, max: 5 });
  const c = u.couls[0];
  const autre = u.couls[1];
  const o = u.o;
  const imp = Math.random() < 0.5;
  const correct = imp ? `enlever ${tousLes(o)} ${adj(c, o.f, true)}` : `enlever ${tousLes(o)} qui ne sont pas ${adj(c, o.f, true)}`;
  const wrongs = [
    `ajouter ${unO(o, c)}`,
    `enlever ${o.f ? "une seule" : "un seul"} ${o.s} ${adj(c, o.f, false)}`,
    `bien mélanger ${u.cont.le}`,
    imp ? `enlever ${tousLes(o)} ${adj(autre, o.f, true)}` : `enlever ${tousLes(o)} ${adj(c, o.f, true)}`,
    `ajouter ${unO(o, autre)}`,
  ];
  return {
    text: imp
      ? `${introUrne(u, P)} Que faut-il faire pour que tirer ${unO(o, c)} devienne impossible ?`
      : `${introUrne(u, P)} Que faut-il faire pour être sûr de tirer ${unO(o, c)} ?`,
    format: "qcm",
    choices: makeChoices(correct, wrongs),
    expected: [correct],
    comparator: "mcq_exact",
    explanation: exp(
      imp ? "Impossible : il ne doit rester aucun objet de cette couleur." : "Certain : il ne doit rester que des objets de cette couleur.",
      "On se demande ce qui reste dans le contenant.",
      `Il y a ${compo(u)}.`,
      `Il faut ${correct}.`,
    ),
    canvas: canvasUrne(u),
  };
}

function genDefi(niv: Niv): Q {
  if (niv <= 3) return randomChoice([defiQuelEvenement, defiQuelContenant, () => cmpTombola(), () => cmpTombola(false)])();
  return randomChoice([defiAjouterEnlever, defiRendre, rdsChances, cmpDeuxSacs])();
}

// ============================================================
// BANK
// ============================================================

export const probabilitesBank: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "cm1_probabilite_comparer_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Un sac contient 3 billes rouges et 1 bille verte. Quelle couleur a le plus de chances d'être tirée ?",
    format: "qcm",
    choices: ["rouge","verte","c'est pareil","aucune"],
    expected: ["rouge"],
    comparator: "mcq_exact",
    hint: "Compte les billes de chaque couleur.",
    explanation: "Il y a plus de billes rouges (3) que de vertes (1) : on a plus de chances de tirer une rouge.",
    tags: ["cm1","probabilite","probabilite_comparer","guide","qcm"],
  },
  {
    kind: "fixed",
    id: "cm1_probabilite_roue_de_sac_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    text: "Avec un dé à 6 faces (de 1 à 6), obtenir le nombre 7 est...",
    format: "qcm",
    choices: ["impossible","certain","possible","sûr"],
    expected: ["impossible"],
    comparator: "mcq_exact",
    hint: "Regarde les nombres présents sur le dé.",
    explanation: "Un dé ne va que de 1 à 6, donc obtenir 7 est impossible.",
    tags: ["cm1","probabilite","probabilite_roue_de_sac","guide","qcm"],
  },
  {
    kind: "fixed",
    id: "cm1_probabilite_defi_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 3,
    theme: "reunion",
    text: "À la tombola de l'école, plus on a de tickets, plus on a de chances de gagner. Léa a 5 tickets, Tom en a 2. Qui a le plus de chances ?",
    format: "qcm",
    choices: ["Léa","Tom","c'est pareil","personne"],
    expected: ["Léa"],
    comparator: "mcq_exact",
    hint: "Compare le nombre de tickets.",
    explanation: "Léa a plus de tickets (5 contre 2), donc plus de chances de gagner.",
    tags: ["cm1","probabilite","probabilite_defi","guide","qcm"],
  },

  // ============================================================
  // PROBABILITE_VOCABULAIRE
  // certain / impossible / possible
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_probabilite_vocabulaire_fixed_1_certain",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Un événement certain est un événement qui...",
    format: "qcm",
    choices: [
      "se produit toujours",
      "ne se produit jamais",
      "peut se produire mais pas toujours",
      "est impossible",
    ],
    expected: ["se produit toujours"],
    comparator: "mcq_exact",
    hint: "Certain veut dire : on est sûr que cela arrive.",
    explanation: exp(
      "Un événement certain se produit toujours.",
      "On se demande si le résultat arrive à chaque fois.",
      "Par exemple, avec un dé classique, obtenir un nombre entre 1 et 6 est certain.",
      "La bonne réponse est : se produit toujours."
    ),
    tags: ["cm1", "probabilite", "vocabulaire", "certain", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_vocabulaire_fixed_2_impossible",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Un événement impossible est un événement qui...",
    format: "qcm",
    choices: [
      "ne peut jamais se produire",
      "se produit toujours",
      "arrive une fois sur deux",
      "est certain",
    ],
    expected: ["ne peut jamais se produire"],
    comparator: "mcq_exact",
    hint: "Impossible veut dire : cela ne peut pas arriver.",
    explanation: exp(
      "Un événement impossible ne peut jamais se produire.",
      "On vérifie si le résultat peut exister.",
      "Avec un dé classique, obtenir 7 est impossible.",
      "La bonne réponse est : ne peut jamais se produire."
    ),
    tags: ["cm1", "probabilite", "vocabulaire", "impossible", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_vocabulaire_fixed_3_possible",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Un événement possible est un événement qui...",
    format: "qcm",
    choices: [
      "peut se produire",
      "ne peut jamais se produire",
      "se produit toujours",
      "n’existe pas",
    ],
    expected: ["peut se produire"],
    comparator: "mcq_exact",
    hint: "Possible veut dire : cela peut arriver.",
    explanation: exp(
      "Un événement possible peut se produire.",
      "Il n’est pas forcément certain.",
      "Avec un dé, obtenir 4 est possible, mais on peut aussi obtenir un autre nombre.",
      "La bonne réponse est : peut se produire."
    ),
    tags: ["cm1", "probabilite", "vocabulaire", "possible", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_vocabulaire_fixed_4_de_7",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Avec un dé classique, obtenir 7 est...",
    format: "qcm",
    choices: ["impossible", "possible", "certain"],
    expected: ["impossible"],
    comparator: "mcq_exact",
    hint: "Un dé classique a seulement les faces 1, 2, 3, 4, 5 et 6.",
    explanation: exp(
      "Un événement impossible ne peut pas arriver.",
      "On regarde les faces du dé.",
      "Il n’y a pas de face 7 sur un dé classique.",
      "Obtenir 7 est impossible."
    ),
    tags: ["cm1", "probabilite", "vocabulaire", "de", "qcm", "canvas"],
    canvas: deCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_vocabulaire_fixed_5_de_1_a_6",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Avec un dé classique, obtenir un nombre entre 1 et 6 est...",
    format: "qcm",
    choices: ["certain", "possible", "impossible"],
    expected: ["certain"],
    comparator: "mcq_exact",
    hint: "Toutes les faces du dé sont entre 1 et 6.",
    explanation: exp(
      "Un événement certain se produit toujours.",
      "On regarde toutes les faces possibles du dé.",
      "Les faces sont 1, 2, 3, 4, 5 et 6.",
      "Obtenir un nombre entre 1 et 6 est certain."
    ),
    tags: ["cm1", "probabilite", "vocabulaire", "de", "certain", "canvas"],
    canvas: deCanvas([1, 2, 3, 4, 5, 6]),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_vocabulaire_fixed_6_de_pair",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Avec un dé classique, obtenir un nombre pair est...",
    format: "qcm",
    choices: ["possible", "certain", "impossible"],
    expected: ["possible"],
    comparator: "mcq_exact",
    hint: "Les nombres pairs du dé sont 2, 4 et 6.",
    explanation: exp(
      "Un événement possible peut arriver, mais pas toujours.",
      "On cherche les faces paires.",
      "Les faces 2, 4 et 6 existent, mais il y a aussi 1, 3 et 5.",
      "Obtenir un nombre pair est possible."
    ),
    tags: ["cm1", "probabilite", "vocabulaire", "de", "pair", "canvas"],
    canvas: deCanvas([2, 4, 6]),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_vocabulaire_fixed_7_roue_noir",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Avec cette roue, tomber sur noir est...",
    format: "qcm",
    choices: ["impossible", "possible", "certain"],
    expected: ["impossible"],
    comparator: "mcq_exact",
    hint: "Cherche s’il y a une partie noire sur la roue.",
    explanation: exp(
      "Un événement impossible ne peut pas arriver.",
      "On observe les couleurs présentes sur la roue.",
      "La roue contient rouge, bleu, vert et jaune, mais pas noir.",
      "Tomber sur noir est impossible."
    ),
    tags: ["cm1", "probabilite", "vocabulaire", "roue", "canvas"],
    canvas: roueSimpleCanvas(),
  },

  {
    kind: "template",
    id: "cm1_probabilite_vocabulaire_tpl_1_de",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde les faces possibles du dé.",
    tags: ["cm1", "probabilite", "vocabulaire", "de", "template", "canvas"],
    generate: () => genVocabulaire(2),
  },

  {
    kind: "template",
    id: "cm1_probabilite_vocabulaire_tpl_2_billes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde si la couleur existe dans le sac.",
    tags: ["cm1", "probabilite", "vocabulaire", "billes", "template", "canvas"],
    generate: () => genVocabulaire(2),
  },

  // ============================================================
  // PROBABILITE_HASARD
  // Reconnaître une situation de hasard
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_probabilite_hasard_fixed_1_definition",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 1,
    theme: "neutral",
    text: "Une situation de hasard est une situation où...",
    format: "qcm",
    choices: [
      "on ne connaît pas le résultat à l’avance",
      "on connaît toujours le résultat",
      "il n’y a aucun résultat possible",
      "le résultat est écrit au tableau",
    ],
    expected: ["on ne connaît pas le résultat à l’avance"],
    comparator: "mcq_exact",
    hint: "Avec le hasard, plusieurs résultats peuvent arriver.",
    explanation: exp(
      "Une situation de hasard est une situation dont on ne connaît pas le résultat à l’avance.",
      "On vérifie s’il y a plusieurs résultats possibles.",
      "Avec un dé, on ne sait pas à l’avance quelle face va sortir.",
      "C’est une situation de hasard."
    ),
    tags: ["cm1", "probabilite", "hasard", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_hasard_fixed_2_lancer_de",
    niveau: "cm1",
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
      "le dé n’a aucune face",
      "on choisit le résultat après le lancer",
    ],
    expected: ["on ne sait pas à l’avance quelle face va sortir"],
    comparator: "mcq_exact",
    hint: "Avant le lancer, plusieurs faces peuvent sortir.",
    explanation: exp(
      "Une situation de hasard a un résultat inconnu à l’avance.",
      "On regarde s’il y a plusieurs résultats possibles.",
      "Avec un dé, 1, 2, 3, 4, 5 ou 6 peuvent sortir.",
      "Lancer un dé est une situation de hasard."
    ),
    tags: ["cm1", "probabilite", "hasard", "de", "qcm", "canvas"],
    canvas: deCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_hasard_fixed_3_roue",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 1,
    theme: "neutral",
    text: "Faire tourner cette roue est une situation de hasard parce que...",
    format: "qcm",
    choices: [
      "on ne sait pas à l’avance sur quelle couleur elle va s’arrêter",
      "elle s’arrête toujours sur rouge",
      "il n’y a aucune couleur",
      "on choisit la couleur après",
    ],
    expected: ["on ne sait pas à l’avance sur quelle couleur elle va s’arrêter"],
    comparator: "mcq_exact",
    hint: "La roue contient plusieurs couleurs.",
    explanation: exp(
      "Une situation de hasard a plusieurs résultats possibles.",
      "On observe la roue.",
      "Elle peut s’arrêter sur plusieurs couleurs.",
      "On ne sait pas à l’avance où elle va s’arrêter."
    ),
    tags: ["cm1", "probabilite", "hasard", "roue", "qcm", "canvas"],
    canvas: roueSimpleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_hasard_fixed_4_pas_hasard_calcul",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer 4 + 5 est-il une situation de hasard ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le résultat de 4 + 5 est toujours le même.",
    explanation: exp(
      "Une situation de hasard a un résultat inconnu à l’avance.",
      "Pour un calcul, le résultat est fixé.",
      "4 + 5 vaut toujours 9.",
      "Ce n’est pas une situation de hasard."
    ),
    tags: ["cm1", "probabilite", "hasard", "non_hasard", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_hasard_fixed_5_tombola_reunion",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 2,
    theme: "reunion",
    text: "À une tombola d’école à La Réunion, on tire un ticket sans regarder. Pourquoi est-ce une situation de hasard ?",
    format: "qcm",
    choices: [
      "on ne sait pas à l’avance quel ticket sera tiré",
      "le même ticket sort toujours",
      "il n’y a aucun ticket",
      "on choisit le gagnant après avoir regardé",
    ],
    expected: ["on ne sait pas à l’avance quel ticket sera tiré"],
    comparator: "mcq_exact",
    hint: "Avant le tirage, plusieurs tickets peuvent sortir.",
    explanation: exp(
      "Une situation de hasard a un résultat inconnu à l’avance.",
      "On tire un ticket sans regarder.",
      "Plusieurs tickets peuvent être tirés.",
      "On ne sait pas à l’avance quel ticket sortira."
    ),
    tags: ["cm1", "probabilite", "hasard", "reunion", "tombola", "qcm"],
  },

  {
    kind: "template",
    id: "cm1_probabilite_hasard_tpl_1_situation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 2,
    theme: "neutral",
    hint: "Demande-toi si on connaît le résultat à l’avance.",
    tags: ["cm1", "probabilite", "hasard", "template", "qcm"],
    generate: () => genHasard(2),
  },

  // ============================================================
  // PROBABILITE_COMPARER
  // Comparer des chances simples
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_probabilite_comparer_fixed_1_billes_rouge_bleu",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Dans ce sac, quelle couleur a le plus de chances d’être tirée ?",
    format: "qcm",
    choices: ["rouge", "bleu", "vert", "elles ont toutes autant de chances"],
    expected: ["rouge"],
    comparator: "mcq_exact",
    hint: "Compare le nombre de billes de chaque couleur.",
    explanation: exp(
      "Plus il y a d’objets d’un type, plus ce type a de chances d’être tiré.",
      "On compte les billes de chaque couleur.",
      "Il y a 3 rouges, 2 bleues et 1 verte.",
      "La couleur rouge a le plus de chances."
    ),
    tags: ["cm1", "probabilite", "comparer", "billes", "qcm", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_comparer_fixed_2_billes_equilibrees",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Dans ce sac, rouge, bleu et vert ont...",
    format: "qcm",
    choices: [
      "autant de chances",
      "rouge a plus de chances",
      "bleu est impossible",
      "vert est certain",
    ],
    expected: ["autant de chances"],
    comparator: "mcq_exact",
    hint: "Compte les billes de chaque couleur.",
    explanation: exp(
      "Deux événements ont autant de chances quand ils ont le même nombre de cas favorables.",
      "On compte les billes rouges, bleues et vertes.",
      "Il y a 2 rouges, 2 bleues et 2 vertes.",
      "Les trois couleurs ont autant de chances."
    ),
    tags: ["cm1", "probabilite", "comparer", "egalite", "qcm", "canvas"],
    canvas: billesEquilibreesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_comparer_fixed_3_roue_rouge",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Sur cette roue, quelle couleur a le plus de chances de sortir ?",
    format: "qcm",
    choices: ["Rouge", "Bleu", "Vert", "Jaune"],
    expected: ["Rouge"],
    comparator: "mcq_exact",
    hint: "Regarde la couleur qui prend le plus de place.",
    explanation: exp(
      "Sur une roue, une couleur a plus de chances si elle occupe une plus grande partie.",
      "On compare les tailles des parties.",
      "La partie rouge est plus grande que les autres.",
      "Rouge a le plus de chances de sortir."
    ),
    tags: ["cm1", "probabilite", "comparer", "roue", "qcm", "canvas"],
    canvas: roueRougeFavoriCanvas(),
  },

  {
    kind: "template",
    id: "cm1_probabilite_comparer_tpl_1_billes_plus_probable",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte chaque couleur puis compare.",
    tags: ["cm1", "probabilite", "comparer", "billes", "template", "canvas"],
    generate: () => genComparer(3),
  },

  {
    kind: "template",
    id: "cm1_probabilite_comparer_tpl_2_roue_plus_probable",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare la taille des parties de la roue.",
    tags: ["cm1", "probabilite", "comparer", "roue", "template", "canvas"],
    generate: () => genComparer(3),
  },

  // ============================================================
  // PROBABILITE_ROUE_DE_SAC
  // Raisonner avec une roue, un dé ou un sac
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_probabilite_roue_de_sac_fixed_1_de_pair",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    text: "Avec ce dé, quelles faces permettent d’obtenir un nombre pair ?",
    format: "qcm",
    choices: ["2, 4 et 6", "1, 3 et 5", "1, 2 et 3", "4, 5 et 6"],
    expected: ["2, 4 et 6"],
    comparator: "mcq_exact",
    hint: "Les nombres pairs se terminent par 0, 2, 4, 6 ou 8.",
    explanation: exp(
      "Un nombre pair est divisible par 2.",
      "On regarde les faces du dé.",
      "Les faces paires sont 2, 4 et 6.",
      "Les faces favorables sont 2, 4 et 6."
    ),
    tags: ["cm1", "probabilite", "de", "pair", "qcm", "canvas"],
    canvas: deCanvas([2, 4, 6]),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_roue_de_sac_fixed_2_sac_rouge",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    text: "Dans ce sac, combien y a-t-il de billes rouges ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Compte les billes avec la lettre R.",
    explanation: exp(
      "Pour raisonner avec un sac, on compte les objets.",
      "On repère les billes rouges.",
      "Il y a 3 billes rouges.",
      "La réponse est 3."
    ),
    tags: ["cm1", "probabilite", "sac", "billes", "short", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_roue_de_sac_fixed_3_roue_possible",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    text: "Avec cette roue, tomber sur bleu est...",
    format: "qcm",
    choices: ["possible", "impossible", "certain"],
    expected: ["possible"],
    comparator: "mcq_exact",
    hint: "La roue contient une partie bleue.",
    explanation: exp(
      "Une couleur est possible si elle apparaît sur la roue.",
      "On observe les couleurs de la roue.",
      "Il y a une partie bleue, mais il y a aussi d’autres couleurs.",
      "Tomber sur bleu est possible."
    ),
    tags: ["cm1", "probabilite", "roue", "possible", "qcm", "canvas"],
    canvas: roueSimpleCanvas(),
  },

  {
    kind: "template",
    id: "cm1_probabilite_roue_de_sac_tpl_1_compter_couleur",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les billes de la couleur demandée.",
    tags: ["cm1", "probabilite", "sac", "billes", "template", "canvas"],
    generate: () => genRoueDeSac(3),
  },

  {
    kind: "template",
    id: "cm1_probabilite_roue_de_sac_tpl_2_de_faces",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 3,
    theme: "neutral",
    hint: "Repère les faces qui conviennent.",
    tags: ["cm1", "probabilite", "de", "template", "canvas"],
    generate: () => genRoueDeSac(3),
  },

  // ============================================================
  // PROBABILITE_DEFI
  // Défis courts, concrets, sans piège
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_probabilite_defi_fixed_1_sac_plus_probable",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Dans ce sac, quelle couleur est la plus probable ?",
    format: "qcm",
    choices: ["rouge", "bleu", "vert", "jaune"],
    expected: ["rouge"],
    comparator: "mcq_exact",
    hint: "Compte les billes de chaque couleur.",
    explanation: exp(
      "La couleur la plus probable est celle qui apparaît le plus souvent.",
      "On compte chaque couleur.",
      "Il y a 3 rouges, 2 bleues et 1 verte.",
      "Rouge est la couleur la plus probable."
    ),
    tags: ["cm1", "probabilite", "defi", "sac", "qcm", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_defi_fixed_2_de_possible_impossible",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Avec un dé classique, quel événement est impossible ?",
    format: "qcm",
    choices: [
      "obtenir 8",
      "obtenir 4",
      "obtenir un nombre pair",
      "obtenir un nombre entre 1 et 6",
    ],
    expected: ["obtenir 8"],
    comparator: "mcq_exact",
    hint: "Cherche l’événement qui ne peut pas arriver.",
    explanation: exp(
      "Un événement impossible ne peut jamais arriver.",
      "On regarde les faces du dé.",
      "Un dé classique n’a pas de face 8.",
      "Obtenir 8 est impossible."
    ),
    tags: ["cm1", "probabilite", "defi", "de", "qcm", "canvas"],
    canvas: deCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_defi_fixed_3_reunion_kermesse",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 3,
    theme: "reunion",
    text: "À la kermesse, une roue contient 3 parts rouges, 1 bleue, 1 verte et 1 jaune. Quelle couleur a le plus de chances de sortir ?",
    format: "qcm",
    choices: ["Rouge", "Bleu", "Vert", "Jaune"],
    expected: ["Rouge"],
    comparator: "mcq_exact",
    hint: "Cherche la couleur qui apparaît le plus sur la roue.",
    explanation: exp(
      "Sur une roue, plus une couleur occupe de place, plus elle a de chances de sortir.",
      "On compare les parts de couleur.",
      "Rouge a 3 parts, les autres couleurs ont 1 part.",
      "Rouge a le plus de chances de sortir."
    ),
    tags: ["cm1", "probabilite", "defi", "roue", "reunion", "canvas"],
    canvas: roueRougeFavoriCanvas(),
  },

  {
    kind: "template",
    id: "cm1_probabilite_defi_tpl_1_billes_plus_probable",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte chaque couleur puis compare les nombres.",
    tags: ["cm1", "probabilite", "defi", "billes", "template", "canvas"],
    generate: () => genDefi(4),
  },

  {
    kind: "template",
    id: "cm1_probabilite_defi_tpl_2_possible_impossible",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche si l’événement peut arriver ou non.",
    tags: ["cm1", "probabilite", "defi", "possible_impossible", "template", "canvas"],
    generate: () => genDefi(4),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_defi_open_1_expliquer_possible",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi tirer une bille rouge est possible dans ce sac.",
    format: "open",
    expected: ["rouge", "bille", "possible"],
    comparator: "contains_keyword",
    hint: "Regarde s’il y a au moins une bille rouge.",
    explanation: exp(
      "Un événement possible peut arriver.",
      "On regarde si l’objet demandé existe.",
      "Le sac contient des billes rouges.",
      "Tirer une bille rouge est donc possible."
    ),
    tags: ["cm1", "probabilite", "defi", "open", "billes", "canvas"],
    canvas: billesCanvas(),
  },

  // ============================================================
  // TOP-UP — PROBABILITE_VOCABULAIRE
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_probabilite_vocabulaire_fixed_8_roue_rouge",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Avec cette roue, tomber sur rouge est...",
    format: "qcm",
    choices: ["possible", "impossible", "certain"],
    expected: ["possible"],
    comparator: "mcq_exact",
    hint: "Cherche s’il y a une partie rouge sur la roue.",
    explanation: exp(
      "Une couleur est possible si elle apparaît sur la roue.",
      "On observe les couleurs de la roue.",
      "Il y a une partie rouge, mais aussi d’autres couleurs.",
      "Tomber sur rouge est possible."
    ),
    tags: ["cm1", "probabilite", "vocabulaire", "roue", "qcm", "canvas"],
    canvas: roueSimpleCanvas(),
  },

  // ============================================================
  // TOP-UP — PROBABILITE_HASARD
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_probabilite_hasard_fixed_6_piece",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 1,
    theme: "neutral",
    text: "Lancer une pièce (pile ou face) est-il une situation de hasard ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Avant le lancer, on ne sait pas si ce sera pile ou face.",
    explanation: exp(
      "Une situation de hasard a un résultat inconnu à l’avance.",
      "On regarde s’il y a plusieurs résultats possibles.",
      "La pièce peut tomber sur pile ou sur face.",
      "Lancer une pièce est une situation de hasard."
    ),
    tags: ["cm1", "probabilite", "hasard", "piece", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_hasard_fixed_7_carte",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 1,
    theme: "neutral",
    text: "Tirer une carte d’un paquet mélangé, sans regarder, est-il une situation de hasard ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "On ne sait pas quelle carte va sortir.",
    explanation: exp(
      "Une situation de hasard a un résultat inconnu à l’avance.",
      "On regarde si plusieurs cartes peuvent sortir.",
      "Le paquet est mélangé, n’importe quelle carte peut sortir.",
      "Tirer une carte au hasard est une situation de hasard."
    ),
    tags: ["cm1", "probabilite", "hasard", "carte", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_hasard_fixed_8_choix_nombre",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 2,
    theme: "neutral",
    text: "Choisir le plus grand de deux nombres écrits au tableau est-il une situation de hasard ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le résultat est déjà connu en regardant les nombres.",
    explanation: exp(
      "Une situation de hasard a un résultat inconnu à l’avance.",
      "On regarde si le résultat dépend du hasard.",
      "Le plus grand de deux nombres est toujours le même, on peut le voir.",
      "Ce n’est pas une situation de hasard."
    ),
    tags: ["cm1", "probabilite", "hasard", "non_hasard", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_hasard_fixed_9_billes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 2,
    theme: "neutral",
    text: "Tirer une bille de ce sac sans regarder est une situation de hasard parce que...",
    format: "qcm",
    choices: [
      "on ne sait pas à l’avance quelle bille sera tirée",
      "on tire toujours une bille rouge",
      "il n’y a aucune bille",
      "on choisit la couleur après avoir regardé",
    ],
    expected: ["on ne sait pas à l’avance quelle bille sera tirée"],
    comparator: "mcq_exact",
    hint: "Plusieurs couleurs peuvent sortir.",
    explanation: exp(
      "Une situation de hasard a un résultat inconnu à l’avance.",
      "On observe les billes du sac.",
      "Plusieurs couleurs sont présentes, on ne sait pas laquelle on tirera.",
      "C’est une situation de hasard."
    ),
    tags: ["cm1", "probabilite", "hasard", "billes", "qcm", "canvas"],
    canvas: billesCanvas(),
  },

  // ============================================================
  // TOP-UP — PROBABILITE_COMPARER
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_probabilite_comparer_fixed_4_moins_probable",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Dans ce sac, quelle couleur a le moins de chances d’être tirée ?",
    format: "qcm",
    choices: ["vert", "rouge", "bleu", "elles ont toutes autant de chances"],
    expected: ["vert"],
    comparator: "mcq_exact",
    hint: "Cherche la couleur la moins présente.",
    explanation: exp(
      "Moins il y a d’objets d’une couleur, moins elle a de chances d’être tirée.",
      "On compte les billes de chaque couleur.",
      "Il y a 3 rouges, 2 bleues et 1 verte.",
      "La couleur verte a le moins de chances."
    ),
    tags: ["cm1", "probabilite", "comparer", "billes", "qcm", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_comparer_fixed_5_rouge_vs_vert",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Dans ce sac, rouge a-t-il plus de chances d’être tiré que vert ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Compare le nombre de rouges et de verts.",
    explanation: exp(
      "La couleur la plus présente a le plus de chances.",
      "On compte les billes rouges et vertes.",
      "Il y a 3 rouges et 1 verte.",
      "Oui, rouge a plus de chances que vert."
    ),
    tags: ["cm1", "probabilite", "comparer", "billes", "qcm", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_comparer_fixed_6_roue_egalite",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Sur cette roue, les quatre couleurs ont-elles autant de chances de sortir ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Compare la taille des quatre parties.",
    explanation: exp(
      "Deux couleurs ont autant de chances si elles occupent la même place.",
      "On compare les parts de la roue.",
      "Les quatre parties (rouge, bleu, vert, jaune) ont la même taille.",
      "Oui, elles ont toutes autant de chances."
    ),
    tags: ["cm1", "probabilite", "comparer", "roue", "egalite", "qcm", "canvas"],
    canvas: roueSimpleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_comparer_fixed_7_de_pair_impair",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Avec ce dé, a-t-on autant de chances d’obtenir un nombre pair qu’un nombre impair ?",
    format: "qcm",
    choices: [
      "oui, autant de chances",
      "non, plus de chances d’avoir un pair",
      "non, plus de chances d’avoir un impair",
      "c’est impossible",
    ],
    expected: ["oui, autant de chances"],
    comparator: "mcq_exact",
    hint: "Compte les faces paires et les faces impaires.",
    explanation: exp(
      "On a autant de chances si le nombre de cas favorables est le même.",
      "On compte les faces paires et impaires.",
      "Pairs : 2, 4, 6 (3 faces). Impairs : 1, 3, 5 (3 faces).",
      "Oui, on a autant de chances d’obtenir un pair qu’un impair."
    ),
    tags: ["cm1", "probabilite", "comparer", "de", "egalite", "qcm", "canvas"],
    canvas: deCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_comparer_fixed_8_billes_equilibrees",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Dans ce sac, rouge a-t-il plus de chances d’être tiré que bleu ?",
    format: "qcm",
    choices: ["non, ils ont autant de chances", "oui", "bleu est impossible", "rouge est certain"],
    expected: ["non, ils ont autant de chances"],
    comparator: "mcq_exact",
    hint: "Compte les rouges et les bleues.",
    explanation: exp(
      "Deux couleurs ont autant de chances si elles sont en même nombre.",
      "On compte les billes rouges et bleues.",
      "Il y a 2 rouges et 2 bleues.",
      "Non, rouge et bleu ont autant de chances."
    ),
    tags: ["cm1", "probabilite", "comparer", "billes", "egalite", "qcm", "canvas"],
    canvas: billesEquilibreesCanvas(),
  },

  // ============================================================
  // TOP-UP — PROBABILITE_ROUE_DE_SAC
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_probabilite_roue_de_sac_fixed_4_de_sup4",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    text: "Avec ce dé, quelles faces permettent d’obtenir un nombre supérieur à 4 ?",
    format: "qcm",
    choices: ["5 et 6", "4 et 5", "1 et 2", "2, 4 et 6"],
    expected: ["5 et 6"],
    comparator: "mcq_exact",
    hint: "Supérieur à 4 veut dire strictement plus grand que 4.",
    explanation: exp(
      "On cherche les faces qui respectent la condition.",
      "On regarde les faces strictement supérieures à 4.",
      "Les faces 5 et 6 sont supérieures à 4.",
      "Les faces favorables sont 5 et 6."
    ),
    tags: ["cm1", "probabilite", "de", "qcm", "canvas"],
    canvas: deCanvas([5, 6]),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_roue_de_sac_fixed_5_total_billes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    text: "Combien y a-t-il de billes en tout dans ce sac ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Compte toutes les billes, toutes couleurs confondues.",
    explanation: exp(
      "Pour raisonner avec un sac, on compte tous les objets.",
      "On compte toutes les billes.",
      "3 rouges + 2 bleues + 1 verte = 6.",
      "Il y a 6 billes en tout."
    ),
    tags: ["cm1", "probabilite", "sac", "billes", "short", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_roue_de_sac_fixed_6_couleurs_roue",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    text: "Combien y a-t-il de couleurs différentes sur cette roue ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Compte les couleurs des parties.",
    explanation: exp(
      "On observe la roue pour compter les couleurs.",
      "On repère chaque couleur différente.",
      "Il y a rouge, bleu, vert et jaune.",
      "Il y a 4 couleurs différentes."
    ),
    tags: ["cm1", "probabilite", "roue", "short", "canvas"],
    canvas: roueSimpleCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_roue_de_sac_fixed_7_faces_de",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 1,
    theme: "neutral",
    text: "Combien de faces a un dé classique ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Compte les faces : 1, 2, 3…",
    explanation: exp(
      "Un dé classique a des faces numérotées.",
      "On compte les faces du dé.",
      "Les faces sont 1, 2, 3, 4, 5 et 6.",
      "Un dé classique a 6 faces."
    ),
    tags: ["cm1", "probabilite", "de", "short", "canvas"],
    canvas: deCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_roue_de_sac_fixed_8_vertes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    text: "Dans ce sac, combien y a-t-il de billes vertes ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Compte les billes avec la lettre V.",
    explanation: exp(
      "Pour raisonner avec un sac, on compte les objets demandés.",
      "On repère les billes vertes.",
      "Il y a 2 billes vertes.",
      "La réponse est 2."
    ),
    tags: ["cm1", "probabilite", "sac", "billes", "short", "canvas"],
    canvas: billesEquilibreesCanvas(),
  },

  // ============================================================
  // TOP-UP — PROBABILITE_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_probabilite_defi_fixed_4_de_certain",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Avec un dé classique, quel événement est certain ?",
    format: "qcm",
    choices: [
      "obtenir un nombre entre 1 et 6",
      "obtenir 6",
      "obtenir un nombre pair",
      "obtenir 7",
    ],
    expected: ["obtenir un nombre entre 1 et 6"],
    comparator: "mcq_exact",
    hint: "Cherche l’événement qui arrive à chaque lancer.",
    explanation: exp(
      "Un événement certain se produit toujours.",
      "On regarde toutes les faces du dé.",
      "Toutes les faces sont entre 1 et 6.",
      "Obtenir un nombre entre 1 et 6 est certain."
    ),
    tags: ["cm1", "probabilite", "defi", "de", "qcm", "canvas"],
    canvas: deCanvas([1, 2, 3, 4, 5, 6]),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_defi_fixed_5_billes_moins_probable",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Dans ce sac, quelle couleur est la moins probable ?",
    format: "qcm",
    choices: ["vert", "rouge", "bleu", "jaune"],
    expected: ["vert"],
    comparator: "mcq_exact",
    hint: "Cherche la couleur la moins présente.",
    explanation: exp(
      "La couleur la moins probable est celle qui apparaît le moins.",
      "On compte chaque couleur.",
      "Il y a 3 rouges, 2 bleues et 1 verte.",
      "Vert est la couleur la moins probable."
    ),
    tags: ["cm1", "probabilite", "defi", "sac", "qcm", "canvas"],
    canvas: billesCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_defi_fixed_6_roue_comparaison",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Sur cette roue, tomber sur rouge est-il plus probable que tomber sur bleu ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Compare la taille de la partie rouge et de la partie bleue.",
    explanation: exp(
      "Une couleur est plus probable si elle occupe une plus grande partie de la roue.",
      "On compare la part rouge et la part bleue.",
      "Le rouge occupe 3 parts, le bleu 1 part.",
      "Oui, le rouge est plus probable que le bleu."
    ),
    tags: ["cm1", "probabilite", "defi", "roue", "qcm", "canvas"],
    canvas: roueRougeFavoriCanvas(),
  },

  {
    kind: "fixed",
    id: "cm1_probabilite_defi_fixed_7_reunion_letchis",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 3,
    theme: "reunion",
    text: "Un sac contient 4 billes rouges et 1 bille verte. Quelle couleur a le plus de chances d’être tirée ?",
    format: "qcm",
    choices: ["rouge", "vert", "elles ont autant de chances", "noir"],
    expected: ["rouge"],
    comparator: "mcq_exact",
    hint: "Compare le nombre de billes de chaque couleur.",
    explanation: exp(
      "La couleur la plus présente a le plus de chances.",
      "On compte les billes de chaque couleur.",
      "Il y a 4 rouges et 1 verte.",
      "Rouge a le plus de chances d’être tirée."
    ),
    tags: ["cm1", "probabilite", "defi", "reunion", "billes", "qcm", "canvas"],
    canvas: billesVariablesCanvas({ rouges: 4, bleues: 0, vertes: 1 }),
  },

  // ============================================================
  // ⛔ 15/10/2026 — GABARITS AJOUTÉS : chaque étoile servie a ses
  // générateurs (situation × tournure × nombres tirés).
  // ============================================================

  {
    kind: "template",
    id: "cm1_probabilite_vocabulaire_tpl_3_mots_n1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    hint: "Demande-toi : est-ce que cela peut arriver ? Toujours ?",
    tags: ["cm1", "probabilite", "vocabulaire", "template"],
    generate: () => genVocabulaire(1),
  },
  {
    kind: "template",
    id: "cm1_probabilite_vocabulaire_tpl_4_situations_n1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    hint: "Regarde tout ce qui peut sortir.",
    tags: ["cm1", "probabilite", "vocabulaire", "template"],
    generate: () => genVocabulaire(1),
  },
  {
    kind: "template",
    id: "cm1_probabilite_hasard_tpl_2_n1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 1,
    theme: "neutral",
    hint: "Demande-toi si on connaît le résultat à l’avance.",
    tags: ["cm1", "probabilite", "hasard", "template"],
    generate: () => genHasard(1),
  },
  {
    kind: "template",
    id: "cm1_probabilite_hasard_tpl_3_n1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 1,
    theme: "neutral",
    hint: "Avec le hasard, on ne sait pas ce qui va sortir.",
    tags: ["cm1", "probabilite", "hasard", "template"],
    generate: () => genHasard(1),
  },
  {
    kind: "template",
    id: "cm1_probabilite_hasard_tpl_4_n2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_hasard",
    difficulty: 2,
    theme: "neutral",
    hint: "Pour chaque situation : connaît-on le résultat à l’avance ?",
    tags: ["cm1", "probabilite", "hasard", "template"],
    generate: () => genHasard(2),
  },
  {
    kind: "template",
    id: "cm1_probabilite_comparer_tpl_3_n2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte pour chaque couleur, puis compare.",
    tags: ["cm1", "probabilite", "comparer", "template"],
    generate: () => genComparer(2),
  },
  {
    kind: "template",
    id: "cm1_probabilite_comparer_tpl_4_n2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Le plus grand nombre donne le plus de chances.",
    tags: ["cm1", "probabilite", "comparer", "template"],
    generate: () => genComparer(2),
  },
  {
    kind: "template",
    id: "cm1_probabilite_roue_de_sac_tpl_3_n1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 1,
    theme: "neutral",
    hint: "Compte bien chaque objet ou chaque résultat.",
    tags: ["cm1", "probabilite", "roue_de_sac", "template"],
    generate: () => genRoueDeSac(1),
  },
  {
    kind: "template",
    id: "cm1_probabilite_roue_de_sac_tpl_4_n1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 1,
    theme: "neutral",
    hint: "Ajoute les nombres de chaque couleur.",
    tags: ["cm1", "probabilite", "roue_de_sac", "template"],
    generate: () => genRoueDeSac(1),
  },
  {
    kind: "template",
    id: "cm1_probabilite_roue_de_sac_tpl_5_n2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    hint: "Repère les résultats qui font gagner.",
    tags: ["cm1", "probabilite", "roue_de_sac", "template"],
    generate: () => genRoueDeSac(2),
  },
  {
    kind: "template",
    id: "cm1_probabilite_roue_de_sac_tpl_6_n2",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_roue_de_sac",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les cas qui conviennent.",
    tags: ["cm1", "probabilite", "roue_de_sac", "template"],
    generate: () => genRoueDeSac(2),
  },
  {
    kind: "template",
    id: "cm1_probabilite_defi_tpl_3_n3",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Lis bien chaque proposition.",
    tags: ["cm1", "probabilite", "defi", "template"],
    generate: () => genDefi(3),
  },
  {
    kind: "template",
    id: "cm1_probabilite_defi_tpl_4_n3",
    niveau: "cm1",
    matiere: "maths",
    notionId: "probabilite",
    microId: "probabilite_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare avant de répondre.",
    tags: ["cm1", "probabilite", "defi", "template"],
    generate: () => genDefi(3),
  },
];