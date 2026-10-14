// Fractions (5e) — deux notions depuis le 04/08/2026 : fraction_nombre
// (reconnaître, comparer) et fraction_calcul (les quatre opérations).
// ⚠️ C'est le microId de chaque item qui fait foi, PAS le commentaire de
// section au-dessus : les items déplacés sont restés à leur place dans le
// fichier pour garder leur id, et donc l'historique des réponses des élèves.

import type {
  TutorBankItemV4,
  TutorGeneratedQuestionV4,
  FractionCanvasData,
} from "@/lib/tutor-v4/types";
import { PRENOMS, pick, de, type Prenom } from "@/lib/tutor-v4/questionBank/6e/maths/entiers.bank";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const r = x % y;
    x = y;
    y = r;
  }
  return x || 1;
}

function simplifyFraction(n: number, d: number) {
  const sign = d < 0 ? -1 : 1;
  const nn = n * sign;
  const dd = Math.abs(d);
  const g = gcd(nn, dd);
  return { n: nn / g, d: dd / g };
}

function fractionStr(n: number, d: number) {
  return `${n}/${d}`;
}

function equivalentFractionAnswers(n: number, d: number): string[] {
  const simp = simplifyFraction(n, d);
  return Array.from(
    new Set([
      `${simp.n}/${simp.d}`,
      `${n}/${d}`,
    ])
  );
}

function fractionCanvas(
  data: Omit<FractionCanvasData, "kind">
): FractionCanvasData {
  return { kind: "fraction", ...data };
}

function expl(calcul: string) {
  return (
    "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
    "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
    calcul +
    "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse."
  );
}

/* ============================================================================
   GÉNÉRATEURS VARIÉS (09/10/2026) — voir PASSATION-COACH-MATHS-5E-CONSIGNE.md
   Mesuré le 09/10 : 4 à 14 squelettes par micro (« Simplifie $\dfrac{#}{#}$. »
   revenait à l'identique). Chaque gabarit compose maintenant une SITUATION
   (pizza, sentier, potager, livre… ; La Réunion : un contexte parmi seize) ×
   une TOURNURE × des PRÉNOMS. Chaque gabarit a son correcteur :
   correcteurs/fractions.ts (il relit les fractions du TEXTE et refait le calcul).
   Mesure : npx --yes tsx@4 scripts/mesurer-squelettes-coach.ts 5e fraction_nombre fraction_calcul
============================================================================ */

type Genere = TutorGeneratedQuestionV4;
type Fr = [number, number];

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
/** Une fraction écrite telle quelle, dans une formule : \dfrac{3}{4}, -\dfrac{3}{4}. */
const tf = ([n, d]: Fr) => (n < 0 ? `-\\dfrac{${-n}}{${d}}` : `\\dfrac{${n}}{${d}}`);
/** La même, entre dollars. */
const F = (f: Fr) => `$${tf(f)}$`;
/** Ce que l'élève tape : « 3/4 », « -3/4 », « 2 » (dénominateur 1). */
const tape = ([n, d]: Fr) => (d === 1 ? String(n) : `${n}/${d}`);
const irr = ([n, d]: Fr): Fr => {
  const s = simplifyFraction(n, d);
  return [s.n, s.d];
};
const memeValeur = (a: Fr, b: Fr) => a[0] * b[1] === a[1] * b[0];
const il = (p: Prenom) => (p.f ? "elle" : "il");
const ils = (p: Prenom, q: Prenom) => (p.f && q.f ? "elles" : "ils");
function deuxPrenoms(): [Prenom, Prenom] {
  const p = pick(PRENOMS);
  let q = pick(PRENOMS);
  while (q.nom === p.nom) q = pick(PRENOMS);
  return [p, q];
}
const ex = (def: string, meth: string, calc: string, concl: string) =>
  `Définition : ${def}\n\nMéthode : ${meth}\n\nCalcul : ${calc}\n\nConclusion : ${concl}`;
/** Une fraction irréductible n/d, 0 < n < d, dMin ≤ d ≤ dMax. */
function tirerIrr(dMin: number, dMax: number): Fr {
  for (;;) {
    const d = rnd(dMin, dMax);
    const n = rnd(1, d - 1);
    if (gcd(n, d) === 1) return [n, d];
  }
}
/** Tire une tournure : avec la probabilité `pNoms`, une tournure avec prénom (nombreuses), sinon une tournure courte. */
function tournure<T>(courtes: T[], avecNoms: T[], pNoms = 0.7): T {
  return Math.random() < pNoms ? pick(avecNoms) : pick(courtes);
}
/** QCM : la bonne réponse et des pièges de VALEUR différente (deux écritures du même nombre seraient deux bonnes réponses). */
function qcmFractions(bonne: Fr, pieges: Fr[]): { choices: string[]; expected: string[] } {
  const vus: Fr[] = [bonne];
  for (const p of pieges) {
    if (vus.length >= 4) break;
    if (p[1] <= 1 || p[0] <= 0 || !Number.isInteger(p[0]) || !Number.isInteger(p[1])) continue;
    if (vus.some((v) => memeValeur(v, p))) continue;
    vus.push(p);
  }
  // ⚠️ pas (a + k)/(b + 2k) : pour a/b = 1/2, elles valent toutes 1/2 (boucle sans fin).
  for (let k = 1; vus.length < 4; k++) {
    const p: Fr = [bonne[0] + k, bonne[1] + k + 1];
    if (!vus.some((v) => memeValeur(v, p))) vus.push(p);
  }
  return { choices: shuffle(vus.map(tape)), expected: [tape(bonne)] };
}

/** Un « tout » qu'on partage : ce qu'on en fait, et comment le nommer. */
type Tout = { un: string; autre: string; le: string; pp: string; inf: string };
const TOUTS: Tout[] = [
  { un: "d’une pizza", autre: "d’une pizza identique", le: "de la pizza", pp: "mangé", inf: "manger" },
  { un: "d’une tarte aux pommes", autre: "d’une tarte identique", le: "de la tarte", pp: "mangé", inf: "manger" },
  { un: "d’une tablette de chocolat", autre: "d’une tablette identique", le: "de la tablette", pp: "mangé", inf: "manger" },
  { un: "d’un gâteau", autre: "d’un gâteau identique", le: "du gâteau", pp: "mangé", inf: "manger" },
  { un: "d’un roman", autre: "du même roman", le: "du roman", pp: "lu", inf: "lire" },
  { un: "d’un sentier de randonnée", autre: "du même sentier", le: "du sentier", pp: "parcouru", inf: "parcourir" },
  { un: "d’une piste cyclable", autre: "de la même piste", le: "de la piste", pp: "parcouru", inf: "parcourir" },
  { un: "d’un potager", autre: "d’un potager identique", le: "du potager", pp: "bêché", inf: "bêcher" },
  { un: "d’un mur", autre: "d’un mur identique", le: "du mur", pp: "peint", inf: "peindre" },
  { un: "d’un puzzle", autre: "d’un puzzle identique", le: "du puzzle", pp: "assemblé", inf: "assembler" },
  { un: "d’une bouteille de jus", autre: "d’une bouteille identique", le: "de la bouteille", pp: "bu", inf: "boire" },
  { un: "d’une pelouse", autre: "d’une pelouse identique", le: "de la pelouse", pp: "tondu", inf: "tondre" },
  { un: "d’un film", autre: "du même film", le: "du film", pp: "regardé", inf: "regarder" },
  { un: "d’un album de musique", autre: "du même album", le: "de l’album", pp: "écouté", inf: "écouter" },
  { un: "d’une course d’orientation", autre: "de la même course", le: "de la course", pp: "parcouru", inf: "parcourir" },
  { un: "du sentier du piton des Neiges", autre: "du même sentier", le: "du sentier", pp: "parcouru", inf: "parcourir" },
];
/** Deux moments d'une journée, d'une semaine. */
const MOMENTS: [string, string][] = [
  ["le matin", "l’après-midi"],
  ["samedi", "dimanche"],
  ["lundi", "mardi"],
  ["avant le déjeuner", "après le déjeuner"],
  ["la première heure", "la deuxième heure"],
  ["mercredi", "jeudi"],
];
const Maj = (s: string) => s[0].toUpperCase() + s.slice(1);
/** Participe accordé au féminin (« Quelle fraction … a-t-il mangée ? »). */
const fem = (pp: string) => (pp === "peint" ? "peinte" : `${pp}e`);

/* ── FRACTION_EGALE ─────────────────────────────────────────────────────── */

/** Deux fractions, égales ou non (pièges : ajouter le même nombre, coefficients différents). */
function paireEgale(star: 1 | 2 | 3): { a: Fr; b: Fr; egal: boolean } {
  const base = tirerIrr(2, star === 1 ? 6 : 9);
  const [n, d] = base;
  let a: Fr;
  let b: Fr;
  if (star === 3) {
    const k1 = rnd(2, 4);
    let k2 = rnd(2, 5);
    while (k2 === k1) k2 = rnd(2, 5);
    a = [n * k1, d * k1];
    b = Math.random() < 0.5 ? [n * k2, d * k2] : Math.random() < 0.5 ? [n * k2 + 1, d * k2] : [n * k2, d * k2 + 1];
  } else {
    const k = star === 1 ? rnd(2, 3) : rnd(2, 6);
    a = base;
    const piege = rnd(0, 2);
    b = Math.random() < 0.5 ? [n * k, d * k] : piege === 0 ? [n + k, d + k] : piege === 1 ? [n * k, d * k + 1] : [n * k, d * (k + 1)];
  }
  if (Math.random() < 0.3) [a, b] = [b, a];
  return { a, b, egal: memeValeur(a, b) };
}

function genEgaleOuiNon(star: 1 | 2 | 3, avecFigure = false): Genere {
  const { a, b, egal } = paireEgale(star);
  const A = F(a);
  const B = F(b);
  const [p, q] = deuxPrenoms();
  const t = pick(TOUTS);
  const on = (s: string) => ({ s, oui: "oui", non: "non" });
  const vf = (s: string) => ({ s, oui: "vrai", non: "faux" });
  const f = tournure(
    [
      on(`${A} et ${B} sont-elles égales ?`),
      on(`Les fractions ${A} et ${B} représentent-elles la même quantité ?`),
      on(`${A} et ${B} sont-elles deux écritures du même nombre ?`),
      on(`Peut-on écrire $${tf(a)} = ${tf(b)}$ ?`),
      vf(`Vrai ou faux : $${tf(a)} = ${tf(b)}$.`),
      vf(`Vrai ou faux : les fractions ${A} et ${B} sont égales.`),
    ],
    [
      on(`${p.nom} affirme que ${A} est égale à ${B}. A-t-${il(p)} raison ?`),
      on(`${p.nom} a ${t.pp} ${A} ${t.un}. ${q.nom} a ${t.pp} ${B} ${t.autre}. ${p.nom} et ${q.nom} en ont-${ils(p, q)} ${t.pp} autant ?`),
      on(`${p.nom} et ${q.nom} cherchent une fraction égale à ${A}. ${q.nom} propose ${B}. A-t-${il(q)} raison ?`),
      vf(`${p.nom} écrit au tableau : $${tf(a)} = ${tf(b)}$. Vrai ou faux ?`),
      on(`Pour représenter ${A}, ${p.nom} colorie ${b[0]} cases sur ${b[1]}. Sa figure représente-t-elle bien ${A} ?`),
    ],
  );
  const D = a[1] * b[1];
  const rep = egal ? f.oui : f.non;
  return {
    text: avecFigure ? `${f.s} Aide-toi de la figure.` : f.s,
    format: "qcm",
    choices: [f.oui, f.non],
    expected: [rep],
    comparator: "mcq_exact",
    explanation: ex(
      "deux fractions sont égales quand elles représentent le même nombre.",
      "on les écrit avec le même dénominateur, puis on compare les numérateurs.",
      `${tape(a)} = ${a[0] * b[1]}/${D} et ${tape(b)} = ${b[0] * a[1]}/${D}.`,
      egal ? `les numérateurs sont égaux : les fractions sont égales, la réponse est « ${rep} ».` : `les numérateurs sont différents : les fractions ne sont pas égales, la réponse est « ${rep} ».`,
    ),
    ...(avecFigure
      ? {
          canvas: fractionCanvas({
            model: "compare",
            fractions: [
              { numerator: a[0], denominator: a[1], label: tape(a) },
              { numerator: b[0], denominator: b[1], label: tape(b) },
            ],
          }),
        }
      : {}),
  };
}

function genEgaleCompleter(star: 1 | 2 | 3): Genere {
  const [n, d] = tirerIrr(2, star === 1 ? 6 : 9);
  const k1 = star === 3 ? rnd(2, 4) : 1;
  let k2 = star === 1 ? rnd(2, 3) : rnd(2, 6);
  while (k2 === k1) k2 = rnd(2, 6);
  const de1: Fr = [n * k1, d * k1];
  const vers: Fr = [n * k2, d * k2];
  const num = Math.random() < 0.6;
  const eq = num ? `$${tf(de1)} = \\dfrac{?}{${vers[1]}}$` : `$${tf(de1)} = \\dfrac{${vers[0]}}{?}$`;
  const rep = num ? vers[0] : vers[1];
  const [p] = deuxPrenoms();
  const s = tournure(
    [
      `Complète : ${eq}.`,
      `Quel nombre remplace le point d’interrogation : ${eq} ?`,
      `Trouve le nombre manquant : ${eq}.`,
      `Pour que l’égalité ${eq} soit vraie, quel nombre faut-il écrire à la place de « ? » ?`,
      `Quel ${num ? "numérateur" : "dénominateur"} manque dans l’égalité ${eq} ?`,
    ],
    [
      `${p.nom} doit compléter l’égalité ${eq}. Quel nombre doit-${il(p)} écrire ?`,
      `Au tableau, ${p.nom} écrit ${eq}. Par quel nombre faut-il remplacer « ? » ?`,
      `${p.nom} veut écrire ${F(de1)} avec ${num ? `le dénominateur ${vers[1]}` : `le numérateur ${vers[0]}`} : ${eq}. Quel nombre manque ?`,
      `Dans son cahier, ${p.nom} a effacé un nombre : ${eq}. Quel nombre a-t-${il(p)} effacé ?`,
    ],
    0.6,
  );
  return {
    text: s,
    format: "short",
    expected: [String(rep)],
    comparator: "number_equal",
    explanation: ex(
      "on obtient une fraction égale en multipliant (ou en divisant) le numérateur et le dénominateur par le même nombre.",
      k1 === 1
        ? `on cherche par combien on a multiplié le ${num ? "dénominateur" : "numérateur"}, puis on multiplie l’autre nombre par le même.`
        : "on simplifie d’abord la fraction, puis on la multiplie en haut et en bas par le même nombre.",
      k1 === 1
        ? num
          ? `${d} × ${k2} = ${vers[1]}, donc ${n} × ${k2} = ${rep}.`
          : `${n} × ${k2} = ${vers[0]}, donc ${d} × ${k2} = ${rep}.`
        : `${tape(de1)} = ${tape([n, d])} (on divise par ${k1}), puis ${tape([n, d])} = ${tape(vers)} (on multiplie par ${k2}).`,
      `le nombre manquant est ${rep}.`,
    ),
  };
}

function genEgaleQcm(star: 1 | 2 | 3): Genere {
  const base = tirerIrr(2, star === 1 ? 6 : 9);
  const [n, d] = base;
  const k0 = star === 3 ? rnd(2, 3) : 1;
  const montre: Fr = [n * k0, d * k0];
  let k = star === 1 ? rnd(2, 3) : rnd(2, 5);
  while (k === k0) k = rnd(2, 5);
  const bonne: Fr = [n * k, d * k];
  const { choices, expected } = qcmFractions(bonne, [
    [n + k, d + k],
    [n * k, d + k],
    [d, n],
    [n * k, d],
    [n + 1, d * k],
    [n * k + 1, d * k],
  ]);
  const A = F(montre);
  const [p] = deuxPrenoms();
  const t = pick(TOUTS);
  const s = tournure(
    [
      `Quelle fraction est égale à ${A} ?`,
      `Parmi ces fractions, laquelle est égale à ${A} ?`,
      `Quelle fraction représente le même nombre que ${A} ?`,
      `Quelle écriture est une autre façon d’écrire ${A} ?`,
    ],
    [
      `${p.nom} a ${t.pp} ${A} ${t.un}. Quelle autre fraction ${t.le} représente la même part ?`,
      `${p.nom} cherche une fraction égale à ${A}. Laquelle doit-${il(p)} choisir ?`,
      `Pour une recette, ${p.nom} utilise ${A} d’un litre de lait. Quelle fraction de litre est la même quantité ?`,
      `${p.nom} doit entourer la fraction égale à ${A}. Laquelle ?`,
    ],
    0.6,
  );
  return {
    text: s,
    format: "qcm",
    choices,
    expected,
    comparator: "mcq_exact",
    explanation: ex(
      "on obtient une fraction égale en multipliant le numérateur et le dénominateur par le même nombre.",
      "on cherche la proposition obtenue avec le même multiplicateur en haut et en bas.",
      `${k0 > 1 ? `${tape(montre)} = ${tape(base)} (on divise par ${k0}) ; ` : ""}${n} × ${k} = ${n * k} et ${d} × ${k} = ${d * k}, donc ${tape(base)} = ${tape(bonne)}.`,
      `la fraction égale à ${tape(montre)} est ${tape(bonne)}.`,
    ),
  };
}

function genEgale(star: 1 | 2 | 3): Genere {
  const r = Math.random();
  return r < 0.4 ? genEgaleOuiNon(star) : r < 0.7 ? genEgaleCompleter(star) : genEgaleQcm(star);
}

/* ── FRACTION_SIMPLIFIER ────────────────────────────────────────────────── */

/** Des collections d'objets : « N … sur D … » (la part est toujours plus petite que le tout). */
const COLLECTIONS: ((p: Prenom, n: number, d: number) => string)[] = [
  (p, n, d) => `Dans la classe ${de(p.nom)}, ${n} élèves sur ${d} font du judo. Quelle fraction des élèves fait du judo ?`,
  (p, n, d) => `${p.nom} a ${d} billes, dont ${n} sont bleues. Quelle fraction de ses billes est bleue ?`,
  (p, n, d) => `Dans la bibliothèque ${de(p.nom)}, ${n} livres sur ${d} sont des bandes dessinées. Quelle fraction des livres cela représente-t-il ?`,
  (p, n, d) => `Au club de foot ${de(p.nom)}, ${n} joueurs sur ${d} sont gauchers. Quelle fraction des joueurs est gauchère ?`,
  (p, n, d) => `${p.nom} a pris ${d} photos pendant les vacances, dont ${n} à la plage. Quelle fraction des photos a été prise à la plage ?`,
  (p, n, d) => `Dans l’aquarium ${de(p.nom)}, ${n} poissons sur ${d} sont rouges. Quelle fraction des poissons est rouge ?`,
  (p, n, d) => `${p.nom} a ${d} cartes de collection, dont ${n} sont rares. Quelle fraction de ses cartes est rare ?`,
  (p, n, d) => `Sur les ${d} chansons de sa playlist, ${p.nom} en connaît ${n} par cœur. Quelle fraction des chansons connaît-${il(p)} par cœur ?`,
  (p, n, d) => `Pendant ${d} jours de vacances, ${p.nom} a eu ${n} jours de soleil. Quelle fraction des jours a été ensoleillée ?`,
  (p, n, d) => `Dans le verger ${de(p.nom)}, ${n} arbres sur ${d} sont des pommiers. Quelle fraction des arbres sont des pommiers ?`,
  (p, n, d) => `${p.nom} a répondu juste à ${n} questions sur ${d} au quiz de sciences. Quelle fraction des questions a-t-${il(p)} réussie ?`,
  (p, n, d) => `Sur ${d} graines plantées par ${p.nom}, ${n} ont germé. Quelle fraction des graines a germé ?`,
];
/** Une collection plausible pour ce total : une classe, un club ou un quiz ne comptent pas 90 personnes. */
function collection(p: Prenom, n: number, d: number): string {
  const petits = new Set([0, 3, 10]);
  const ok = COLLECTIONS.filter((_, i) => d <= 32 || !petits.has(i));
  return pick(ok)(p, n, d);
}

function tirerASimplifier(star: 1 | 2 | 3, propre = false): { base: Fr; k: number; montre: Fr } {
  let base = tirerIrr(2, star === 1 ? 7 : 9);
  if (star >= 2 && !propre && base[0] > 1 && Math.random() < 0.25) base = [base[1], base[0]];
  const k = star === 1 ? pick([2, 3, 5]) : star === 2 ? rnd(2, 6) : pick([4, 6, 8, 9, 10, 12]);
  return { base, k, montre: [base[0] * k, base[1] * k] };
}

function explSimplifier(montre: Fr, base: Fr, k: number) {
  return ex(
    "simplifier une fraction, c’est écrire une fraction égale avec des nombres plus petits ; elle est irréductible quand on ne peut plus la simplifier.",
    `on divise le numérateur et le dénominateur par le même nombre, ici ${k} (le plus grand diviseur commun de ${montre[0]} et ${montre[1]}).`,
    `${montre[0]} ÷ ${k} = ${base[0]} et ${montre[1]} ÷ ${k} = ${base[1]}, donc ${tape(montre)} = ${tape(base)}.`,
    `la forme irréductible est ${tape(base)}.`,
  );
}

const CONSIGNES_SIMPLIFIER = (A: string) => [
  `Simplifie ${A} le plus possible.`,
  `Écris ${A} sous forme irréductible.`,
  `Quelle est la forme irréductible de ${A} ?`,
  `Rends la fraction ${A} irréductible.`,
  `Donne la fraction irréductible égale à ${A}.`,
  `Simplifie au maximum la fraction ${A}.`,
  `${A} : écris cette fraction sous forme irréductible.`,
  `Simplifie la fraction ${A} jusqu’à obtenir une fraction irréductible.`,
  `Quelle fraction irréductible est égale à ${A} ?`,
  `Trouve la forme irréductible de la fraction ${A}.`,
  `Simplifie ${A} : donne une fraction irréductible.`,
  `Réduis ${A} à une fraction irréductible.`,
];

function genSimplifier(star: 1 | 2 | 3, mode: "court" | "qcm"): Genere {
  const situation = Math.random() < 0.75;
  const { base, k, montre } = tirerASimplifier(star, situation);
  const A = F(montre);
  const p = pick(PRENOMS);
  const t = pick(TOUTS);
  let text: string;
  if (!situation) text = pick(CONSIGNES_SIMPLIFIER(A));
  else if (Math.random() < 0.6) text = `${collection(p, montre[0], montre[1])} Donne-la sous forme irréductible.`;
  else
    text = pick([
      `${p.nom} a ${t.pp} ${A} ${t.un}. Écris cette fraction sous forme irréductible.`,
      `${p.nom} doit simplifier ${A} le plus possible. Quel résultat doit-${il(p)} trouver ?`,
      `Au tableau, ${p.nom} écrit ${A}. Quelle est la forme irréductible de cette fraction ?`,
    ]);
  if (mode === "qcm") {
    const [n, d] = base;
    const { choices, expected } = qcmFractions(base, [
      [n + 1, d],
      [d, n],
      [n, d + 1],
      [montre[0] - k, montre[1] - k],
      [n + 1, d + 1],
      [n, d * 2 + 1],
    ]);
    return { text, format: "qcm", choices, expected, comparator: "mcq_exact", explanation: explSimplifier(montre, base, k) };
  }
  return {
    text,
    format: "short",
    expected: [tape(base)],
    // la consigne exige la forme irréductible : `fraction_decimal_equivalent` acceptait « 6/8 » pour « 3/4 ».
    comparator: "exact_text",
    explanation: explSimplifier(montre, base, k),
  };
}

/** Avec la figure : une barre partagée en D parts, N coloriées. */
function genSimplifierFigure(): Genere {
  let s = tirerASimplifier(2, true);
  while (s.montre[1] > 24) s = tirerASimplifier(2, true);
  const { base, k, montre } = s;
  const [N, D] = montre;
  const p = pick(PRENOMS);
  const text = pick([
    `La barre est partagée en ${D} parts égales ; ${N} sont coloriées. Écris la fraction coloriée sous forme irréductible.`,
    `${p.nom} a colorié ${N} parts sur les ${D} parts égales de la barre. Quelle fraction irréductible de la barre a-t-${il(p)} coloriée ?`,
    `Sur la figure, ${N} parts sur ${D} sont coloriées. Simplifie le plus possible la fraction coloriée.`,
    `${p.nom} affirme que la partie coloriée vaut ${N} parts sur ${D}. Écris cette fraction sous forme irréductible.`,
  ]);
  return {
    text,
    format: "short",
    expected: [tape(base)],
    comparator: "exact_text",
    explanation: explSimplifier(montre, base, k),
    canvas: fractionCanvas({ model: "bar", fraction: { numerator: N, denominator: D, label: `${N}/${D}` } }),
  };
}

/** ★3 : par quel nombre diviser pour simplifier en une seule étape ? */
function genSimplifierDiviseur(): Genere {
  const { base, k, montre } = tirerASimplifier(3);
  const A = F(montre);
  const p = pick(PRENOMS);
  const text = pick([
    `Par quel nombre faut-il diviser le numérateur et le dénominateur de ${A} pour la rendre irréductible en une seule étape ?`,
    `${p.nom} veut simplifier ${A} en une seule division. Par quel nombre doit-${il(p)} diviser ?`,
    `Pour rendre ${A} irréductible d’un seul coup, par quel nombre divise-t-on ${montre[0]} et ${montre[1]} ?`,
    `Quel est le plus grand nombre qui divise à la fois ${montre[0]} et ${montre[1]} ?`,
  ]);
  return {
    text,
    format: "short",
    expected: [String(k)],
    comparator: "number_equal",
    explanation: explSimplifier(montre, base, k),
  };
}

/* ── FRACTION_RATIONNEL (le quotient a/b) ───────────────────────────────── */

/** a ÷ b avec a et b premiers entre eux, a pas multiple de b. */
function tirerQuotient(aMax: number, bMax: number): Fr {
  for (;;) {
    const a = rnd(1, aMax);
    const b = rnd(2, bMax);
    if (gcd(a, b) === 1) return [a, b];
  }
}

/** Partages équitables : a … entre b (chacun reçoit a/b). */
const PARTAGES: ((p: Prenom, a: number, b: number) => string)[] = [
  (p, a, b) => `${p.nom} partage équitablement ${a} pizza${a > 1 ? "s" : ""} entre ${b} amis. Quelle fraction de pizza reçoit chaque ami ?`,
  (p, a, b) => `${p.nom} partage ${a} tarte${a > 1 ? "s" : ""} en ${b} parts égales pour ${b} invités. Quelle fraction de tarte reçoit chaque invité ?`,
  (p, a, b) => `${p.nom} verse ${a} litre${a > 1 ? "s" : ""} de jus de pomme dans ${b} gourdes, autant dans chacune. Quelle fraction de litre y a-t-il dans chaque gourde ?`,
  (p, a, b) => `${p.nom} coupe un ruban de ${a} mètre${a > 1 ? "s" : ""} en ${b} morceaux de même longueur. Quelle fraction de mètre mesure chaque morceau ?`,
  (p, a, b) => `${p.nom} partage ${a} tablette${a > 1 ? "s" : ""} de chocolat entre ${b} enfants, à parts égales. Quelle fraction de tablette reçoit chaque enfant ?`,
  (p, a, b) => `Une randonnée de ${a} kilomètre${a > 1 ? "s" : ""} est découpée en ${b} étapes de même longueur. Quelle fraction de kilomètre mesure chaque étape de ${p.nom} ?`,
  (p, a, b) => `${p.nom} répartit ${a} kilogramme${a > 1 ? "s" : ""} de pâte à modeler en ${b} boules identiques. Quelle fraction de kilogramme pèse chaque boule ?`,
  (p, a, b) => `${p.nom} partage ${a} heure${a > 1 ? "s" : ""} de jeu entre ${b} parties de même durée. Quelle fraction d’heure dure chaque partie ?`,
];

function explQuotient(a: number, b: number) {
  return ex(
    `le quotient de ${a} par ${b} est le nombre qui, multiplié par ${b}, donne ${a} ; il s’écrit ${a}/${b}.`,
    "la fraction a/b est le résultat du partage de a en b parts égales : a ÷ b = a/b.",
    `${a} ÷ ${b} = ${a}/${b}, car ${b} × ${a}/${b} = ${a}.`,
    `la réponse est ${a}/${b}.`,
  );
}

/** ★1-★2 : écrire un quotient (ou un partage) sous forme de fraction. */
function genQuotient(star: 1 | 2): Genere {
  const situation = Math.random() < 0.75;
  // un partage plausible : au plus 9 objets, moins de deux par personne
  const [a, b] = situation ? tirerQuotient(9, 9) : star === 1 ? tirerQuotient(9, 9) : tirerQuotient(15, 12);
  const p = pick(PRENOMS);
  const courtes = [
    `Écris le quotient de ${a} par ${b} sous forme de fraction.`,
    `Écris ${a} ÷ ${b} sous forme de fraction.`,
    `Quelle fraction est égale au quotient ${a} ÷ ${b} ?`,
    `Le résultat de ${a} ÷ ${b} s’écrit avec une fraction. Laquelle ?`,
    `Comment s’écrit le quotient de ${a} par ${b} avec une fraction ?`,
    `Quelle fraction représente ${a} ÷ ${b} ?`,
    `Écris sous forme de fraction le résultat de ${a} ÷ ${b}.`,
    `Complète : ${b} × … = ${a}. Écris le nombre manquant sous forme de fraction.`,
    `Quel nombre, multiplié par ${b}, donne ${a} ? Écris-le sous forme de fraction.`,
  ];
  const avecNoms = [
    (pp: Prenom) => pick(PARTAGES)(pp, a, b),
    (pp: Prenom) => pick(PARTAGES)(pp, a, b),
    (pp: Prenom) => pick(PARTAGES)(pp, a, b),
    (pp: Prenom) => `${pp.nom} cherche le nombre qui, multiplié par ${b}, donne ${a}. Écris ce nombre sous forme de fraction.`,
    (pp: Prenom) => `Au tableau, ${pp.nom} doit écrire ${a} ÷ ${b} sous forme de fraction. Qu’écrit-${il(pp)} ?`,
  ];
  let text = situation ? pick(avecNoms)(p) : pick(courtes);
  // moins de deux objets par personne dans un partage (pas 9 litres dans 2 gourdes)
  if (situation && a >= 2 * b) text = `${p.nom} doit écrire le quotient de ${a} par ${b} sous forme de fraction. Qu’écrit-${il(p)} ?`;
  if (Math.random() < 0.35) {
    const { choices, expected } = qcmFractions([a, b], [[b, a], [a, a + b], [a + b, b], [a * b, b + 1], [a + 1, b]]);
    return { text, format: "qcm", choices, expected, comparator: "mcq_exact", explanation: explQuotient(a, b) };
  }
  return { text, format: "short", expected: [`${a}/${b}`], comparator: "exact_text", explanation: explQuotient(a, b) };
}

/** Écriture décimale d'une fraction (dénominateurs 2, 4, 5, 8, 10, 20, 25). */
const virgule = (v: number) => String(Math.round(v * 10000) / 10000).replace(".", ",");
function genEcritureDecimale(): Genere {
  let a: number;
  let b: number;
  do {
    b = pick([2, 4, 5, 8, 10, 20, 25]);
    a = rnd(1, 3 * b);
  } while (gcd(a, b) !== 1 || a % b === 0);
  const A = F([a, b]);
  const p = pick(PRENOMS);
  const text = tournure(
    [
      `Quelle est l’écriture décimale de ${A} ?`,
      `Écris ${A} sous forme d’un nombre décimal.`,
      `Calcule ${a} ÷ ${b} et donne le résultat en écriture décimale.`,
      `Donne la valeur décimale du quotient ${A}.`,
    ],
    [
      `${p.nom} veut écrire ${A} avec une virgule. Quel nombre décimal doit-${il(p)} écrire ?`,
      `Sur sa calculatrice, ${p.nom} tape ${a} ÷ ${b}. Quel nombre s’affiche ?`,
      // une mesure : deux décimales au plus (pas de huitièmes)
      b === 8
        ? `${p.nom} doit écrire ${A} avec une virgule. Quel nombre trouve-t-${il(p)} ?`
        : `${p.nom} a parcouru ${A} de kilomètre. Écris cette distance en kilomètre, avec un nombre décimal.`,
    ],
    0.5,
  );
  const v = a / b;
  return {
    text,
    format: "short",
    expected: [/kilomètre/.test(text) ? `${virgule(v)} km` : virgule(v)],
    comparator: "number_equal",
    explanation: ex(
      `la fraction ${a}/${b} est le quotient ${a} ÷ ${b}.`,
      "on effectue la division (ou on écrit une fraction égale de dénominateur 10, 100 ou 1 000).",
      `${a} ÷ ${b} = ${virgule(v)}.`,
      `${a}/${b} = ${virgule(v)}.`,
    ),
  };
}

/** ★3 : d'un nombre décimal à la fraction irréductible (0,35 = 35/100 = 7/20). */
function genDecimalVersFraction(): Genere {
  let n: number;
  let d: number;
  do {
    d = pick([10, 100]);
    n = rnd(1, d - 1);
  } while (gcd(n, d) === 1);
  const v = n / d;
  const [rn, rd] = irr([n, d]);
  const p = pick(PRENOMS);
  const D = virgule(v);
  const text = tournure(
    [
      `Écris ${D} sous forme de fraction irréductible.`,
      `Quelle fraction irréductible est égale à ${D} ?`,
      `Écris le nombre ${D} sous la forme d’une fraction, puis simplifie-la le plus possible.`,
    ],
    [
      `${p.nom} a bu ${D} litre de lait. Écris cette quantité sous forme de fraction irréductible de litre.`,
      `La gourde ${de(p.nom)} contient ${D} litre d’eau. Quelle fraction irréductible de litre cela représente-t-il ?`,
      `${p.nom} a couru ${D} kilomètre. Écris cette distance sous forme de fraction irréductible de kilomètre.`,
    ],
    0.5,
  );
  return {
    text,
    format: "short",
    expected: [`${rn}/${rd}`],
    comparator: "exact_text",
    explanation: ex(
      "un nombre décimal s’écrit comme une fraction de dénominateur 10, 100 ou 1 000.",
      "on écrit la fraction décimale, puis on la simplifie le plus possible.",
      `${D} = ${n}/${d} = ${rn}/${rd}.`,
      `la fraction irréductible est ${rn}/${rd}.`,
    ),
  };
}

/** ★3 : entre quels entiers consécutifs se trouve a/b ? */
function genEntreEntiers(): Genere {
  let a: number;
  let b: number;
  do {
    b = rnd(2, 9);
    a = rnd(b + 1, 9 * b);
  } while (gcd(a, b) !== 1);
  const e = Math.floor(a / b);
  const A = F([a, b]);
  const p = pick(PRENOMS);
  const text = tournure(
    [
      `Entre quels nombres entiers consécutifs se trouve ${A} ?`,
      `Le quotient ${A} est compris entre deux entiers qui se suivent. Lesquels ?`,
      `Encadre ${A} entre deux nombres entiers consécutifs.`,
      `Quels entiers consécutifs encadrent ${A} ?`,
      `${A} se situe entre deux entiers consécutifs. Lesquels ?`,
    ],
    [
      `${p.nom} a parcouru ${A} de kilomètre à vélo. Entre combien de kilomètres entiers se trouve cette distance ?`,
      `${p.nom} place ${A} sur une droite graduée. Entre quels nombres entiers consécutifs doit-${il(p)} le placer ?`,
      `${p.nom} doit encadrer ${A} entre deux entiers consécutifs. Lesquels ?`,
    ],
    0.6,
  );
  const ch = (k: number) => `entre ${k} et ${k + 1}`;
  const autres = [e - 1, e + 1, e + 2, b - 1, a - 1].filter((k) => k >= 0 && k !== e);
  const choices = shuffle([ch(e), ...Array.from(new Set(autres)).slice(0, 3).map(ch)]);
  return {
    text,
    format: "qcm",
    choices,
    expected: [ch(e)],
    comparator: "mcq_exact",
    explanation: ex(
      `${a}/${b} est le quotient ${a} ÷ ${b}.`,
      `on cherche combien de fois ${b} tient dans ${a}.`,
      `${b} × ${e} = ${b * e} et ${b} × ${e + 1} = ${b * (e + 1)} ; ${b * e} < ${a} < ${b * (e + 1)}.`,
      `${a}/${b} est ${ch(e)}.`,
    ),
  };
}

/** Avec la figure : une grille, des cases coloriées. */
function genGrille(): Genere {
  let rows: number;
  let cols: number;
  let shaded: number;
  do {
    rows = rnd(2, 5);
    cols = rnd(3, 6);
    shaded = rnd(1, rows * cols - 1);
  } while (gcd(shaded, rows * cols) === 1);
  const total = rows * cols;
  const [n, d] = irr([shaded, total]);
  const p = pick(PRENOMS);
  const text = tournure(
    [
      `Quelle fraction de la grille est coloriée ? Donne-la sous forme irréductible.`,
      `Écris la partie coloriée de la grille sous forme de fraction irréductible.`,
      `Compte les cases : quelle fraction irréductible de la grille est coloriée ?`,
    ],
    [
      `${p.nom} a colorié ${shaded} cases de cette grille de ${total} cases. Quelle fraction irréductible de la grille a-t-${il(p)} coloriée ?`,
      `Sur la grille ${de(p.nom)}, ${shaded} cases sur ${total} sont coloriées. Écris cette fraction sous forme irréductible.`,
    ],
    0.5,
  );
  return {
    text,
    format: "short",
    expected: [`${n}/${d}`],
    comparator: "exact_text",
    explanation: ex(
      "la fraction coloriée est le nombre de cases coloriées sur le nombre total de cases.",
      "on compte, puis on simplifie le plus possible.",
      `${shaded} cases sur ${rows} × ${cols} = ${total} : ${shaded}/${total} = ${n}/${d}.`,
      `la partie coloriée est ${n}/${d} de la grille.`,
    ),
    canvas: fractionCanvas({ model: "grid", grid: { rows, cols, shaded } }),
  };
}

function genRationnel(star: 1 | 2 | 3): Genere {
  const r = Math.random();
  if (star === 1) return genQuotient(1);
  if (star === 2) return r < 0.6 ? genQuotient(2) : genEcritureDecimale();
  return r < 0.35 ? genDecimalVersFraction() : r < 0.65 ? genEntreEntiers() : genEcritureDecimale();
}

/* ── FRACTION_COMPARER ──────────────────────────────────────────────────── */

/** ★2 : même dénominateur, même numérateur ; ★3 : un dénominateur multiple de l'autre. */
function paireComparer(star: 2 | 3, egalitePossible: boolean, propres = false): { a: Fr; b: Fr } {
  for (;;) {
    let a: Fr;
    let b: Fr;
    if (star === 2) {
      if (Math.random() < 0.5) {
        const d = rnd(3, 12);
        a = [rnd(1, d + 3), d];
        b = [rnd(1, d + 3), d];
      } else {
        const n = rnd(1, 9);
        a = [n, rnd(2, 12)];
        b = [n, rnd(2, 12)];
      }
    } else {
      const d = rnd(2, 8);
      const k = rnd(2, 4);
      a = [rnd(1, 2 * d), d];
      b = [rnd(1, 2 * d * k), d * k];
      if (Math.random() < 0.5) [a, b] = [b, a];
    }
    if (a[0] === b[0] && a[1] === b[1]) continue;
    if (memeValeur(a, b) && !(egalitePossible && Math.random() < 0.15)) continue;
    if (a[0] % a[1] === 0 || b[0] % b[1] === 0) continue;
    // une part d'une pizza, une figure : jamais plus que le tout
    if (propres && (a[0] >= a[1] || b[0] >= b[1])) continue;
    return { a, b };
  }
}

function explComparer(a: Fr, b: Fr, signe: string) {
  const D = (a[1] * b[1]) / gcd(a[1], b[1]);
  const na = (a[0] * D) / a[1];
  const nb = (b[0] * D) / b[1];
  return ex(
    "pour comparer deux fractions, on les écrit avec le même dénominateur, puis on compare les numérateurs.",
    a[1] === b[1] ? "les dénominateurs sont déjà égaux : on compare les numérateurs." : `on écrit les deux fractions sur ${D}.`,
    a[1] === b[1] ? `${a[0]} et ${b[0]} : ${tape(a)} ${signe} ${tape(b)}.` : `${tape(a)} = ${na}/${D} et ${tape(b)} = ${nb}/${D} ; ${na} et ${nb} donnent ${tape(a)} ${signe} ${tape(b)}.`,
    `${tape(a)} ${signe} ${tape(b)}.`,
  );
}

function genComparer(star: 2 | 3, avecFigure = false): Genere {
  const r = Math.random();
  const [p, q] = deuxPrenoms();
  const t = pick(TOUTS);
  // ★2 : parfois, comparer à 1
  if (star === 2 && !avecFigure && r < 0.15) {
    let a: Fr = tirerIrr(2, 9);
    if (Math.random() < 0.5) a = [a[1] + rnd(1, a[1] - 1), a[1]];
    if (gcd(a[0], a[1]) !== 1) a = [a[1] + 1, a[1]];
    const A = F(a);
    const plus = a[0] > a[1];
    const affirme = Math.random() < 0.4;
    const text = affirme
      ? `${p.nom} affirme que ${A} est plus ${Math.random() < 0.5 ? "grande" : "petite"} que 1. A-t-${il(p)} raison ?`
      : pick([`${A} est-elle plus grande ou plus petite que 1 ?`, `La fraction ${A} est-elle plus grande ou plus petite que 1 ?`, `Compare ${A} à 1 : est-elle plus grande ou plus petite ?`]);
    const choices = affirme ? ["oui", "non"] : ["plus grande que 1", "plus petite que 1"];
    const rep = affirme ? (text.includes("plus grande") === plus ? "oui" : "non") : plus ? choices[0] : choices[1];
    return {
      text,
      format: "qcm",
      choices,
      expected: [rep],
      comparator: "mcq_exact",
      explanation: ex(
        "une fraction est plus grande que 1 quand son numérateur est plus grand que son dénominateur.",
        "on compare le numérateur et le dénominateur.",
        `${a[0]} ${plus ? ">" : "<"} ${a[1]}.`,
        `${tape(a)} est ${plus ? "plus grande" : "plus petite"} que 1.`,
      ),
    };
  }
  const mode = avecFigure ? pick(["signe", "laquelle"] as const) : r < 0.3 ? "signe" : r < 0.45 ? "laquelle" : r < 0.55 ? "vf" : "noms";
  const { a, b } = paireComparer(star, mode === "signe", avecFigure || mode === "noms");
  const A = F(a);
  const B = F(b);
  const va = a[0] / a[1];
  const vb = b[0] / b[1];
  const signe = memeValeur(a, b) ? "=" : va > vb ? ">" : "<";
  let g: Genere;
  if (mode === "signe") {
    const text = pick([
      `Quel signe faut-il écrire entre ${A} et ${B} : <, > ou = ?`,
      `Complète avec <, > ou = : ${A} … ${B}.`,
      `Compare ${A} et ${B} : choisis le bon signe à écrire entre les deux.`,
      `${p.nom} doit écrire le bon signe entre ${A} et ${B}. Lequel ?`,
      `Au tableau, ${p.nom} écrit ${A} … ${B}. Quel signe manque ?`,
      `${p.nom} et ${q.nom} comparent ${A} et ${B}. Quel signe doivent-${ils(p, q)} écrire entre les deux ?`,
    ]);
    g = { text, format: "qcm", choices: ["<", ">", "="], expected: [signe], comparator: "mcq_exact", explanation: explComparer(a, b, signe) };
  } else if (mode === "laquelle") {
    const grande = Math.random() < 0.6;
    const bonne = (va > vb) === grande ? a : b;
    const mot = grande ? "grande" : "petite";
    const text = pick([
      `Quelle est la plus ${mot} fraction : ${A} ou ${B} ?`,
      `Laquelle de ces deux fractions est la plus ${mot} : ${A} ou ${B} ?`,
      `Entre ${A} et ${B}, quelle fraction est la plus ${mot} ?`,
      `${p.nom} hésite entre ${A} et ${B}. Laquelle est la plus ${mot} ?`,
      `${p.nom} doit entourer la plus ${mot} fraction : ${A} ou ${B}. Laquelle ?`,
    ]);
    g = { text, format: "qcm", choices: [tape(a), tape(b)], expected: [tape(bonne)], comparator: "mcq_exact", explanation: explComparer(a, b, signe) };
  } else if (mode === "vf") {
    const s = Math.random() < 0.5 ? "<" : ">";
    const vrai = s === signe;
    const text = pick([`Vrai ou faux : $${tf(a)} ${s} ${tf(b)}$.`, `${p.nom} écrit $${tf(a)} ${s} ${tf(b)}$. Vrai ou faux ?`]);
    g = { text, format: "qcm", choices: ["vrai", "faux"], expected: [vrai ? "vrai" : "faux"], comparator: "mcq_exact", explanation: explComparer(a, b, signe) };
  } else {
    const plus = Math.random() < 0.6;
    const gagnant = (va > vb) === plus ? p : q;
    const text = pick([
      `${p.nom} a ${t.pp} ${A} ${t.un}. ${q.nom} a ${t.pp} ${B} ${t.autre}. Qui en a ${t.pp} le ${plus ? "plus" : "moins"} ?`,
      `${p.nom} a ${t.pp} ${A} ${t.un} et ${q.nom} ${B} ${t.autre}. Qui en a ${t.pp} le ${plus ? "plus" : "moins"} ?`,
    ]);
    g = { text, format: "qcm", choices: [p.nom, q.nom], expected: [gagnant.nom], comparator: "mcq_exact", explanation: explComparer(a, b, signe) };
  }
  if (avecFigure) {
    g.text = `${g.text} Aide-toi de la figure.`;
    g.canvas = fractionCanvas({
      model: "compare",
      fractions: [
        { numerator: a[0], denominator: a[1], label: tape(a) },
        { numerator: b[0], denominator: b[1], label: tape(b) },
      ],
    });
  }
  return g;
}

/* ── FRACTION_OPPOSE ────────────────────────────────────────────────────── */

/** Écriture affichée d'un rationnel signé : « −3/5 » (le vrai signe moins). */
const tapeSigne = (f: Fr) => tape(f).replace(/^-/, "−");
/** Un terme dans une somme : négatif → entre parenthèses. */
const tpar = (f: Fr) => (f[0] < 0 ? `\\left(${tf(f)}\\right)` : tf(f));

function genOppose(star: 1 | 2 | 3): Genere {
  let a: Fr = tirerIrr(2, 9);
  if (Math.random() < 0.3) a = [a[1] + rnd(1, a[1] - 1), a[1]];
  if (gcd(a[0], a[1]) !== 1) a = tirerIrr(2, 9);
  if (star >= 2 && Math.random() < 0.4) a = [-a[0], a[1]];
  const A = F(a);
  const opp: Fr = [-a[0], a[1]];
  const inv: Fr = a[0] < 0 ? [-a[1], -a[0]] : [a[1], a[0]];
  const [p, q] = deuxPrenoms();
  const r = Math.random();
  const explOpp = (rep: Fr) =>
    ex(
      "deux nombres sont opposés quand leur somme est égale à 0 ; sur une droite graduée, ils sont symétriques par rapport à 0.",
      "on change le signe du nombre, sans toucher à la fraction.",
      `${tapeSigne(a)} + (${tapeSigne(opp)}) = 0.`,
      `la réponse est ${tapeSigne(rep)}.`,
    );
  // ★3 : une affirmation à vérifier, l'opposé de l'opposé, ou la somme de deux opposés
  if (star === 3 && r < 0.45) {
    const k = rnd(0, 2);
    if (k === 0) {
      const propose = pick([opp, inv, [-inv[0], inv[1]] as Fr]);
      const juste = memeValeur(propose, opp);
      return {
        text: pick([
          `${p.nom} affirme que l’opposé de ${A} est ${F(propose)}. A-t-${il(p)} raison ?`,
          `Pour ${p.nom}, l’opposé de ${A} est ${F(propose)}. A-t-${il(p)} raison ?`,
        ]),
        format: "qcm",
        choices: ["oui", "non"],
        expected: [juste ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: explOpp(opp),
      };
    }
    if (k === 1)
      return {
        text: pick([`Quel est l’opposé de l’opposé de ${A} ?`, `${p.nom} prend l’opposé de ${A}, puis l’opposé du résultat. Quel nombre obtient-${il(p)} ?`]),
        format: "short",
        expected: [tapeSigne(a)],
        comparator: "fraction_decimal_equivalent",
        explanation: explOpp(a),
      };
    return {
      text: pick([`Calcule $${tf(a)} + ${tpar(opp)}$.`, `${p.nom} calcule $${tf(a)} + ${tpar(opp)}$. Quel résultat trouve-t-${il(p)} ?`, `Que vaut $${tpar(opp)} + ${tf(a)}$ ?`]),
      format: "short",
      expected: ["0"],
      comparator: "number_equal",
      explanation: ex(
        "la somme de deux nombres opposés est égale à 0.",
        `${tapeSigne(a)} et ${tapeSigne(opp)} sont opposés.`,
        `${tapeSigne(a)} + (${tapeSigne(opp)}) = 0.`,
        "le résultat est 0.",
      ),
    };
  }
  const text = tournure(
    [
      `Quel est l’opposé de ${A} ?`,
      `Donne l’opposé de ${A}.`,
      `Écris l’opposé de ${A}.`,
      `Quel nombre est l’opposé de ${A} ?`,
      `Complète : l’opposé de ${A} est …`,
      `Complète : $${tf(a)} + … = 0$.`,
      `Quel nombre faut-il ajouter à ${A} pour obtenir 0 ?`,
      `Trouve le nombre qui, ajouté à ${A}, donne 0.`,
    ],
    [
      `${p.nom} cherche l’opposé de ${A}. Que doit-${il(p)} écrire ?`,
      `Sur une droite graduée, ${p.nom} place ${A}. Quel nombre est placé symétriquement par rapport à 0 ?`,
      `${p.nom} écrit $${tf(a)} + … = 0$. Quel nombre manque ?`,
      `Au tableau, ${p.nom} doit écrire l’opposé de ${A}. Qu’écrit-${il(p)} ?`,
      `${p.nom} et ${q.nom} jouent au jeu des opposés : ${p.nom} dit ${A}. Que doit répondre ${q.nom} ?`,
      `${p.nom} doit trouver le nombre qui, ajouté à ${A}, donne 0. Lequel ?`,
      `Dans l’exercice ${de(p.nom)}, il faut écrire l’opposé de ${A}. Quelle est la bonne réponse ?`,
      `${p.nom} a écrit ${A} sur une étiquette. ${q.nom} doit écrire l’opposé de ce nombre. Qu’écrit-${il(q)} ?`,
    ],
    0.75,
  );
  if (star >= 2 && Math.random() < 0.4) {
    // QCM : l'opposé face à l'inverse (le piège de la classe)
    return {
      text,
      format: "qcm",
      choices: shuffle([opp, inv, [-inv[0], inv[1]] as Fr, a].map(tapeSigne)),
      expected: [tapeSigne(opp)],
      comparator: "mcq_exact",
      explanation: explOpp(opp),
    };
  }
  return { text, format: "short", expected: [tapeSigne(opp)], comparator: "fraction_decimal_equivalent", explanation: explOpp(opp) };
}

/* ── FRACTION_DEFI (raisonner sur les fractions) ────────────────────────── */

/** Des parts d'un même objet : partager en plus de parts donne des parts plus petites. */
const PARTS_UNITE: { un: string; identique: string; de: string }[] = [
  { un: "une pizza", identique: "une pizza identique", de: "de pizza" },
  { un: "un gâteau", identique: "un gâteau identique", de: "de gâteau" },
  { un: "une tablette de chocolat", identique: "une tablette identique", de: "de chocolat" },
  { un: "une baguette", identique: "une baguette identique", de: "de pain" },
  { un: "une tarte", identique: "une tarte identique", de: "de tarte" },
  { un: "une bouteille de jus", identique: "une bouteille identique", de: "de jus" },
  { un: "un ruban", identique: "un ruban identique", de: "de ruban" },
  { un: "une planche de bois", identique: "une planche identique", de: "de bois" },
  { un: "une crêpe géante", identique: "une crêpe identique", de: "de crêpe" },
  { un: "un champ", identique: "un champ identique", de: "de terrain" },
];

function explPlusQue1(f: Fr) {
  return ex(
    "une fraction est plus grande que 1 quand son numérateur est plus grand que son dénominateur, plus petite que 1 sinon.",
    "on compare le numérateur et le dénominateur de chaque fraction.",
    `${tape(f)} : ${f[0]} ${f[0] > f[1] ? ">" : "<"} ${f[1]}.`,
    `la réponse est ${tape(f)}.`,
  );
}

/** ★3 : la seule fraction plus grande (ou plus petite) que 1. */
function genDefiUn(): Genere {
  const plus = Math.random() < 0.6;
  const vus: Fr[] = [];
  const tirer = (grande: boolean): Fr => {
    for (;;) {
      const d = rnd(2, 12);
      const n = grande ? rnd(d + 1, 2 * d + 3) : rnd(1, d - 1);
      const f: Fr = [n, d];
      if (gcd(n, d) === 1 && !vus.some((v) => memeValeur(v, f))) {
        vus.push(f);
        return f;
      }
    }
  };
  const bonne = tirer(plus);
  const autres = [tirer(!plus), tirer(!plus), tirer(!plus)];
  const p = pick(PRENOMS);
  const mot = plus ? "plus grande" : "plus petite";
  const text = tournure(
    [
      `Parmi ces fractions, laquelle est ${mot} que 1 ?`,
      `Une seule de ces fractions est ${mot} que 1. Laquelle ?`,
      `Quelle fraction est ${mot} que 1 ?`,
    ],
    [
      `${p.nom} cherche la fraction ${mot} que 1. Laquelle doit-${il(p)} choisir ?`,
      `Dans le jeu ${de(p.nom)}, il faut trouver la fraction ${mot} que 1. Laquelle ?`,
      `${p.nom} doit entourer la seule fraction ${mot} que 1. Laquelle ?`,
    ],
  );
  return { text, format: "qcm", choices: shuffle([bonne, ...autres].map(tape)), expected: [tape(bonne)], comparator: "mcq_exact", explanation: explPlusQue1(bonne) };
}

/** ★3-★4 : deux objets identiques partagés en a et en b parts : qui a la plus grosse part ? */
function genDefiParts(memeNumerateur: boolean): Genere {
  const [p, q] = deuxPrenoms();
  const o = pick(PARTS_UNITE);
  let a = rnd(2, 12);
  let b = rnd(2, 12);
  while (b === a) b = rnd(2, 12);
  const k = memeNumerateur && Math.min(a, b) >= 3 ? rnd(2, Math.min(a, b) - 1) : 1;
  const grosse = Math.random() < 0.6;
  // la plus grosse quantité : le plus petit dénominateur
  const gagnant = (a < b) === grosse ? p : q;
  const prend = `${p.f && q.f ? "Chacune" : "Chacun"} ${Math.random() < 0.5 ? "prend" : "garde"} ${k === 1 ? "une part" : `${k} parts`}`;
  const Un = o.un[0].toUpperCase() + o.un.slice(1);
  const text = pick([
    `${p.nom} partage ${o.un} en ${a} parts égales. ${q.nom} partage ${o.identique} en ${b} parts égales. ${prend}. Qui a le ${grosse ? "plus" : "moins"} ${o.de} ?`,
    `${p.nom} coupe ${o.un} en ${a} parts égales et ${q.nom} coupe ${o.identique} en ${b} parts égales. ${prend}. Qui en a le ${grosse ? "plus" : "moins"} ?`,
    `${Un} est partagé${o.un.startsWith("une") ? "e" : ""} en ${a} parts égales pour ${p.nom}, et ${o.identique} en ${b} parts égales pour ${q.nom}. ${prend}. Qui a le ${grosse ? "plus" : "moins"} ${o.de} ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: [p.nom, q.nom],
    expected: [gagnant.nom],
    comparator: "mcq_exact",
    explanation: ex(
      "plus on partage un objet en de nombreuses parts égales, plus chaque part est petite.",
      `on compare ${k}/${a} et ${k}/${b} : même numérateur, c’est le plus petit dénominateur qui donne la plus grande fraction.`,
      `${k}/${Math.min(a, b)} > ${k}/${Math.max(a, b)}.`,
      `${gagnant.nom} en a ${grosse ? "le plus" : "le moins"}.`,
    ),
  };
}

/** ★4 : ranger trois fractions de même numérateur (ou unitaires). */
function genDefiRanger(): Genere {
  const n = Math.random() < 0.6 ? 1 : rnd(2, 3);
  const ds = shuffle([2, 3, 4, 5, 6, 7, 8, 9, 10, 12].filter((d) => d > n && gcd(n, d) === 1)).slice(0, 3);
  const fr = ds.map((d) => [n, d] as Fr);
  const croissant = Math.random() < 0.6;
  const trie = [...fr].sort((x, y) => (croissant ? x[0] / x[1] - y[0] / y[1] : y[0] / y[1] - x[0] / x[1]));
  const ecr = (l: Fr[]) => l.map(tape).join(" ; ");
  const choix = new Set<string>([ecr(trie), ecr([...trie].reverse()), ecr([trie[1], trie[0], trie[2]]), ecr([trie[0], trie[2], trie[1]]), ecr(fr)]);
  const choices = shuffle([...choix].slice(0, 4));
  const p = pick(PRENOMS);
  const ordre = croissant ? "de la plus petite à la plus grande" : "de la plus grande à la plus petite";
  const liste = fr.map(F).join(" ; ");
  const text = tournure(
    [`Range ces fractions ${ordre} : ${liste}.`, `Quel est le bon rangement ${ordre} de ${liste} ?`, `Classe ${ordre} : ${liste}.`],
    [
      `${p.nom} doit ranger ${liste} ${ordre}. Quel rangement est juste ?`,
      `Pour son exposé, ${p.nom} range ${liste} ${ordre}. Quel est le bon ordre ?`,
    ],
  );
  return {
    text,
    format: "qcm",
    choices,
    expected: [ecr(trie)],
    comparator: "mcq_exact",
    explanation: ex(
      "quand des fractions ont le même numérateur, la plus grande est celle qui a le plus petit dénominateur.",
      "on range les dénominateurs dans l’ordre inverse.",
      `${ecr([...fr].sort((x, y) => x[0] / x[1] - y[0] / y[1])).replace(/ ; /g, " < ")}.`,
      `le bon rangement est ${ecr(trie)}.`,
    ),
  };
}

/** ★5 : comparer à 1/2, ou deux fractions grâce à 1/2. */
function genDefiDemi(): Genere {
  const [p, q] = deuxPrenoms();
  const t = pick(TOUTS);
  const tirerAutour = (dessus: boolean): Fr => {
    for (;;) {
      const d = rnd(3, 15);
      const n = dessus ? rnd(Math.floor(d / 2) + 1, d - 1) : rnd(1, Math.ceil(d / 2) - 1);
      if (gcd(n, d) === 1 && 2 * n !== d) return [n, d];
    }
  };
  if (Math.random() < 0.45) {
    const dessus = Math.random() < 0.5;
    const f = tirerAutour(dessus);
    const affirme = Math.random() < 0.35;
    const text = affirme
      ? `${p.nom} affirme que ${F(f)} est plus ${Math.random() < 0.5 ? "grande" : "petite"} que la moitié. A-t-${il(p)} raison ?`
      : pick([
          `La fraction ${F(f)} est-elle plus grande ou plus petite que $\\dfrac{1}{2}$ ?`,
          `${p.nom} a ${t.pp} ${F(f)} ${t.un}. Est-ce plus ou moins que la moitié ?`,
          `Compare ${F(f)} à $\\dfrac{1}{2}$ : plus grande ou plus petite ?`,
        ]);
    const situation = text.includes("la moitié ?");
    const choices = affirme ? ["oui", "non"] : situation ? ["plus que la moitié", "moins que la moitié"] : ["plus grande", "plus petite"];
    const rep = affirme ? (text.includes("plus grande") === dessus ? "oui" : "non") : dessus ? choices[0] : choices[1];
    return {
      text,
      format: "qcm",
      choices,
      expected: [rep],
      comparator: "mcq_exact",
      explanation: ex(
        "la moitié d’un nombre de parts : 1/2 = 2/4 = 3/6 = …",
        `on compare le numérateur ${f[0]} à la moitié du dénominateur, ${f[1]} ÷ 2 = ${virgule(f[1] / 2)}.`,
        `${f[0]} ${dessus ? ">" : "<"} ${virgule(f[1] / 2)}.`,
        `${tape(f)} est ${dessus ? "plus grande" : "plus petite"} que 1/2.`,
      ),
    };
  }
  // deux fractions de part et d'autre de 1/2
  const haut = tirerAutour(true);
  let bas = tirerAutour(false);
  // des dénominateurs différents (et non multiples) : sinon ce n'est plus un défi
  while (bas[1] % haut[1] === 0 || haut[1] % bas[1] === 0) bas = tirerAutour(false);
  const [a, b] = Math.random() < 0.5 ? [haut, bas] : [bas, haut];
  const plus = Math.random() < 0.6;
  const gagnant = (a === haut) === plus ? p : q;
  return {
    text: pick([
      `${p.nom} a ${t.pp} ${F(a)} ${t.un}. ${q.nom} a ${t.pp} ${F(b)} ${t.autre}. Qui en a ${t.pp} le ${plus ? "plus" : "moins"} ? (Pense à la moitié.)`,
      `${p.nom} a ${t.pp} ${F(a)} ${t.un} et ${q.nom} ${F(b)} ${t.autre}. Qui en a ${t.pp} le ${plus ? "plus" : "moins"} ?`,
    ]),
    format: "qcm",
    choices: [p.nom, q.nom],
    expected: [gagnant.nom],
    comparator: "mcq_exact",
    explanation: ex(
      "pour comparer deux fractions, on peut les comparer à un repère, ici 1/2.",
      "une fraction est plus grande que 1/2 quand son numérateur dépasse la moitié de son dénominateur.",
      `${tape(haut)} > 1/2 et ${tape(bas)} < 1/2, donc ${tape(haut)} > ${tape(bas)}.`,
      `${gagnant.nom} en a ${t.pp} le ${plus ? "plus" : "moins"}.`,
    ),
  };
}

function genDefiNombre(star: 3 | 4 | 5): Genere {
  const r = Math.random();
  if (star === 3) return r < 0.55 ? genDefiUn() : genDefiParts(false);
  if (star === 4) return r < 0.4 ? genDefiParts(true) : r < 0.75 ? genDefiRanger() : genDefiParts(false);
  return genDefiDemi();
}

/* ── CALCULS (fraction_calcul) : outils communs ─────────────────────────── */

const EXIGE_SIMPLE = /simplifi|irréductible|le plus possible|le plus simplement|au maximum/i;
/** Un numérateur entre 1 et d − 1, premier avec d (la fraction écrite est irréductible). */
function nDe(d: number): number {
  for (;;) {
    const n = rnd(1, d - 1);
    if (gcd(n, d) === 1) return n;
  }
}
/** La réponse d'un calcul : irréductible si la consigne l'exige, sinon la forme brute est aussi acceptée. */
function attenduFraction(text: string, brut: Fr): Pick<Genere, "expected" | "comparator"> {
  const r = irr(brut);
  if (EXIGE_SIMPLE.test(text)) return { expected: [tapeSigne(r)], comparator: "exact_text" };
  return { expected: Array.from(new Set([tapeSigne(r), tapeSigne(brut)])), comparator: "fraction_decimal_equivalent" };
}
const CONSIGNES_CALCUL = (E: string) => [
  `Calcule $${E}$.`,
  `Effectue $${E}$.`,
  `Donne le résultat de $${E}$.`,
  `Que vaut $${E}$ ?`,
  `Écris $${E}$ sous la forme d’une seule fraction.`,
  `Complète : $${E} = \\ldots$`,
];
const FINS_CALCUL = ["", " Simplifie le résultat si possible.", " Donne le résultat sous forme irréductible.", " Écris le résultat le plus simplement possible."];
/** Une consigne de calcul pur, avec ou sans exigence de simplification. */
const consigneCalcul = (E: string) => pick(CONSIGNES_CALCUL(E)) + pick(FINS_CALCUL);
const addF = (x: Fr, y: Fr, s = 1): Fr => [x[0] * y[1] + s * y[0] * x[1], x[1] * y[1]];
/** Somme sur le dénominateur commun le plus simple (le plus grand des deux quand l'un est multiple de l'autre). */
function sommeBrute(termes: Fr[], signes: number[]): Fr {
  const D = termes.reduce((m, f) => (m * f[1]) / gcd(m, f[1]), 1);
  return [termes.reduce((s, f, i) => s + signes[i] * f[0] * (D / f[1]), 0), D];
}
const ecrireSomme = (termes: Fr[], signes: number[]) =>
  termes.map((f, i) => `${i === 0 ? "" : signes[i] > 0 ? " + " : " - "}${f[1] === 1 ? f[0] : tf(f)}`).join("");

/* ── FRACTION_ADDITIONNER ───────────────────────────────────────────────── */

function tirerAddition(star: 2 | 3 | 4, situation: boolean): { termes: Fr[]; signes: number[] } {
  for (;;) {
    let termes: Fr[];
    let signes: number[];
    if (star === 2) {
      const d = rnd(3, 12);
      termes = [[rnd(1, d - 1), d], [rnd(1, d - 1), d]];
      signes = [1, Math.random() < 0.6 ? 1 : -1];
    } else if (star === 3) {
      const d = rnd(2, 6);
      const D = d * rnd(2, 4);
      termes = [[nDe(d), d], [nDe(D), D]];
      if (Math.random() < 0.5) termes.reverse();
      signes = [1, Math.random() < 0.6 ? 1 : -1];
    } else if (situation || Math.random() < 0.6) {
      const d = rnd(2, 5);
      const D = d * rnd(2, 3);
      termes = shuffle([[nDe(d), d] as Fr, [nDe(D), D] as Fr, [nDe(D), D] as Fr]);
      signes = [1, 1, situation || Math.random() < 0.5 ? 1 : -1];
    } else {
      const d = rnd(2, 9);
      termes = Math.random() < 0.5 ? [[rnd(1, 3), 1], [nDe(d), d]] : [[nDe(d), d], [rnd(1, 3), 1]];
      signes = [1, Math.random() < 0.5 ? 1 : -1];
    }
    const r = sommeBrute(termes, signes);
    if (r[0] <= 0) continue;
    if (situation && r[0] > r[1]) continue;
    if (signes.some((s, i) => s < 0 && i > 0 && sommeBrute(termes.slice(0, i + 1), signes.slice(0, i + 1))[0] < 0)) continue;
    return { termes, signes };
  }
}

function explAddition(termes: Fr[], signes: number[]) {
  const brut = sommeBrute(termes, signes);
  const D = brut[1];
  const r = irr(brut);
  const reecrit = termes.map((f, i) => `${i === 0 ? "" : signes[i] > 0 ? " + " : " − "}${(f[0] * D) / f[1]}/${D}`).join("");
  return ex(
    "pour additionner ou soustraire des fractions, il faut le même dénominateur ; on ajoute (ou on soustrait) alors les numérateurs.",
    termes.every((f) => f[1] === D) ? "les dénominateurs sont déjà égaux." : `on écrit chaque nombre avec le dénominateur ${D}.`,
    `${reecrit} = ${tape(brut)}${r[0] !== brut[0] ? ` = ${tape(r)}` : ""}.`,
    `le résultat est ${tape(r)}.`,
  );
}

function genAddition(star: 2 | 3 | 4, avecFigure = false): Genere {
  const [p, q] = deuxPrenoms();
  const t = pick(TOUTS);
  const [m1, m2] = pick(MOMENTS);
  const situation = !avecFigure && Math.random() < 0.6;
  const { termes, signes } = tirerAddition(star, situation);
  let text: string;
  let brut = sommeBrute(termes, signes);
  if (!situation) text = consigneCalcul(ecrireSomme(termes, signes));
  else if (termes.length === 3) {
    // ★4 : deux parts, puis ce qui reste du tout
    const [a, b] = termes;
    brut = addF([1, 1], sommeBrute([a, b], [1, 1]), -1);
    if (brut[0] <= 0) return genAddition(star, avecFigure);
    text = `${p.nom} a ${t.pp} ${F(a)} ${t.un} ${m1}, puis ${F(b)} ${t.le} ${m2}. Quelle fraction ${t.le} reste-t-il à ${t.inf} ?`;
  } else {
    const [a, b] = termes;
    if (signes[1] > 0)
      text = pick([
        `${p.nom} a ${t.pp} ${F(a)} ${t.un} ${m1}, puis ${F(b)} ${t.le} ${m2}. Quelle fraction ${t.le} a-t-${il(p)} ${fem(t.pp)} en tout ?`,
        `${Maj(m1)}, ${p.nom} a ${t.pp} ${F(a)} ${t.un} ; ${m2}, ${F(b)} ${t.le}. Quelle fraction ${t.le} a-t-${il(p)} ${fem(t.pp)} en tout ?`,
        `${p.nom} a ${t.pp} ${F(a)} ${t.un} et ${q.nom} ${F(b)} ${t.le}. Quelle fraction ${t.le} ont-${ils(p, q)} ${fem(t.pp)} à ${p.f && q.f ? "elles" : "eux"} deux ?`,
      ]);
    else text = `Il restait ${F(a)} ${t.le} à ${t.inf}. ${Maj(m2)}, ${p.nom} a ${t.pp} ${F(b)} ${t.le}. Quelle fraction ${t.le} reste-t-il à ${t.inf} ?`;
  }
  const g: Genere = {
    text,
    format: "short",
    ...attenduFraction(text, brut),
    explanation: termes.length === 3 && situation ? explReste(termes[0], termes[1]) : explAddition(termes, signes),
  };
  if (avecFigure) {
    g.text = `${text} La figure montre les deux fractions.`;
    g.canvas = fractionCanvas({
      model: "compare",
      fractions: termes.map((f) => ({ numerator: f[0], denominator: f[1], label: tape(f) })),
    });
  }
  return g;
}

/* ── FRACTION_MULTIPLIER ────────────────────────────────────────────────── */

/** Produits en situation : « a de … ; b de cette partie » (a × b), dans l'ordre du texte. */
const PRODUITS: ((p: Prenom, A: string, B: string) => string)[] = [
  (p, A, B) => `Dans le potager ${de(p.nom)}, ${A} de la surface est cultivée. Les tomates occupent ${B} de cette partie cultivée. Quelle fraction du potager est occupée par les tomates ?`,
  (p, A, B) => `Dans la bibliothèque ${de(p.nom)}, ${A} des livres sont des romans, et ${B} de ces romans sont des romans policiers. Quelle fraction des livres sont des romans policiers ?`,
  (p, A, B) => `Dans la classe ${de(p.nom)}, ${A} des élèves font du sport en club ; ${B} d’entre eux font du football. Quelle fraction des élèves de la classe fait du football en club ?`,
  (p, A, B) => `${p.nom} a ${A} d’une tablette de chocolat. ${Maj(il(p))} en mange ${B}. Quelle fraction de la tablette entière mange-t-${il(p)} ?`,
  (p, A, B) => `Dans le jardin ${de(p.nom)}, ${A} du terrain est une pelouse ; ${B} de cette pelouse est à l’ombre. Quelle fraction du jardin est une pelouse à l’ombre ?`,
  (p, A, B) => `${A} des photos ${de(p.nom)} ont été prises en vacances, et ${B} de ces photos montrent la mer. Quelle fraction de ses photos montrent la mer ?`,
  (p, A, B) => `Au club de musique ${de(p.nom)}, ${A} des membres jouent d’un instrument ; ${B} d’entre eux jouent de la guitare. Quelle fraction des membres joue de la guitare ?`,
  (p, A, B) => `Dans l’aquarium ${de(p.nom)}, ${A} des poissons sont rouges, et ${B} des poissons rouges ont des taches. Quelle fraction des poissons sont rouges et tachetés ?`,
];

function genMultiplication(star: 2 | 3): Genere {
  const p = pick(PRENOMS);
  const situation = Math.random() < 0.6;
  let a: Fr;
  let b: Fr;
  if (star === 2 && !situation && Math.random() < 0.4) {
    // un entier fois une fraction
    const d = rnd(3, 11);
    b = [nDe(d), d];
    a = [rnd(2, 9), 1];
  } else if (star === 2) {
    const da = rnd(2, 6);
    const db = rnd(2, 6);
    a = [nDe(da), da];
    b = [nDe(db), db];
  } else {
    // ★3 : de quoi simplifier — le numérateur de a et le dénominateur de b ont le facteur k
    const k = rnd(2, 3);
    const n1 = k * rnd(1, 2);
    let d1 = rnd(n1 + 1, 12);
    while (gcd(n1, d1) !== 1) d1 = rnd(n1 + 1, 12);
    const d2 = k * rnd(1, 3);
    a = [n1, d1];
    b = [nDe(d2), d2];
    if (Math.random() < 0.5) [a, b] = [b, a];
  }
  const brut: Fr = [a[0] * b[0], a[1] * b[1]];
  const text = situation ? pick(PRODUITS)(p, F(a), F(b)) : consigneCalcul(`${a[1] === 1 ? a[0] : tf(a)} \\times ${tf(b)}`);
  const r = irr(brut);
  return {
    text,
    format: "short",
    ...attenduFraction(text, brut),
    explanation: ex(
      "pour multiplier deux fractions, on multiplie les numérateurs entre eux et les dénominateurs entre eux ; « a/b de » veut dire « a/b × ».",
      situation ? `on prend ${tape(b)} de ${tape(a)} : on calcule ${tape(a)} × ${tape(b)}.` : "on multiplie en haut, on multiplie en bas, puis on simplifie si possible.",
      `${a[0]} × ${b[0]} = ${brut[0]} et ${a[1]} × ${b[1]} = ${brut[1]}, donc le produit vaut ${tape(brut)}${tape(r) !== tape(brut) ? ` = ${tape(r)}` : ""}.`,
      `le résultat est ${tape(r)}.`,
    ),
  };
}

/* ── FRACTION_QUANTITE ──────────────────────────────────────────────────── */

/** Une quantité N, une part A de cette quantité : la question, et celle du reste. Unité : u (vide pour un compte). */
type Quantite = { max: number; u: string; texte: (p: Prenom, A: string, N: number) => string; q: (p: Prenom) => string; reste: (p: Prenom) => string };
const QUANTITES: Quantite[] = [
  { max: 60, u: "km", texte: (p, A, N) => `Un sentier mesure ${N} km. ${p.nom} en a parcouru ${A}.`, q: (p) => `Combien de kilomètres a-t-${il(p)} parcourus ?`, reste: (p) => `Combien de kilomètres lui reste-t-il à parcourir ?` },
  { max: 120, u: "", texte: (p, A, N) => `${p.nom} a ${N} billes. ${Maj(il(p))} en donne ${A} à son frère.`, q: (p) => `Combien de billes donne-t-${il(p)} ?`, reste: (p) => `Combien de billes lui reste-t-il ?` },
  { max: 400, u: "", texte: (p, A, N) => `Le roman ${de(p.nom)} compte ${N} pages. ${Maj(il(p))} en a lu ${A}.`, q: (p) => `Combien de pages a-t-${il(p)} lues ?`, reste: () => `Combien de pages lui reste-t-il à lire ?` },
  { max: 150, u: "cL", texte: (p, A, N) => `Une bouteille contient ${N} cL de jus. ${p.nom} en boit ${A}.`, q: (p) => `Combien de centilitres boit-${il(p)} ?`, reste: () => `Combien de centilitres reste-t-il dans la bouteille ?` },
  { max: 90, u: "min", texte: (p, A, N) => `Le trajet ${de(p.nom)} dure ${N} minutes. ${Maj(il(p))} en a déjà fait ${A}.`, q: () => `Combien de minutes cela représente-t-il ?`, reste: () => `Combien de minutes de trajet reste-t-il ?` },
  { max: 32, u: "", texte: (p, A, N) => `La classe ${de(p.nom)} compte ${N} élèves. ${Maj(A)} d’entre eux viennent à vélo.`, q: () => `Combien d’élèves viennent à vélo ?`, reste: () => `Combien d’élèves ne viennent pas à vélo ?` },
  { max: 100, u: "", texte: (p, A, N) => `${p.nom} doit planter ${N} graines. ${Maj(il(p))} en a déjà planté ${A}.`, q: (p) => `Combien de graines a-t-${il(p)} plantées ?`, reste: () => `Combien de graines reste-t-il à planter ?` },
  { max: 1000, u: "g", texte: (p, A, N) => `Un paquet de farine pèse ${N} g. ${p.nom} en utilise ${A} pour un gâteau.`, q: (p) => `Combien de grammes de farine utilise-t-${il(p)} ?`, reste: () => `Combien de grammes de farine reste-t-il dans le paquet ?` },
  { max: 60, u: "m", texte: (p, A, N) => `Une pelote de ficelle mesure ${N} m. ${p.nom} en coupe ${A}.`, q: (p) => `Quelle longueur de ficelle coupe-t-${il(p)} ?`, reste: () => `Quelle longueur de ficelle reste-t-il ?` },
  { max: 60, u: "min", texte: (p, A, N) => `Un match de handball dure ${N} minutes. ${p.nom} a joué ${A} du match.`, q: (p) => `Combien de minutes a-t-${il(p)} joué ?`, reste: (p) => `Pendant combien de minutes ${p.nom} est-${il(p)} resté${p.f ? "e" : ""} sur le banc ?` },
  { max: 200, u: "", texte: (p, A, N) => `L’album ${de(p.nom)} contient ${N} cartes ; ${A} sont des cartes rares.`, q: (p) => `Combien de cartes rares possède-t-${il(p)} ?`, reste: () => `Combien de cartes ne sont pas rares ?` },
  { max: 80, u: "ares", texte: (p, A, N) => `Le champ de canne à sucre de l’oncle ${de(p.nom)} mesure ${N} ares. ${Maj(A)} du champ est déjà coupé.`, q: () => `Combien d’ares sont déjà coupés ?`, reste: () => `Combien d’ares reste-t-il à couper ?` },
  { max: 120, u: "€", texte: (p, A, N) => `${p.nom} a économisé ${N},00 €. ${Maj(il(p))} dépense ${A} de cette somme pour un livre.`, q: (p) => `Combien dépense-t-${il(p)} ?`, reste: () => `Combien lui reste-t-il ?` },
];
const avecUnite = (v: number, u: string) => (u === "€" ? `${v},00 €` : u ? `${v} ${u}` : String(v));

function genQuantite(star: 2 | 3, avecFigure = false): Genere {
  const p = pick(PRENOMS);
  const d = star === 2 ? rnd(2, 6) : rnd(3, 10);
  const n = star === 2 && Math.random() < 0.5 ? 1 : nDe(d);
  const situation = Math.random() < 0.85;
  const c = pick(QUANTITES);
  const kMax = Math.max(2, Math.floor((situation ? c.max : 120) / d));
  const N = d * rnd(2, Math.min(kMax, star === 2 ? 10 : 20));
  const part = (N / d) * n;
  const A = F([n, d]);
  const reste = star === 3 && situation && Math.random() < 0.35;
  const v = reste ? N - part : part;
  let text: string;
  let u = "";
  if (situation) {
    text = `${c.texte(p, A, N)} ${reste ? c.reste(p) : c.q(p)}`;
    u = c.u;
  } else text = pick([`Calcule ${A} de ${N}.`, `Que vaut ${A} de ${N} ?`, `Combien font ${A} de ${N} ?`, `Prends ${A} de ${N} : quel nombre obtiens-tu ?`, `${p.nom} doit calculer ${A} de ${N}. Quel résultat trouve-t-${il(p)} ?`]);
  const g: Genere = {
    text,
    format: "short",
    expected: [avecUnite(v, u)],
    comparator: "number_equal",
    explanation: ex(
      `prendre ${n}/${d} d’une quantité, c’est la partager en ${d} parts égales et en prendre ${n}.`,
      "on divise par le dénominateur, puis on multiplie par le numérateur.",
      `${N} ÷ ${d} = ${N / d}, puis ${N / d} × ${n} = ${part}${reste ? ` ; il reste ${N} − ${part} = ${v}` : ""}.`,
      `la réponse est ${avecUnite(v, u)}.`,
    ),
  };
  if (avecFigure) {
    g.text = `${g.text} Aide-toi de la figure.`;
    g.canvas = fractionCanvas({ model: "circle", fraction: { numerator: n, denominator: d, label: `${n}/${d}` } });
  }
  return g;
}

/* ── FRACTION_CALCUL_DEFI (plusieurs étapes) ────────────────────────────── */

/** Deux parts successives d'une quantité N (unité u). */
const DEUX_PARTS: { u: string; max: number; texte: (p: Prenom, N: number, A: string, B: string, m: [string, string]) => string; enTout: string; reste: string }[] = [
  { u: "km", max: 48, texte: (p, N, A, B, m) => `${p.nom} fait une randonnée de ${N} km. ${Maj(il(p))} parcourt ${A} du trajet ${m[0]} et ${B} du trajet ${m[1]}.`, enTout: "Combien de kilomètres a-t-il parcourus en tout ?", reste: "Combien de kilomètres lui reste-t-il à parcourir ?" },
  { u: "", max: 360, texte: (p, N, A, B, m) => `Le roman ${de(p.nom)} compte ${N} pages. ${Maj(il(p))} en lit ${A} ${m[0]} et ${B} ${m[1]}.`, enTout: "Combien de pages a-t-il lues en tout ?", reste: "Combien de pages lui reste-t-il à lire ?" },
  { u: "g", max: 1000, texte: (p, N, A, B) => `Un paquet contient ${N} g de farine. ${p.nom} en utilise ${A} pour un gâteau et ${B} pour des crêpes.`, enTout: "Combien de grammes de farine a-t-il utilisés en tout ?", reste: "Combien de grammes de farine reste-t-il ?" },
  { u: "€", max: 120, texte: (p, N, A, B) => `${p.nom} a ${N},00 € d’économies. ${Maj(il(p))} en dépense ${A} pour un jeu et ${B} pour un livre.`, enTout: "Combien a-t-il dépensé en tout ?", reste: "Combien lui reste-t-il ?" },
  { u: "min", max: 120, texte: (p, N, A, B) => `${p.nom} a ${N} minutes de temps libre. ${Maj(il(p))} passe ${A} de ce temps à lire et ${B} à jouer dehors.`, enTout: "Combien de minutes a-t-il occupées en tout ?", reste: "Combien de minutes lui reste-t-il ?" },
  { u: "", max: 96, texte: (p, N, A, B) => `${p.nom} a ${N} cartes de collection. ${Maj(il(p))} en donne ${A} à sa sœur et ${B} à son cousin.`, enTout: "Combien de cartes a-t-il données en tout ?", reste: "Combien de cartes lui reste-t-il ?" },
  { u: "L", max: 60, texte: (p, N, A, B, m) => `Un réservoir de récupération d’eau contient ${N} L. ${p.nom} en utilise ${A} ${m[0]} et ${B} ${m[1]} pour arroser le jardin.`, enTout: "Combien de litres a-t-il utilisés en tout ?", reste: "Combien de litres reste-t-il dans le réservoir ?" },
];
/** Accorde les questions toutes faites au prénom (« a-t-il » → « a-t-elle »). */
// ⚠️ seulement « a-t-il » : « reste-t-il » est impersonnel.
const accorder = (s: string, p: Prenom) => (p.f ? s.replace(/\ba-t-il\b/g, "a-t-elle") : s);

function genCalculDefi(star: 4 | 5): Genere {
  const p = pick(PRENOMS);
  const r = Math.random();
  if (r < 0.5) {
    // deux parts d'une quantité (★5 : la seconde part est prise sur ce qui reste)
    const c = pick(DEUX_PARTS);
    let a: Fr;
    let b: Fr;
    let D: number;
    for (;;) {
      const d = rnd(2, 5);
      D = d * rnd(2, 3);
      a = [nDe(d), d];
      b = [nDe(D), D];
      if (Math.random() < 0.5) [a, b] = [b, a];
      if (a[0] * D / a[1] + b[0] * D / b[1] < D) break;
    }
    const surReste = star === 5 && Math.random() < 0.5;
    const unite = surReste ? a[1] * b[1] : D;
    const kMax = Math.max(1, Math.floor(c.max / unite));
    const N = unite * rnd(1, Math.max(1, kMax));
    const m = pick(MOMENTS);
    const reste = Math.random() < 0.6 || surReste;
    let text = c.texte(p, N, F(a), F(b), m);
    let v: number;
    if (surReste) {
      text = text.replace(` et ${F(b)}`, `, puis ${F(b)} de ce qui reste`);
      v = N * (1 - a[0] / a[1]) * (1 - b[0] / b[1]);
    } else v = reste ? N * (1 - a[0] / a[1] - b[0] / b[1]) : N * (a[0] / a[1] + b[0] / b[1]);
    v = Math.round(v * 1e6) / 1e6;
    if (!Number.isInteger(v)) return genCalculDefi(star);
    text = `${text} ${accorder(reste ? c.reste : c.enTout, p)}`;
    const pa = (N * a[0]) / a[1];
    return {
      text,
      format: "short",
      expected: [avecUnite(v, c.u)],
      comparator: "number_equal",
      explanation: ex(
        "prendre une fraction d’une quantité : on divise par le dénominateur, puis on multiplie par le numérateur.",
        surReste ? "on calcule la première part, puis la seconde sur ce qui reste." : "on calcule chaque part, puis on les additionne (et on retire le total pour trouver le reste).",
        surReste
          ? `${tape(a)} de ${N} = ${pa} ; il reste ${N - pa} ; ${tape(b)} de ${N - pa} = ${((N - pa) * b[0]) / b[1]} ; il reste ${v}.`
          : `${tape(a)} de ${N} = ${pa} ; ${tape(b)} de ${N} = ${(N * b[0]) / b[1]} ; ${reste ? `${N} − ${pa} − ${(N * b[0]) / b[1]} = ${v}` : `${pa} + ${(N * b[0]) / b[1]} = ${v}`}.`,
        `la réponse est ${avecUnite(v, c.u)}.`,
      ),
    };
  }
  if (r < 0.75 && star === 4) {
    // l'erreur classique : additionner les numérateurs ET les dénominateurs
    const d = rnd(2, 6);
    const D = d * rnd(2, 3);
    let a: Fr = [nDe(d), d];
    let b: Fr = [nDe(D), D];
    if (Math.random() < 0.5) [a, b] = [b, a];
    const brut = sommeBrute([a, b], [1, 1]);
    const juste = irr(brut);
    const faux: Fr = [a[0] + b[0], a[1] + b[1]];
    const { choices, expected } = qcmFractions(juste, [faux, [a[0] + b[0], a[1] * b[1]], [a[0] + b[0], D], [a[0] * b[0], a[1] * b[1]]]);
    const text = pick([
      `Un élève écrit : $${tf(a)} + ${tf(b)} = ${tf(faux)}$. C’est faux. Quel est le bon résultat ?`,
      `${p.nom} a écrit $${tf(a)} + ${tf(b)} = ${tf(faux)}$. Son professeur lui dit que c’est faux. Quel est le bon résultat ?`,
      `Dans le cahier ${de(p.nom)} : $${tf(a)} + ${tf(b)} = ${tf(faux)}$. Corrige : quel est le bon résultat ?`,
    ]);
    return { text, format: "qcm", choices, expected, comparator: "mcq_exact", explanation: explAddition([a, b], [1, 1]) };
  }
  if (r < 0.85) {
    // une partie d'une recette
    const [mot, k] = pick([["la moitié", 2], ["le tiers", 3], ["le quart", 4]] as [string, number][]);
    const d = rnd(2, 6);
    const a: Fr = [nDe(d), d];
    const brut: Fr = [a[0], a[1] * k];
    const ingr = pick(["de litre de lait", "de kilogramme de farine", "de litre de jus d’orange", "de kilogramme de sucre"]);
    const text = `Une recette demande ${F(a)} ${ingr}. ${p.nom} ne prépare que ${mot} de la recette. Quelle fraction ${ingr} utilise-t-${il(p)} ?`;
    return {
      text,
      format: "short",
      ...attenduFraction(text, brut),
      explanation: ex(
        `prendre ${mot} d’un nombre, c’est le multiplier par 1/${k}.`,
        `on calcule ${tape(a)} × 1/${k}.`,
        `${tape(a)} × 1/${k} = ${a[0]}/${a[1] * k}.`,
        `${p.nom} utilise ${tape(irr(brut))} ${ingr}.`,
      ),
    };
  }
  // trois fractions à additionner (dénominateurs multiples les uns des autres)
  const d = rnd(2, 3);
  const D1 = d * rnd(2, 3);
  const D2 = D1 * 2;
  const termes: Fr[] = shuffle([[nDe(d), d] as Fr, [nDe(D1), D1] as Fr, [nDe(D2), D2] as Fr]);
  const signes = [1, 1, star === 5 && Math.random() < 0.5 ? -1 : 1];
  const brut = sommeBrute(termes, signes);
  if (brut[0] <= 0) return genCalculDefi(star);
  const text = consigneCalcul(ecrireSomme(termes, signes));
  return { text, format: "short", ...attenduFraction(text, brut), explanation: explAddition(termes, signes) };
}

/** Ce qui reste d'un tout après deux parts. */
function explReste(a: Fr, b: Fr) {
  const s = sommeBrute([a, b], [1, 1]);
  const r = addF([1, 1], s, -1);
  return ex(
    "le tout vaut 1 ; ce qui reste, c’est 1 moins les parts déjà prises.",
    `on additionne les deux parts (même dénominateur ${s[1]}), puis on retire la somme de 1 = ${s[1]}/${s[1]}.`,
    `${tape(a)} + ${tape(b)} = ${tape(s)} ; ${s[1]}/${s[1]} − ${tape(s)} = ${s[1] - s[0]}/${s[1]}${tape(irr(r)) !== `${s[1] - s[0]}/${s[1]}` ? ` = ${tape(irr(r))}` : ""}.`,
    `il reste ${tape(irr(r))}.`,
  );
}

function genSimplifierMix(star: 1 | 2 | 3): Genere {
  const r = Math.random();
  if (star === 3 && r < 0.25) return genSimplifierDiviseur();
  return genSimplifier(star, r < 0.65 ? "court" : "qcm");
}

export const fractionsBank: TutorBankItemV4[] = [
  // =========================
  // FRACTION_EGALES
  // =========================
  {
    kind: "fixed",
    id: "fraction_egale_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 1,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "$\\dfrac{1}{2}$ et $\\dfrac{2}{4}$ représentent-ils la même quantité ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "On peut multiplier le numérateur et le dénominateur par le même nombre.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("1/2 = 2/4 car on a multiplié le numérateur et le dénominateur de 1/2 par 2.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "fraction_nombre_egales"],
  },
  {
    kind: "fixed",
    id: "fraction_egale_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 1,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "$\\dfrac{3}{5}$ et $\\dfrac{6}{10}$ sont-elles égales ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Passe de 3/5 à une fraction de dénominateur 10.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("3/5 = 6/10 car on a multiplié 3 et 5 par 2.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "fraction_nombre_egales"],
  },
  {
    kind: "fixed",
    id: "fraction_egale_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "$\\dfrac{2}{3}$ et $\\dfrac{4}{5}$ sont-elles égales ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Cherche si on peut obtenir l’une en multipliant l’autre en haut et en bas par le même nombre.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("2/3 ne devient pas 4/5 en multipliant le numérateur et le dénominateur par un même nombre. Ces fractions ne sont donc pas égales.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "fraction_nombre_egales"],
  },
  {
    kind: "fixed",
    id: "fraction_egale_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle fraction est égale à $\\dfrac{3}{4}$ ?",
    format: "qcm",
    choices: ["6/8", "5/8", "9/10", "4/3"],
    expected: ["6/8"],
    comparator: "mcq_exact",
    hint: "Multiplie 3 et 4 par le même nombre.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("3/4 = 6/8 car 3 × 2 = 6 et 4 × 2 = 8.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "fraction_nombre_egales", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_egale_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 2,
    theme: "neutral",
    hint: "On peut multiplier le numérateur et le dénominateur par le même nombre.",
    tags: ["fraction_nombre", "fraction_nombre_egales", "template"],
    // 09/10/2026 : situations × tournures × prénoms (correcteurs/fractions.ts).
    generate: () => (Math.random() < 0.6 ? genEgaleOuiNon(2) : genEgaleQcm(2)),
  },
  {
    kind: "template",
    id: "fraction_egale_tpl_s1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 1,
    theme: "neutral",
    hint: "On peut multiplier le numérateur et le dénominateur par le même nombre.",
    tags: ["fraction_nombre", "fraction_nombre_egales", "template"],
    generate: () => genEgale(1),
  },
  {
    kind: "template",
    id: "fraction_egale_tpl_s3",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 3,
    theme: "neutral",
    hint: "Simplifie d’abord, ou écris les deux fractions avec le même dénominateur.",
    tags: ["fraction_nombre", "fraction_nombre_egales", "template"],
    generate: () => genEgale(3),
  },

  // =========================
  // FRACTION_SIMPLIFIER
  // =========================
  {
    kind: "fixed",
    id: "fraction_simplifier_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 1,
    theme: "neutral",
    text: "Simplifie $\\dfrac{6}{8}$.",
    format: "short",
    expected: ["3/4"],
    comparator: "fraction_decimal_equivalent",
    hint: "Divise le numérateur et le dénominateur par leur plus grand diviseur commun.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("6 et 8 sont divisibles par 2. On obtient 6/8 = 3/4.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "simplifier"],
  },
  {
    kind: "fixed",
    id: "fraction_simplifier_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 1,
    theme: "neutral",
    text: "Simplifie $\\dfrac{9}{12}$.",
    format: "short",
    expected: ["3/4"],
    comparator: "fraction_decimal_equivalent",
    hint: "9 et 12 ont un diviseur commun.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("9 et 12 sont divisibles par 3. Donc 9/12 = 3/4.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "simplifier"],
  },
  {
    kind: "fixed",
    id: "fraction_simplifier_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la forme simplifiée de $\\dfrac{15}{20}$ ?",
    format: "qcm",
    choices: ["3/4", "5/4", "10/15", "4/3"],
    expected: ["3/4"],
    comparator: "mcq_exact",
    hint: "15 et 20 sont divisibles par 5.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("15/20 = 3/4 car on divise 15 et 20 par 5.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "simplifier", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_simplifier_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le plus grand diviseur commun.",
    tags: ["fraction_nombre", "simplifier", "template"],
    // 09/10/2026 : situations (collections, parts) × tournures × prénoms ; forme irréductible exigée.
    generate: () => genSimplifierMix(2),
  },
  {
    kind: "template",
    id: "fraction_simplifier_tpl_s1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 1,
    theme: "neutral",
    hint: "Divise le numérateur et le dénominateur par un même nombre (2, 3 ou 5).",
    tags: ["fraction_nombre", "simplifier", "template"],
    generate: () => genSimplifierMix(1),
  },

  // =========================
  // FRACTION_RATIONNEL
  // =========================
  {
    kind: "fixed",
    id: "fraction_rationnel_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 1,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Le nombre $\\dfrac{3}{5}$ est-il un nombre rationnel ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Un nombre rationnel peut s’écrire comme quotient de deux entiers.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("3/5 est un quotient de deux entiers. C’est donc un nombre rationnel.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "rationnel"],
  },
  {
    kind: "fixed",
    id: "fraction_rationnel_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 2,
    theme: "neutral",
    text: "Écris le nombre rationnel 'moins deux tiers' sous forme de fraction.",
    format: "short",
    expected: ["-2/3"],
    comparator: "fraction_decimal_equivalent",
    hint: "Place le signe moins devant la fraction.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("Le nombre 'moins deux tiers' s’écrit -2/3.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "rationnel"],
  },
  {
    kind: "fixed",
    id: "fraction_rationnel_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 2,
    theme: "neutral",
    text: "Quel nombre est écrit comme quotient de deux entiers ?",
    format: "qcm",
    choices: ["7/4", "π", "√2", "abc"],
    expected: ["7/4"],
    comparator: "mcq_exact",
    hint: "On cherche une écriture de type entier sur entier non nul.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("7/4 est le quotient de deux entiers. C’est un nombre rationnel.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "rationnel", "qcm"],
  },

  // =========================
  // FRACTION_COMPARER
  // =========================
  {
    kind: "fixed",
    id: "fraction_comparer_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Quel est le plus grand : $\\dfrac{1}{2}$ ou $\\dfrac{3}{4}$ ?",
    format: "qcm",
    choices: ["3/4", "1/2"],
    expected: ["3/4"],
    comparator: "mcq_exact",
    hint: "Tu peux comparer leurs valeurs décimales ou utiliser des fractions de même dénominateur.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("1/2 = 2/4, donc 3/4 est plus grand que 1/2.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "comparer"],
  },
  {
    kind: "fixed",
    id: "fraction_comparer_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Compare $\\dfrac{2}{3}$ et $\\dfrac{3}{5}$.",
    format: "qcm",
    choices: [">", "<", "="],
    expected: [">"],
    comparator: "mcq_exact",
    hint: "Tu peux comparer 2 × 5 et 3 × 3.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("2/3 et 3/5 : 2 × 5 = 10 et 3 × 3 = 9, donc 2/3 > 3/5.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "comparer"],
  },
  {
    kind: "fixed",
    id: "fraction_comparer_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle fraction est la plus petite ?",
    format: "qcm",
    choices: ["5/6", "3/4", "2/3", "7/8"],
    expected: ["2/3"],
    comparator: "mcq_exact",
    hint: "Compare leurs valeurs approximatives.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("2/3 ≈ 0,67 ; 3/4 = 0,75 ; 5/6 ≈ 0,83 ; 7/8 = 0,875. La plus petite est 2/3.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "comparer", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_comparer_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Écris les deux fractions avec le même dénominateur.",
    tags: ["fraction_nombre", "comparer", "template"],
    // 09/10/2026 : un dénominateur multiple de l'autre ; signe, laquelle, vrai ou faux, situations × prénoms.
    generate: () => genComparer(3),
  },
  {
    kind: "template",
    id: "fraction_comparer_tpl_s2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Même dénominateur : compare les numérateurs. Même numérateur : la plus grande a le plus petit dénominateur.",
    tags: ["fraction_nombre", "comparer", "template"],
    generate: () => genComparer(2),
  },

  // =========================
  // FRACTION_ADDITION
  // =========================
  {
    kind: "fixed",
    id: "fraction_additionner_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule $\\dfrac{1}{4} + \\dfrac{2}{4}$.",
    format: "short",
    expected: ["3/4"],
    comparator: "fraction_decimal_equivalent",
    hint: "Les dénominateurs sont déjà égaux.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("1/4 + 2/4 = 3/4.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "addition"],
  },
  {
    kind: "fixed",
    id: "fraction_additionner_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule $\\dfrac{3}{5} - \\dfrac{1}{5}$.",
    format: "short",
    expected: ["2/5"],
    comparator: "fraction_decimal_equivalent",
    hint: "Quand les dénominateurs sont égaux, on additionne ou on soustrait seulement les numérateurs.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("3/5 - 1/5 = 2/5.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "addition", "soustraction"],
  },
  {
    kind: "fixed",
    id: "fraction_additionner_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule $\\dfrac{1}{2} + \\dfrac{1}{3}$.",
    format: "short",
    expected: ["5/6"],
    comparator: "fraction_decimal_equivalent",
    hint: "Mets les fractions au même dénominateur.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("1/2 = 3/6 et 1/3 = 2/6, donc 1/2 + 1/3 = 5/6.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "addition"],
  },
  {
    kind: "fixed",
    id: "fraction_additionner_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 3,
    theme: "reunion",
    text: "À La Réunion, Inès mange $\\dfrac{1}{4}$ d’un gâteau le matin puis $\\dfrac{1}{2}$ du même gâteau à midi. Quelle quantité a-t-elle mangée en tout ?",
    format: "qcm",
    choices: ["2/3", "3/4", "1", "5/8"],
    expected: ["3/4"],
    comparator: "mcq_exact",
    hint: "Transforme 1/2 en une fraction de dénominateur 4.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("1/2 = 2/4. Donc 1/4 + 2/4 = 3/4.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "addition", "qcm", "reunion"],
  },
  {
    kind: "template",
    id: "fraction_additionner_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 3,
    theme: "neutral",
    hint: "Commence par mettre les fractions au même dénominateur.",
    tags: ["fraction_nombre", "addition", "template"],
    // 09/10/2026 : un dénominateur multiple de l'autre (programme de 5e), sommes et différences, situations × prénoms.
    generate: () => genAddition(3),
  },
  {
    kind: "template",
    id: "fraction_additionner_tpl_s4",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 4,
    theme: "neutral",
    hint: "Écris tous les nombres avec le même dénominateur (un entier aussi : 1 = 4/4).",
    tags: ["fraction_calcul", "addition", "template"],
    generate: () => genAddition(4),
  },

  // =========================
  // FRACTION_PRODUIT
  // =========================
  {
    kind: "fixed",
    id: "fraction_multiplier_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule $\\dfrac{2}{3} \\times \\dfrac{3}{4}$.",
    format: "short",
    expected: ["1/2", "6/12"],
    comparator: "fraction_decimal_equivalent",
    hint: "Multiplie les numérateurs entre eux, puis les dénominateurs entre eux.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("2/3 × 3/4 = 6/12 = 1/2.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "produit"],
  },
  {
    kind: "fixed",
    id: "fraction_multiplier_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule $\\dfrac{5}{6} \\times \\dfrac{2}{5}$.",
    format: "short",
    expected: ["1/3", "10/30"],
    comparator: "fraction_decimal_equivalent",
    hint: "Puis simplifie le résultat.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("5/6 × 2/5 = 10/30 = 1/3.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "produit"],
  },
  {
    kind: "fixed",
    id: "fraction_multiplier_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le résultat de $\\dfrac{3}{4} \\times \\dfrac{2}{3}$ ?",
    format: "qcm",
    choices: ["1/2", "5/7", "6/7", "2/5"],
    expected: ["1/2"],
    comparator: "mcq_exact",
    hint: "Multiplie et simplifie.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("3/4 × 2/3 = 6/12 = 1/2.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "produit", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_multiplier_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie en haut et en bas, puis simplifie.",
    tags: ["fraction_nombre", "produit", "template"],
    // ⛔ 09/10/2026 — l'ancien gabarit refusait « 6/12 » pour 2/3 × 3/4 sans demander de simplifier.
    // Produits tirés, situations « a de b » × prénoms ; la simplification n'est exigée que si la consigne le dit.
    generate: () => genMultiplication(3),
  },
  {
    kind: "template",
    id: "fraction_multiplier_tpl_s2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier",
    difficulty: 2,
    theme: "neutral",
    hint: "On multiplie les numérateurs entre eux et les dénominateurs entre eux.",
    tags: ["fraction_calcul", "produit", "template"],
    generate: () => genMultiplication(2),
  },

  // =========================
  // FRACTION_QUANTITE
  // =========================
  {
    kind: "fixed",
    id: "fraction_quantite_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule $\\dfrac{3}{4}$ de 20.",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "Prendre 3/4 d’un nombre, c’est multiplier ce nombre par 3/4.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("3/4 de 20 = 20 × 3/4 = 15.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "quantite"],
  },
  {
    kind: "fixed",
    id: "fraction_quantite_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule $\\dfrac{2}{5}$ de 30.",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Commence par calculer 1/5 de 30.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("1/5 de 30 vaut 6, donc 2/5 de 30 vaut 12.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "quantite"],
  },
  {
    kind: "fixed",
    id: "fraction_quantite_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "cuisine",
    text: "Pour une recette, Léa utilise $\\dfrac{3}{4}$ d’un paquet de 28 biscuits. Combien de biscuits cela représente-t-il ?",
    format: "short",
    expected: ["21"],
    comparator: "number_equal",
    hint: "Calcule 1/4 puis multiplie par 3.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("1/4 de 28 vaut 7, donc 3/4 de 28 vaut 21.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "quantite", "cuisine"],
  },
  {
    kind: "template",
    id: "fraction_quantite_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "neutral",
    hint: "Commence par partager la quantité en parts égales.",
    tags: ["fraction_nombre", "quantite", "template"],
    // ⛔ 09/10/2026 — l'ancien gabarit tirait aussi « 2/2 de 20 », « 4/2 de 10 ». Situations × prénoms, unité dans la réponse.
    generate: () => genQuantite(3),
  },
  {
    kind: "template",
    id: "fraction_quantite_tpl_s2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 2,
    theme: "neutral",
    hint: "Divise par le dénominateur, puis multiplie par le numérateur.",
    tags: ["fraction_calcul", "quantite", "template"],
    generate: () => genQuantite(2),
  },

  // =========================
  // FRACTION_INVERSE
  // =========================

  // =========================
  // FRACTION_DIVISION
  // =========================

  // =========================
  // FRACTION_OPPOSE
  // =========================
  {
    kind: "fixed",
    id: "fraction_oppose_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_oppose",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est l’opposé de $\\dfrac{3}{5}$ ?",
    format: "short",
    expected: ["-3/5"],
    comparator: "fraction_decimal_equivalent",
    hint: "L’opposé a la même distance à 0 mais un signe contraire.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("L’opposé de 3/5 est -3/5.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "oppose"],
  },
  {
    kind: "fixed",
    id: "fraction_oppose_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_oppose",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est l’opposé de $-\\dfrac{7}{9}$ ?",
    format: "short",
    expected: ["7/9"],
    comparator: "fraction_decimal_equivalent",
    hint: "On change simplement le signe.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("L’opposé de −7/9 est 7/9.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "oppose"],
  },

  // =========================
  // FRACTION_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "fraction_defi_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "On partage le même gâteau. Quelle part est la plus grande : $\\dfrac{1}{3}$ ou $\\dfrac{1}{4}$ du gâteau ?",
    format: "qcm",
    choices: ["1/3", "1/4", "elles sont égales"],
    expected: ["1/3"],
    comparator: "mcq_exact",
    hint: "Quand on partage le même gâteau en moins de parts, les parts sont plus grandes.",
    explanation: expl(
      "En 3 parts, chaque part est plus grande qu’en 4 parts. Donc 1/3 > 1/4. Attention : 4 est plus grand que 3, mais 1/4 est plus petit que 1/3.",
    ),
    tags: ["fraction_nombre", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "fraction_defi_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_calcul_defi",
    difficulty: 4,
    theme: "cuisine",
    text: "Une recette utilise $\\dfrac{2}{3}$ d’un litre de lait. Léa ne veut préparer que la moitié de la recette. Quelle quantité de lait doit-elle utiliser ?",
    format: "short",
    expected: ["1/3"],
    comparator: "fraction_decimal_equivalent",
    hint: "Prendre la moitié de 2/3, c’est multiplier par 1/2.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("La moitié de 2/3 vaut 2/3 × 1/2 = 2/6 = 1/3. Il faut donc 1/3 de litre de lait.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "defi", "cuisine"],
  },
  {
    kind: "fixed",
    id: "fraction_defi_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_calcul_defi",
    difficulty: 4,
    theme: "reunion",
    text: "À La Réunion, Enzo mange $\\dfrac{3}{4}$ d’un gâteau le midi puis $\\dfrac{1}{6}$ du même gâteau le soir. Quelle quantité a-t-il mangée en tout ?",
    format: "qcm",
    choices: ["5/6", "7/12", "11/12", "1"],
    expected: ["11/12"],
    comparator: "mcq_exact",
    hint: "Mets les fractions au même dénominateur.",
    explanation:
      "Définition : une fraction représente un partage ou un quotient avec un numérateur et un dénominateur.\n\n" +
          "Méthode : on applique la règle adaptée : lire, simplifier, comparer ou calculer avec les fractions.\n\nCalcul : " +
          ("3/4 = 9/12 et 1/6 = 2/12. Donc 9/12 + 2/12 = 11/12.") +
          "\n\nConclusion : la fraction ou le nombre obtenu est la bonne réponse.",
    tags: ["fraction_nombre", "defi", "qcm", "reunion"],
  },
    /* =========================
     QUESTIONS OUVERTES — FRACTIONS
  ========================= */
  {
    kind: "fixed",
    id: "fraction_egale_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Complète : $\\dfrac{1}{2} = \\dfrac{?}{4}$.",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Pour passer de 2 à 4, on multiplie par 2. On fait pareil en haut.",
    explanation: expl("En bas, 2 × 2 = 4. En haut, on multiplie aussi par 2 : 1 × 2 = 2. Donc 1/2 = 2/4."),
    tags: ["fraction_nombre", "fraction_nombre_egales"],
  },
  {
    kind: "fixed",
    id: "fraction_simplifier_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Simplifie $\\dfrac{12}{18}$ le plus possible.",
    format: "short",
    expected: ["2/3"],
    comparator: "fraction_decimal_equivalent",
    hint: "12 et 18 sont tous les deux dans la table de 6.",
    explanation: expl("12 ÷ 6 = 2 et 18 ÷ 6 = 3. Donc 12/18 = 2/3."),
    tags: ["fraction_nombre", "simplifier"],
  },
  {
    kind: "fixed",
    id: "fraction_comparer_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Pour comparer $\\dfrac{2}{3}$ et $\\dfrac{3}{5}$, on les écrit sur 15. Complète : $\\dfrac{2}{3} = \\dfrac{?}{15}$.",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "3 × 5 = 15. Multiplie aussi 2 par 5.",
    explanation: expl("3 × 5 = 15, donc 2 × 5 = 10 : 2/3 = 10/15. De même, 3/5 = 9/15. Comme 10 > 9, 2/3 > 3/5."),
    tags: ["fraction_nombre", "comparer"],
  },
  {
    kind: "fixed",
    id: "fraction_additionner_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Complète : $\\dfrac{1}{2} + \\dfrac{1}{3} = \\dfrac{3}{6} + \\dfrac{?}{6}$.",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Écris 1/3 avec le dénominateur 6.",
    explanation: expl("3 × 2 = 6, donc 1 × 2 = 2 : 1/3 = 2/6. Alors 1/2 + 1/3 = 3/6 + 2/6 = 5/6."),
    tags: ["fraction_nombre", "addition"],
  },
  {
    kind: "fixed",
    id: "fraction_multiplier_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    // Frédéric (08/10) : 1/2 est juste aussi → réponse tapée, simplifiée ou non.
    text: "Calcule $\\dfrac{2}{3} \\times \\dfrac{3}{4}$.",
    format: "short",
    expected: ["6/12", "1/2", "3/6", "0,5"],
    comparator: "fraction_decimal_equivalent",
    hint: "Multiplie les numérateurs entre eux et les dénominateurs entre eux.",
    explanation: expl("En haut : 2 × 3 = 6. En bas : 3 × 4 = 12. Donc 2/3 × 3/4 = 6/12 (qui se simplifie en 1/2)."),
    tags: ["fraction_nombre", "produit", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_quantite_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Calcule $\\dfrac{3}{4}$ de 24.",
    format: "short",
    expected: ["18"],
    comparator: "number_equal",
    hint: "Commence par calculer 1/4 de 24.",
    explanation: expl("1/4 de 24 : 24 ÷ 4 = 6. Puis 3/4 de 24 : 3 × 6 = 18."),
    tags: ["fraction_nombre", "quantite"],
  },
  {
    kind: "fixed",
    id: "fraction_oppose_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_oppose",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Calcule $\\dfrac{3}{5} + \\left(-\\dfrac{3}{5}\\right)$.",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "3/5 et -3/5 sont opposés.",
    explanation: expl("3/5 et -3/5 sont des nombres opposés. La somme de deux nombres opposés vaut 0."),
    tags: ["fraction_nombre", "oppose"],
  },
  {
    kind: "fixed",
    id: "fraction_defi_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_calcul_defi",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Un élève écrit : $\\dfrac{1}{2} + \\dfrac{1}{3} = \\dfrac{2}{5}$. C’est faux. Quel est le bon résultat ?",
    format: "qcm",
    choices: ["5/6", "2/5", "2/6", "1/6"],
    expected: ["5/6"],
    comparator: "mcq_exact",
    hint: "On n’additionne pas les dénominateurs entre eux.",
    explanation: expl("On met au même dénominateur : 1/2 = 3/6 et 1/3 = 2/6. Donc 1/2 + 1/3 = 3/6 + 2/6 = 5/6."),
    tags: ["fraction_nombre", "defi", "erreur", "qcm"],
  },
    /* =========================
     RENFORT — FRACTION CANVAS 5e
  ========================= */

  {
    kind: "template",
    id: "5e_fraction_egale_canvas_compare_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 2,
    theme: "neutral",
    hint: "Observe si la même proportion est colorée.",
    tags: ["fraction_nombre", "fraction_nombre_egales", "canvas", "compare", "template"],
    // 09/10/2026 : situations × tournures × prénoms, la figure montre les deux fractions de l'énoncé.
    generate: () => genEgaleOuiNon(2, true),
  },

  {
    kind: "template",
    id: "5e_fraction_simplifier_canvas_bar_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche une fraction plus simple qui représente la même partie colorée.",
    tags: ["fraction_nombre", "simplifier", "canvas", "bar", "template"],
    // 09/10/2026 : la barre montre N parts sur D ; la forme irréductible est exigée (« 2/4 » n'est plus accepté).
    generate: () => (Math.random() < 0.6 ? genSimplifierFigure() : genSimplifierMix(2)),
  },

  {
    kind: "template",
    id: "5e_fraction_rationnel_canvas_grid_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 2,
    theme: "neutral",
    hint: "Un nombre rationnel peut s’écrire comme quotient de deux entiers.",
    tags: ["fraction_nombre", "rationnel", "canvas", "grid", "template"],
    // 09/10/2026 : grille tirée (2 à 5 rangées, 3 à 6 colonnes), forme irréductible exigée ; ou un quotient.
    generate: () => (Math.random() < 0.5 ? genGrille() : genRationnel(2)),
  },
  {
    kind: "template",
    id: "fraction_rationnel_tpl_s1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 1,
    theme: "neutral",
    hint: "a ÷ b s’écrit a/b : c’est le partage de a en b parts égales.",
    tags: ["fraction_nombre", "rationnel", "quotient", "template"],
    generate: () => genRationnel(1),
  },
  {
    kind: "template",
    id: "fraction_rationnel_tpl_s2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 2,
    theme: "neutral",
    hint: "a/b est le nombre qui, multiplié par b, donne a.",
    tags: ["fraction_nombre", "rationnel", "quotient", "template"],
    generate: () => genRationnel(2),
  },
  {
    kind: "template",
    id: "fraction_rationnel_tpl_s3",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 3,
    theme: "neutral",
    hint: "a/b = a ÷ b : effectue la division.",
    tags: ["fraction_nombre", "rationnel", "quotient", "template"],
    generate: () => genRationnel(3),
  },

  {
    kind: "template",
    id: "5e_fraction_comparer_canvas_compare_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare les portions colorées.",
    tags: ["fraction_nombre", "comparer", "canvas", "compare", "template"],
    // 09/10/2026 : paires tirées (un dénominateur multiple de l'autre), la figure montre les deux fractions.
    generate: () => (Math.random() < 0.5 ? genComparer(3, true) : genComparer(3)),
  },

  {
    kind: "template",
    id: "5e_fraction_additionner_canvas_bar_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 2,
    theme: "neutral",
    hint: "Les dénominateurs sont identiques : additionne les numérateurs.",
    tags: ["fraction_nombre", "addition", "canvas", "bar", "template"],
    // ⛔ 09/10/2026 — l'ancien gabarit écrivait min(a + b, d) : 2/4 + 3/4 était corrigé « 4/4 ».
    // Et sa barre montrait la RÉPONSE. La figure montre maintenant les deux termes.
    generate: () => genAddition(2, Math.random() < 0.4),
  },

  {
    kind: "template",
    id: "5e_fraction_quantite_canvas_circle_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "neutral",
    hint: "Commence par calculer une part.",
    tags: ["fraction_nombre", "quantite", "canvas", "circle", "template"],
    // 09/10/2026 : situations × prénoms ; le disque montre la fraction de l'énoncé.
    generate: () => genQuantite(3, true),
  },

  {
    kind: "fixed",
    id: "5e_fraction_piege_parts_inegales_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 3,
    theme: "neutral",
    text: "Deux figures ont 2 parts colorées sur 4. Peut-on toujours dire qu’elles représentent $\\dfrac{2}{4}$ ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il faut vérifier que les parts sont égales.",
    explanation:
      "Définition : une fraction représente des parts égales d’un même tout.\n\n" +
      "Méthode : avant d’écrire une fraction, on vérifie que le partage est régulier.\n\n" +
      "Observation : si les parts ne sont pas égales, l’écriture 2/4 n’est pas fiable.\n\n" +
      "Conclusion : on ne peut pas toujours dire que cela représente 2/4.",
    tags: ["fraction_nombre", "piege", "parts_inegales", "canvas"],
    canvas: fractionCanvas({
      model: "bar",
      fraction: { numerator: 2, denominator: 4, label: "2/4 ?" },
      display: { unequalParts: true },
    }),
  },

  {
    kind: "fixed",
    id: "5e_fraction_additionner_erreur_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Un élève écrit : $\\dfrac{1}{2} + \\dfrac{1}{3} = \\dfrac{2}{5}$. C’est faux. Quel est le plus petit dénominateur commun à 2 et 3 ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Cherche le plus petit nombre qui est à la fois dans la table de 2 et dans la table de 3.",
    explanation:
      "Définition : pour additionner deux fractions, il faut utiliser un dénominateur commun.\n\n" +
      "Méthode : on cherche le plus petit nombre dans la table de 2 et dans la table de 3.\n\n" +
      "Calcul : 6 = 2 × 3. Donc 1/2 = 3/6 et 1/3 = 2/6, puis 1/2 + 1/3 = 5/6.\n\n" +
      "Conclusion : l’erreur est d’avoir additionné les dénominateurs (2 + 3 = 5) ; le bon dénominateur est 6.",
    tags: ["fraction_nombre", "erreur", "addition"],
  },

  // =========================
  // TOP-UP — FRACTION_EGALE (+2)
  // =========================
  {
    kind: "fixed",
    id: "fraction_egale_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle fraction est égale à $\\dfrac{2}{5}$ ?",
    format: "qcm",
    choices: ["4/10", "3/5", "2/10", "5/2"],
    expected: ["4/10"],
    comparator: "mcq_exact",
    hint: "Multiplie 2 et 5 par le même nombre.",
    explanation: expl("2/5 = 4/10 car on multiplie le numérateur et le dénominateur par 2."),
    tags: ["fraction_nombre", "fraction_nombre_egales", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_egale_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_egale",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie le haut et le bas par le même nombre.",
    tags: ["fraction_nombre", "fraction_nombre_egales", "template"],
    // 09/10/2026 : numérateur ou dénominateur manquant, tournures × prénoms.
    generate: () => genEgaleCompleter(2),
  },

  // =========================
  // TOP-UP — FRACTION_SIMPLIFIER (+4)
  // =========================
  {
    kind: "fixed",
    id: "fraction_simplifier_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 2,
    theme: "neutral",
    text: "Simplifie $\\dfrac{10}{15}$.",
    format: "short",
    expected: ["2/3"],
    comparator: "fraction_decimal_equivalent",
    hint: "10 et 15 sont divisibles par 5.",
    explanation: expl("10 et 15 sont divisibles par 5 : 10/15 = 2/3."),
    tags: ["fraction_nombre", "simplifier"],
  },
  {
    kind: "fixed",
    id: "fraction_simplifier_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 3,
    theme: "neutral",
    text: "Simplifie $\\dfrac{24}{36}$.",
    format: "short",
    expected: ["2/3"],
    comparator: "fraction_decimal_equivalent",
    hint: "Le plus grand diviseur commun de 24 et 36 est 12.",
    explanation: expl("24 et 36 sont divisibles par 12 : 24/36 = 2/3."),
    tags: ["fraction_nombre", "simplifier"],
  },
  {
    kind: "fixed",
    id: "fraction_simplifier_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle fraction est déjà irréductible (impossible à simplifier) ?",
    format: "qcm",
    choices: ["3/7", "4/8", "6/9", "10/20"],
    expected: ["3/7"],
    comparator: "mcq_exact",
    hint: "Cherche celle dont le numérateur et le dénominateur n’ont pas de diviseur commun.",
    explanation: expl("3 et 7 n’ont aucun diviseur commun autre que 1 : 3/7 est irréductible."),
    tags: ["fraction_nombre", "simplifier", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_simplifier_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_simplifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Divise par le plus grand diviseur commun.",
    tags: ["fraction_nombre", "simplifier", "template"],
    // 09/10/2026 : grands diviseurs communs (4 à 12), situations × tournures × prénoms.
    generate: () => genSimplifierMix(3),
  },

  // =========================
  // TOP-UP — FRACTION_RATIONNEL (+6)
  // =========================
  {
    kind: "fixed",
    id: "fraction_rationnel_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Le nombre entier 4 est-il un nombre rationnel ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Peut-on écrire 4 comme un quotient d’entiers ?",
    explanation: expl("Oui : 4 = 4/1, c’est un quotient de deux entiers, donc 4 est un nombre rationnel."),
    tags: ["fraction_nombre", "rationnel"],
  },
  {
    kind: "fixed",
    id: "fraction_rationnel_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 2,
    theme: "neutral",
    text: "Écris le nombre rationnel 'cinq tiers' sous forme de fraction.",
    format: "short",
    expected: ["5/3"],
    comparator: "fraction_decimal_equivalent",
    hint: "Numérateur 5, dénominateur 3.",
    explanation: expl("'Cinq tiers' s’écrit 5/3."),
    tags: ["fraction_nombre", "rationnel"],
  },
  {
    kind: "fixed",
    id: "fraction_rationnel_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 3,
    theme: "neutral",
    text: "Pour qu’une fraction a/b soit un nombre rationnel, quelle condition doit respecter b ?",
    format: "qcm",
    choices: ["b doit être non nul", "b doit être positif", "b doit être pair", "b doit être premier"],
    expected: ["b doit être non nul"],
    comparator: "mcq_exact",
    hint: "On ne divise jamais par zéro.",
    explanation: expl("Une fraction a/b est définie seulement si b est non nul (on ne divise pas par 0)."),
    tags: ["fraction_nombre", "rationnel", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_rationnel_qcm_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle écriture représente un nombre rationnel négatif ?",
    format: "qcm",
    choices: ["−3/4", "3/4", "√3", "4/0"],
    expected: ["−3/4"],
    comparator: "mcq_exact",
    hint: "Un quotient d’entiers, avec un signe moins.",
    explanation: expl("−3/4 est un quotient de deux entiers, négatif : c’est un nombre rationnel négatif."),
    tags: ["fraction_nombre", "rationnel", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_rationnel_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Un nombre rationnel est un quotient de deux entiers. Écris 5 ÷ 7 sous forme de fraction.",
    format: "short",
    expected: ["5/7"],
    comparator: "fraction_decimal_equivalent",
    hint: "Le nombre divisé va en haut, le diviseur en bas.",
    explanation: expl("5 ÷ 7 s’écrit 5/7 : 5 en haut (numérateur), 7 en bas (dénominateur). C’est un nombre rationnel."),
    tags: ["fraction_nombre", "rationnel"],
  },
  {
    kind: "fixed",
    id: "fraction_rationnel_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_rationnel",
    difficulty: 2,
    theme: "neutral",
    text: "Écris le nombre rationnel 'moins sept demis' sous forme de fraction.",
    format: "short",
    expected: ["-7/2"],
    comparator: "fraction_decimal_equivalent",
    hint: "Signe moins, numérateur 7, dénominateur 2.",
    explanation: expl("'Moins sept demis' s’écrit -7/2."),
    tags: ["fraction_nombre", "rationnel"],
  },

  // =========================
  // TOP-UP — FRACTION_COMPARER (+4)
  // =========================
  {
    kind: "fixed",
    id: "fraction_comparer_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Compare $\\dfrac{5}{8}$ et $\\dfrac{3}{8}$.",
    format: "qcm",
    choices: [">", "<", "="],
    expected: [">"],
    comparator: "mcq_exact",
    hint: "Même dénominateur : on compare les numérateurs.",
    explanation: expl("Même dénominateur : 5 > 3, donc 5/8 > 3/8."),
    tags: ["fraction_nombre", "comparer"],
  },
  {
    kind: "fixed",
    id: "fraction_comparer_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle fraction est la plus grande ?",
    format: "qcm",
    choices: ["5/6", "2/3", "1/2", "3/8"],
    expected: ["5/6"],
    comparator: "mcq_exact",
    hint: "Compare les valeurs décimales.",
    explanation: expl("5/6 ≈ 0,83 ; 2/3 ≈ 0,67 ; 1/2 = 0,5 ; 3/8 ≈ 0,375. La plus grande est 5/6."),
    tags: ["fraction_nombre", "comparer", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_comparer_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Compare $\\dfrac{5}{7}$ et 1.",
    format: "qcm",
    choices: [">", "<", "="],
    expected: ["<"],
    comparator: "mcq_exact",
    hint: "1 = 7/7.",
    explanation: expl("1 = 7/7. Comme 5 < 7, 5/7 < 7/7, donc 5/7 < 1. Un numérateur plus petit que le dénominateur donne une fraction plus petite que 1."),
    tags: ["fraction_nombre", "comparer"],
  },
  {
    kind: "template",
    id: "fraction_comparer_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Écris les deux fractions avec le même dénominateur.",
    tags: ["fraction_nombre", "comparer", "template"],
    // 09/10/2026 : paires tirées, tournures × prénoms (correcteurs/fractions.ts).
    generate: () => genComparer(3),
  },

  // =========================
  // TOP-UP — FRACTION_ADDITIONNER (+2)
  // =========================
  {
    kind: "fixed",
    id: "fraction_additionner_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule $\\dfrac{2}{7} + \\dfrac{3}{7}$.",
    format: "short",
    expected: ["5/7"],
    comparator: "fraction_decimal_equivalent",
    hint: "Même dénominateur : additionne les numérateurs.",
    explanation: expl("2/7 + 3/7 = 5/7."),
    tags: ["fraction_nombre", "addition"],
  },
  {
    kind: "fixed",
    id: "fraction_additionner_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_additionner",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule $\\dfrac{2}{3} + \\dfrac{1}{6}$.",
    format: "short",
    expected: ["5/6"],
    comparator: "fraction_decimal_equivalent",
    hint: "Mets 2/3 sur 6.",
    explanation: expl("2/3 = 4/6, donc 2/3 + 1/6 = 4/6 + 1/6 = 5/6."),
    tags: ["fraction_nombre", "addition"],
  },

  // =========================
  // TOP-UP — FRACTION_MULTIPLIER (+5)
  // =========================
  {
    kind: "fixed",
    id: "fraction_multiplier_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule $\\dfrac{5}{8} \\times \\dfrac{8}{5}$.",
    format: "short",
    expected: ["1", "40/40"],
    comparator: "fraction_decimal_equivalent",
    hint: "Multiplie les numérateurs entre eux et les dénominateurs entre eux, puis regarde ce que tu obtiens.",
    explanation: expl(
      "5/8 × 8/5 = 40/40 = 1. Ces deux fractions sont inverses l’une de l’autre : leur produit vaut toujours 1.",
    ),
    tags: ["fraction_nombre", "produit", "inverse", "remarquable"],
  },
  {
    kind: "fixed",
    id: "fraction_multiplier_fixed_6",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule $\\dfrac{1}{2} \\times \\dfrac{4}{5}$.",
    format: "short",
    expected: ["2/5", "4/10"],
    comparator: "fraction_decimal_equivalent",
    hint: "Multiplie en haut et en bas.",
    explanation: expl("1/2 × 4/5 = 4/10 = 2/5."),
    tags: ["fraction_nombre", "produit"],
  },
  {
    kind: "fixed",
    id: "fraction_multiplier_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le résultat de $\\dfrac{3}{5} \\times \\dfrac{2}{3}$ ?",
    format: "qcm",
    choices: ["2/5", "5/8", "6/8", "1"],
    expected: ["2/5"],
    comparator: "mcq_exact",
    hint: "6/15 se simplifie.",
    explanation: expl("3/5 × 2/3 = 6/15 = 2/5."),
    tags: ["fraction_nombre", "produit", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_multiplier_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Calcule $\\dfrac{2}{5} \\times \\dfrac{3}{7}$.",
    format: "short",
    expected: ["6/35"],
    comparator: "fraction_decimal_equivalent",
    hint: "Multiplie les numérateurs entre eux et les dénominateurs entre eux.",
    explanation: expl("En haut : 2 × 3 = 6. En bas : 5 × 7 = 35. Donc 2/5 × 3/7 = 6/35."),
    tags: ["fraction_nombre", "produit"],
  },
  {
    kind: "template",
    id: "fraction_multiplier_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_multiplier",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie les numérateurs et les dénominateurs.",
    tags: ["fraction_nombre", "produit", "template"],
    // 09/10/2026 : produits tirés, situations × prénoms (correcteurs/fractions.ts).
    generate: () => genMultiplication(3),
  },

  // =========================
  // TOP-UP — FRACTION_QUANTITE (+4)
  // =========================
  {
    kind: "fixed",
    id: "fraction_quantite_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule $\\dfrac{1}{3}$ de 18.",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Divise 18 par 3.",
    explanation: expl("1/3 de 18 = 18 ÷ 3 = 6."),
    tags: ["fraction_nombre", "quantite"],
  },
  {
    kind: "fixed",
    id: "fraction_quantite_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule $\\dfrac{3}{5}$ de 25.",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "1/5 de 25 = 5.",
    explanation: expl("1/5 de 25 = 5, donc 3/5 de 25 = 3 × 5 = 15."),
    tags: ["fraction_nombre", "quantite"],
  },
  {
    kind: "fixed",
    id: "fraction_quantite_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "neutral",
    text: "Combien vaut $\\dfrac{2}{3}$ de 9 ?",
    format: "qcm",
    choices: ["6", "3", "5", "18"],
    expected: ["6"],
    comparator: "mcq_exact",
    hint: "1/3 de 9 = 3.",
    explanation: expl("1/3 de 9 = 3, donc 2/3 de 9 = 6."),
    tags: ["fraction_nombre", "quantite", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_quantite_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_quantite",
    difficulty: 3,
    theme: "reunion",
    hint: "Partage d’abord en parts égales.",
    tags: ["fraction_nombre", "quantite", "template", "reunion"],
    // 09/10/2026 : treize situations (La Réunion : une parmi treize), « combien en reste-t-il ? » ; prénoms.
    generate: () => genQuantite(3),
  },

  // =========================
  // TOP-UP — FRACTION_INVERSE (+7)
  // =========================

  // =========================
  // TOP-UP — FRACTION_DIVISER (+6)
  // =========================

  // =========================
  // TOP-UP — FRACTION_OPPOSE (+7)
  // =========================
  {
    kind: "fixed",
    id: "fraction_oppose_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_oppose",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est l’opposé de $\\dfrac{2}{7}$ ?",
    format: "short",
    expected: ["-2/7"],
    comparator: "fraction_decimal_equivalent",
    hint: "On change le signe.",
    explanation: expl("L’opposé de 2/7 est -2/7."),
    tags: ["fraction_nombre", "oppose"],
  },
  {
    kind: "fixed",
    id: "fraction_oppose_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_oppose",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est l’opposé de $-\\dfrac{4}{9}$ ?",
    format: "short",
    expected: ["4/9"],
    comparator: "fraction_decimal_equivalent",
    hint: "Le signe contraire de moins, c’est plus.",
    explanation: expl("L’opposé de −4/9 est 4/9."),
    tags: ["fraction_nombre", "oppose"],
  },
  {
    kind: "fixed",
    id: "fraction_oppose_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_oppose",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est l’opposé de $\\dfrac{5}{6}$ ?",
    format: "qcm",
    choices: ["−5/6", "6/5", "5/6", "−6/5"],
    expected: ["−5/6"],
    comparator: "mcq_exact",
    hint: "On change seulement le signe.",
    explanation: expl("L’opposé de 5/6 est -5/6."),
    tags: ["fraction_nombre", "oppose", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_oppose_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_oppose",
    difficulty: 3,
    theme: "neutral",
    text: "La somme d’une fraction et de son opposé vaut :",
    format: "qcm",
    choices: ["0", "1", "2 fois la fraction", "l’inverse"],
    expected: ["0"],
    comparator: "mcq_exact",
    hint: "Essaie 3/5 + (-3/5).",
    explanation: expl("Une fraction plus son opposé donne toujours 0 (ex. 3/5 + (-3/5) = 0)."),
    tags: ["fraction_nombre", "oppose", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_oppose_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_oppose",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "L’inverse de $\\dfrac{2}{3}$ est $\\dfrac{3}{2}$. Quel est l’opposé de $\\dfrac{2}{3}$ ?",
    format: "qcm",
    choices: ["−2/3", "3/2", "−3/2"],
    expected: ["−2/3"],
    comparator: "mcq_exact",
    hint: "L’opposé change seulement le signe. L’inverse échange le haut et le bas.",
    explanation: expl("L’opposé change seulement le signe : l’opposé de 2/3 est -2/3. L’inverse, lui, échange le haut et le bas : 3/2."),
    tags: ["fraction_nombre", "oppose", "qcm"],
  },
  {
    kind: "template",
    id: "fraction_oppose_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_oppose",
    difficulty: 2,
    theme: "neutral",
    hint: "On change uniquement le signe.",
    tags: ["fraction_nombre", "oppose", "template"],
    // 09/10/2026 : fractions tirées (positives ou négatives), « + … = 0 », QCM opposé / inverse, prénoms.
    generate: () => genOppose(2),
  },
  {
    kind: "template",
    id: "fraction_oppose_tpl_s1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_oppose",
    difficulty: 1,
    theme: "neutral",
    hint: "On change uniquement le signe.",
    tags: ["fraction_nombre", "oppose", "template"],
    generate: () => genOppose(1),
  },
  {
    kind: "template",
    id: "fraction_oppose_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_oppose",
    difficulty: 3,
    theme: "neutral",
    hint: "Le signe contraire de moins, c’est plus.",
    tags: ["fraction_nombre", "oppose", "template", "signe"],
    // 09/10/2026 : affirmations à vérifier, opposé de l'opposé, somme de deux opposés, prénoms.
    generate: () => genOppose(3),
  },

  // =========================
  // TOP-UP — FRACTION_DEFI (+6)
  // =========================
  {
    kind: "fixed",
    id: "fraction_defi_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_calcul_defi",
    difficulty: 4,
    theme: "reunion",
    text: "À La Réunion, Tom parcourt $\\dfrac{3}{4}$ d’un sentier de 12 km. Combien de kilomètres a-t-il parcourus ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Calcule 3/4 de 12.",
    explanation: expl("3/4 de 12 = 12 × 3/4 = 9 km."),
    tags: ["fraction_nombre", "defi", "reunion", "quantite"],
  },
  {
    kind: "fixed",
    id: "fraction_defi_qcm_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle fraction est égale à 1 ?",
    format: "qcm",
    choices: ["7/7", "7/8", "8/7", "0/7"],
    expected: ["7/7"],
    comparator: "mcq_exact",
    hint: "Numérateur = dénominateur.",
    explanation: expl("Une fraction dont le numérateur égale le dénominateur vaut 1 : 7/7 = 1."),
    tags: ["fraction_nombre", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_defi_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_calcul_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Calcule $\\dfrac{1}{2} + \\dfrac{1}{3} + \\dfrac{1}{6}$.",
    format: "short",
    expected: ["1", "6/6"],
    comparator: "fraction_decimal_equivalent",
    hint: "Mets tout sur 6.",
    explanation: expl("1/2 = 3/6, 1/3 = 2/6, 1/6 = 1/6. Somme = 3/6 + 2/6 + 1/6 = 6/6 = 1."),
    tags: ["fraction_nombre", "defi", "addition"],
  },
  {
    kind: "fixed",
    id: "fraction_defi_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_calcul_defi",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Un élève écrit : $\\dfrac{2}{3} \\times \\dfrac{2}{3} = \\dfrac{4}{3}$. C’est faux. Quel est le bon résultat ?",
    format: "qcm",
    choices: ["4/9", "4/3", "4/6", "2/3"],
    expected: ["4/9"],
    comparator: "mcq_exact",
    hint: "On multiplie aussi les dénominateurs.",
    explanation: expl("En haut : 2 × 2 = 4. En bas : 3 × 3 = 9. Donc 2/3 × 2/3 = 4/9. L’élève a oublié de multiplier les dénominateurs."),
    tags: ["fraction_nombre", "defi", "erreur", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_defi_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Dans une classe, $\\dfrac{2}{5}$ des élèves font de l’espagnol et $\\dfrac{1}{3}$ de l’allemand. Quelle langue est choisie par le plus d’élèves ?",
    format: "qcm",
    choices: ["espagnol", "allemand", "autant des deux", "aucun"],
    expected: ["espagnol"],
    comparator: "mcq_exact",
    hint: "Compare 2/5 et 1/3 (mets sur 15).",
    explanation: expl("2/5 = 6/15 et 1/3 = 5/15. Comme 6/15 > 5/15, l’espagnol est choisi par plus d’élèves."),
    tags: ["fraction_nombre", "defi", "qcm", "comparer"],
  },
  {
    kind: "template",
    id: "fraction_defi_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_calcul_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Fais une étape à la fois : calcule chaque part, puis additionne ou retire.",
    tags: ["fraction_nombre", "defi", "template", "quantite"],
    // ⛔ 09/10/2026 — l'ancien gabarit tirait « 3/3 de sa récolte ». Plusieurs étapes : deux parts d'une
    // quantité, une part prise sur ce qui reste, trois fractions ; situations × prénoms.
    generate: () => genCalculDefi(5),
  },
  {
    kind: "template",
    id: "fraction_calcul_defi_tpl_s4",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_calcul",
    microId: "fraction_calcul_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Fais une étape à la fois : calcule chaque part, puis additionne ou retire.",
    tags: ["fraction_calcul", "defi", "template"],
    generate: () => genCalculDefi(4),
  },

  /* ===== FRACTION_DEFI =====
     Défis de lecture et de comparaison. Les défis de calcul sont partis vers
     fraction_calcul_defi le 04/08/2026 ; ce qui reste ici se joue à l'œil et
     au raisonnement, pas à la règle de calcul. */
  {
    kind: "fixed",
    id: "fraction_defi_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Range ces trois fractions de la plus petite à la plus grande : $\\dfrac{1}{2}$ ; $\\dfrac{1}{5}$ ; $\\dfrac{1}{3}$",
    format: "qcm",
    choices: [
      "1/5 ; 1/3 ; 1/2",
      "1/2 ; 1/3 ; 1/5",
      "1/2 ; 1/5 ; 1/3",
      "1/3 ; 1/5 ; 1/2",
    ],
    expected: ["1/5 ; 1/3 ; 1/2"],
    comparator: "mcq_exact",
    hint: "Partage un même gâteau en 2, puis en 5. Quelle part est la plus grosse ?",
    explanation: expl(
      "Le numérateur est le même : c’est le dénominateur qui décide. Plus on partage en un grand nombre de parts, plus chaque part est petite. Donc 1/5 < 1/3 < 1/2.",
    ),
    tags: ["fraction_nombre", "defi", "comparer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_defi_qcm_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Une fraction est plus grande que 1. Que peut-on dire de son numérateur ?",
    format: "qcm",
    choices: [
      "il est plus grand que le dénominateur",
      "il est plus petit que le dénominateur",
      "il est égal au dénominateur",
      "il est toujours pair",
    ],
    expected: ["il est plus grand que le dénominateur"],
    comparator: "mcq_exact",
    hint: "Compare avec une fraction qui vaut exactement 1.",
    explanation: expl(
      "Une fraction vaut 1 quand son numérateur est égal à son dénominateur, comme 7/7. Pour dépasser 1, il faut donc un numérateur plus grand que le dénominateur : 9/7 est plus grand que 1.",
    ),
    tags: ["fraction_nombre", "defi", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_defi_fixed_6",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Sur le marché forain de Saint-Pierre, Malia achète $\\dfrac{3}{4}$ d’un sac de letchis, Kevin $\\dfrac{5}{8}$ du même sac. Qui en a acheté le plus ?",
    format: "qcm",
    choices: ["Malia", "Kevin", "les deux pareil", "on ne peut pas comparer"],
    expected: ["Malia"],
    comparator: "mcq_exact",
    hint: "Écris les deux fractions avec le même dénominateur.",
    explanation: expl(
      "On met les deux fractions sur 8 : 3/4 = 6/8. Il reste à comparer 6/8 et 5/8. Le dénominateur est maintenant le même, donc le plus grand numérateur gagne : 6 > 5, Malia a acheté le plus.",
    ),
    tags: ["fraction_nombre", "defi", "comparer", "reunion", "qcm"],
  },
  {
    kind: "fixed",
    id: "fraction_defi_open_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 5,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Un élève dit : « $\\dfrac{3}{8} > \\dfrac{1}{2}$ car 3 > 1 et 8 > 2 ». Compare toi-même $\\dfrac{3}{8}$ et $\\dfrac{1}{2}$.",
    format: "qcm",
    choices: [">", "<", "="],
    expected: ["<"],
    comparator: "mcq_exact",
    hint: "Combien de huitièmes font une moitié ?",
    explanation: expl(
      "On ne compare pas les numérateurs et les dénominateurs séparément. Il faut le même dénominateur : 1/2 = 4/8. On compare alors 3/8 et 4/8, et 3 < 4. Donc 3/8 est plus PETIT que 1/2.",
    ),
    tags: ["fraction_nombre", "defi", "qcm", "piege"],
  },
  {
    kind: "template",
    id: "fraction_defi_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Même numérateur : c’est le dénominateur qui décide, et il décide à l’envers.",
    tags: ["fraction_nombre", "defi", "comparer", "template"],
    // 09/10/2026 : parts d'objets identiques (même numérateur), ranger trois fractions, prénoms.
    generate: () => genDefiNombre(4),
  },
  {
    kind: "template",
    id: "fraction_defi_tpl_s3",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare le numérateur et le dénominateur ; plus on partage, plus les parts sont petites.",
    tags: ["fraction_nombre", "defi", "template"],
    generate: () => genDefiNombre(3),
  },
  {
    kind: "template",
    id: "fraction_defi_tpl_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "fraction_nombre",
    microId: "fraction_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Écris 1/2 avec le même dénominateur.",
    tags: ["fraction_nombre", "defi", "qcm", "template"],
    // 09/10/2026 : comparer à la moitié, ou deux fractions de part et d'autre de 1/2 ; prénoms.
    generate: () => genDefiNombre(5),
  },
];