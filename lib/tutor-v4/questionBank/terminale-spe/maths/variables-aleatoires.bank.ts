// lib/tutor-v4/questionBank/terminale-spe/maths/variables-aleatoires.bank.ts
//
// Notion : Variables aléatoires (variable_aleatoire) — Terminale spé.
//
// microSkills :
//   va_definition          — Comprendre une variable aléatoire
//   va_loi_probabilite     — Déterminer la loi d'une variable aléatoire
//   va_esperance           — Calculer une espérance (et E(aX + b))
//   va_variance_ecart_type — Calculer une variance, un écart-type (et V(aX + b))
//   va_interpreter         — Interpréter espérance, écart-type, jeu équitable
//   va_defi                — Exercice type bac
//
/* =========================================================================
   ⛔⛔ 15/10/2026 — « DES QUESTIONS REVIENNENT ».
   Mesuré avant (scripts/mesurer-squelettes-coach.ts terminale-spe
   variable_aleatoire) : les 6 micros sous le seuil, 8 à 10 squelettes par
   micro, 14 à 18 répétitions sur 20. Toute la notion tournait autour d'UNE
   loi (X ∈ {0 ; 1 ; 2}, P = 0,2 / 0,5 / 0,3) : l'élève reconnaissait la phrase.
   Même méthode que les probabilités de 3e (dd5e9f75) : les items figés sont
   devenus des gabarits (ids gardés) qui composent
     · une SITUATION tirée parmi une trentaine : sac de billes, bonbons coco,
       pêche aux canards, roue de kermesse, tombola, tickets à gratter, dés
       (cubique, jeu de rôle), deux dés, pièces, cartes, enquête dans une
       classe, car jaune, barquettes de letchis, basket, pluie à Cilaos,
       baleines à Saint-Leu, fléchettes… avec des effectifs TIRÉS ;
     · une TOURNURE (plusieurs façons de poser la même question) ;
     · des nombres tirés, les calculs faits EXACTEMENT en fractions (type R) :
       E(X), E(X²), V(X) ne sont jamais arrondis ; σ(X) l'est, au centième,
       et l'énoncé l'annonce.
   QCM : vrais leurres (moyenne des valeurs au lieu de l'espérance, oubli de
   la mise, E(X²) − E(X), oubli de la racine, a·V au lieu de a²·V…) ; jamais
   deux choix de même valeur (qcmR compare les VALEURS).
========================================================================= */

import type {
  CanvasFigure,
  DifficultyLevel,
  TutorBankItemV4,
  TutorGeneratedQuestionV4,
} from "@/lib/tutor-v4/types";
import { PRENOMS, type Prenom } from "@/lib/tutor-v4/questionBank/6e/maths/entiers.bank";

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
function pgcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : pgcd(b, a % b);
}
const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const pl = (k: number, s: string, p: string) => (Math.abs(k) >= 2 ? p : s);
/** « de Hugo », « d'Inès ». */
const deN = (p: Prenom) => (/^[AEIOUÉÈÂÎH]/i.test(p.nom) ? `d'${p.nom}` : `de ${p.nom}`);

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

/* ---------- Les rationnels exacts ---------- */
type R = { n: number; d: number };
function r(n: number, d = 1): R {
  if (d < 0) {
    n = -n;
    d = -d;
  }
  const g = pgcd(Math.abs(n), d) || 1;
  return { n: n / g, d: d / g };
}
const add = (a: R, b: R) => r(a.n * b.d + b.n * a.d, a.d * b.d);
const sub = (a: R, b: R) => r(a.n * b.d - b.n * a.d, a.d * b.d);
const mul = (a: R, b: R) => r(a.n * b.n, a.d * b.d);
const val = (a: R) => a.n / a.d;
const somme = (xs: R[]) => xs.reduce((s, x) => add(s, x), r(0));

/** L'écriture LaTeX (sans $) : décimal s'il tombe juste (4 décimales au plus), sinon fraction. */
function tx(a: R): string {
  let d = a.d;
  while (d % 2 === 0) d /= 2;
  while (d % 5 === 0) d /= 5;
  if (d === 1) {
    const s = String(Math.round(val(a) * 1e6) / 1e6);
    if ((s.split(".")[1] ?? "").length <= 4) return s.replace(".", "{,}");
  }
  return `${a.n < 0 ? "-" : ""}\\dfrac{${Math.abs(a.n)}}{${a.d}}`;
}
/** « $0{,}35$ », « $\dfrac{7}{6}$ ». */
const m = (a: R) => `$${tx(a)}$`;
/** Pour le tableau dessiné (texte brut) : « 0,35 », « 7/6 ». */
const brut = (a: R) => tx(a).replace("{,}", ",").replace(/\\dfrac\{(\d+)\}\{(\d+)\}/, "$1/$2");
/** Le nombre décimal a/b tombe-t-il juste ? */
const estDecimal = (a: R) => !tx(a).includes("dfrac");
/** Un réel arrondi au centième, en LaTeX : « $1{,}41$ ». */
const arr2 = (x: number) => `$${(Math.round(x * 100) / 100).toFixed(2).replace(".", "{,}")}$`;
/** Un décimal au plus 2 chiffres après la virgule, en LaTeX (σ « juste »). */
const dec = (x: number) => `$${String(Math.round(x * 100) / 100).replace(".", "{,}")}$`;
/** « $3$ € », « $-0{,}5$ € ». */
const eur = (a: R) => `${m(a)} €`;

/** Bonne réponse + trois leurres DISTINCTS au texte. */
function qcmS(correct: string, leurres: string[]): { choices: string[]; expected: string[] } {
  const d = melange([...new Set(leurres)].filter((w) => w !== correct)).slice(0, 3);
  return { choices: melange([correct, ...d]), expected: [correct] };
}
/**
 * Un QCM sur une valeur exacte : trois leurres distincts EN VALEUR. Les
 * `garder` premiers pièges passent toujours ; des voisins de secours
 * complètent si les pièges se recoupent.
 */
function qcmR(bon: R, pieges: R[], f: (a: R) => string = m, garder = 1): { choices: string[]; expected: string[] } {
  const secours = [add(bon, r(1)), sub(bon, r(1)), mul(bon, r(2)), mul(bon, r(1, 2)), r(-bon.n, bon.d), add(bon, r(1, 10)), add(bon, r(5))];
  const pris: R[] = [];
  for (const x of [...pieges.slice(0, garder), ...melange(pieges.slice(garder)), ...secours]) {
    if (pris.length === 3) break;
    if (!Number.isFinite(val(x))) continue;
    if ([bon, ...pris].some((g) => Math.abs(val(g) - val(x)) < 1e-9 || f(g) === f(x))) continue;
    pris.push(x);
  }
  const c = f(bon);
  return { choices: melange([c, ...pris.map(f)]), expected: [c] };
}
/** Un QCM de PROBABILITÉ : leurres et secours restent dans ]0 ; 1[. */
function qcmP(bon: R, pieges: R[]): { choices: string[]; expected: string[] } {
  const dans = (x: R) => val(x) > 0 && val(x) < 1;
  const secours = [sub(r(1), bon), mul(bon, r(1, 2)), add(bon, r(1, 10)), sub(bon, r(1, 10)), add(bon, r(1, 20)), sub(bon, r(1, 20)), add(bon, r(1, 5))];
  return qcmR(bon, [...pieges.filter(dans), ...secours.filter(dans)], m, pieges.length && dans(pieges[0]) ? 1 : 0);
}
/** Même chose pour des réels arrondis (écart-type) : distincts au texte. */
function qcmN(bon: number, pieges: number[], f: (x: number) => string = arr2): { choices: string[]; expected: string[] } {
  const secours = [bon + 1, bon / 2, bon * 2, bon + 0.5, bon + 0.1];
  const c = f(bon);
  const pris: string[] = [];
  for (const x of [pieges[0], ...melange(pieges.slice(1)), ...secours]) {
    if (pris.length === 3) break;
    if (x === undefined || !Number.isFinite(x) || x < 0) continue;
    const t = f(x);
    if (t === c || pris.includes(t)) continue;
    pris.push(t);
  }
  return { choices: melange([c, ...pris]), expected: [c] };
}

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
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "variable_aleatoire",
    microId,
    difficulty,
    theme,
    hint,
    tags: ["terminale-spe", "variable_aleatoire", ...tags, "template"],
    generate,
  };
}

/* =========================================================================
   LES SITUATIONS. Une situation donne une variable aléatoire à valeurs
   entières : ses issues (valeur v, effectif n sur D, et l'événement en
   français « la bille tirée est rouge »).
     · comptage : la loi se DÉDUIT de l'énoncé (n / D) ;
     · donnée   : la loi est fournie en décimaux (relevés, statistiques).
   `argent` : la valeur est un gain en euros (on peut alors ajouter une mise).
========================================================================= */
type Issue = { v: number; n: number; ev: string };
type Sit = {
  intro: string;
  /** Ce que mesure la variable : « le gain du joueur, en euros ». */
  X: string;
  issues: Issue[];
  D: number;
  argent: boolean;
  donnee: boolean;
  /** Le nom de la variable : X, ou G pour un gain algébrique. */
  L: string;
  theme: "neutral" | "reunion";
};

function sit(intro: string, X: string, issues: Issue[], o: { argent?: boolean; donnee?: boolean; reunion?: boolean } = {}): Sit {
  const tri = [...issues].filter((i) => i.n > 0).sort((a, b) => a.v - b.v);
  return {
    intro,
    X,
    issues: tri,
    D: tri.reduce((s, i) => s + i.n, 0),
    argent: !!o.argent,
    donnee: !!o.donnee,
    L: "X",
    theme: o.reunion ? "reunion" : "neutral",
  };
}

/** Un effectif « 1 bille rouge », « 3 billes rouges ». */
const nb = (n: number, s: string, p: string) => `${n} ${n >= 2 ? p : s}`;

/* ---------- 1. Les contenants : on tire UN objet ---------- */
type Sorte = [string, string]; // singulier, pluriel (accordés à l'objet)
type Urne = { cont: string; objS: string; objP: string; f: boolean; tire: string; sujet: string; sortes: Sorte[]; reunion?: boolean; ordonne?: boolean };
const URNES: Urne[] = [
  { cont: "Dans un sac opaque", objS: "bille", objP: "billes", f: true, tire: "On tire une bille au hasard", sujet: "la bille tirée est", sortes: [["rouge", "rouges"], ["verte", "vertes"], ["noire", "noires"], ["bleue", "bleues"], ["jaune", "jaunes"]] },
  { cont: "Dans une urne", objS: "boule", objP: "boules", f: true, tire: "On prend une boule au hasard", sujet: "la boule prise est", sortes: [["blanche", "blanches"], ["noire", "noires"], ["rouge", "rouges"], ["grise", "grises"]] },
  { cont: "Dans une boîte du stand de la kermesse", objS: "enveloppe", objP: "enveloppes", f: true, tire: "Chaque joueur ouvre une enveloppe prise au hasard", sujet: "l'enveloppe ouverte est", sortes: [["dorée", "dorées"], ["argentée", "argentées"], ["blanche", "blanches"]], ordonne: true },
  { cont: "Dans un panier de Pâques", objS: "œuf en chocolat", objP: "œufs en chocolat", f: false, tire: "On prend un œuf au hasard", sujet: "l'œuf pris est", sortes: [["doré", "dorés"], ["argenté", "argentés"], ["rouge", "rouges"]], ordonne: true },
  { cont: "Dans un bocal du marché de Saint-Paul", objS: "bonbon coco", objP: "bonbons coco", f: false, tire: "On prend un bonbon au hasard", sujet: "le bonbon pris est", sortes: [["rose", "roses"], ["blanc", "blancs"], ["jaune", "jaunes"], ["vert", "verts"]], reunion: true },
  { cont: "Dans le bassin de la pêche aux canards", objS: "canard", objP: "canards", f: false, tire: "On pêche un canard au hasard", sujet: "le canard pêché est", sortes: [["marqué d'une étoile", "marqués d'une étoile"], ["marqué d'un rond", "marqués d'un rond"], ["sans marque", "sans marque"]], ordonne: true },
  { cont: "Dans un chapeau", objS: "jeton", objP: "jetons", f: false, tire: "On tire un jeton au hasard", sujet: "le jeton tiré est", sortes: [["rouge", "rouges"], ["bleu", "bleus"], ["blanc", "blancs"], ["vert", "verts"]] },
  { cont: "Dans un sachet de cartes Pokémon", objS: "carte", objP: "cartes", f: true, tire: "On tire une carte du sachet au hasard", sujet: "la carte obtenue est", sortes: [["holographique", "holographiques"], ["rare", "rares"], ["commune", "communes"]], ordonne: true },
];

/** Une urne à 3 sortes ; chaque sorte rapporte un gain (le dernier vaut souvent 0). */
function sitUrne(): Sit {
  const u = pick(URNES);
  const [s1, s2, s3] = u.ordonne ? u.sortes : melange(u.sortes).slice(0, 3);
  const [n1, n2, n3] = [ri(1, 4), ri(2, 6), ri(3, 10)];
  const a = ri(4, 12) * pick([1, 2]);
  const b = ri(1, Math.min(a - 1, 6));
  const c = 0;
  const un = u.f ? "une" : "un";
  const intro =
    `${u.cont}, il y a ${nb(n1, `${u.objS} ${s1[0]}`, `${u.objP} ${s1[1]}`)}, ${nb(n2, `${u.objS} ${s2[0]}`, `${u.objP} ${s2[1]}`)} et ${nb(n3, `${u.objS} ${s3[0]}`, `${u.objP} ${s3[1]}`)}. ` +
    `${u.tire}. ${maj(un)} ${u.objS} ${s1[0]} rapporte ${a} €, ${un} ${u.objS} ${s2[0]} rapporte ${b} € et ${un} ${u.objS} ${s3[0]} ne rapporte rien.`;
  return sit(intro, pick(["le gain obtenu, en euros", "la somme gagnée, en euros"]), [
    { v: a, n: n1, ev: `${u.sujet} ${s1[0]}` },
    { v: b, n: n2, ev: `${u.sujet} ${s2[0]}` },
    { v: c, n: n3, ev: `${u.sujet} ${s3[0]}` },
  ], { argent: true, reunion: u.reunion });
}

const LIEUX_FETE = ["à la kermesse du collège", "à la fête de l'école", "à la fête foraine du Port", "à la fête de quartier", "au stand du club de foot de Saint-Leu", "à la kermesse de l'école de Cilaos"];
const COULEURS_ROUE: Sorte[] = [["rouge", "rouges"], ["jaune", "jaunes"], ["bleu", "bleus"], ["vert", "verts"], ["violet", "violets"]];

/** Une roue à secteurs égaux. */
function sitRoue(): Sit {
  const N = pick([8, 10, 12, 16, 20]);
  const [c1, c2, c3] = melange(COULEURS_ROUE).slice(0, 3);
  const n1 = ri(1, Math.floor(N / 4));
  const n2 = ri(1, Math.floor(N / 3));
  const n3 = N - n1 - n2;
  const a = pick([5, 8, 10, 12, 15, 20]);
  const b = ri(1, Math.min(4, a - 1));
  const lieu = pick(LIEUX_FETE);
  const intro =
    `${maj(lieu)}, une roue est partagée en ${N} secteurs de même taille : ${nb(n1, `secteur ${c1[0]}`, `secteurs ${c1[1]}`)}, ${nb(n2, `secteur ${c2[0]}`, `secteurs ${c2[1]}`)}, les autres sont ${c3[1]}. ` +
    `On fait tourner la roue : un secteur ${c1[0]} rapporte ${a} €, un secteur ${c2[0]} rapporte ${b} €, un secteur ${c3[0]} ne rapporte rien.`;
  return sit(intro, pick(["le gain obtenu, en euros", "la somme gagnée, en euros"]), [
    { v: a, n: n1, ev: `la roue s'arrête sur un secteur ${c1[0]}` },
    { v: b, n: n2, ev: `la roue s'arrête sur un secteur ${c2[0]}` },
    { v: 0, n: n3, ev: `la roue s'arrête sur un secteur ${c3[0]}` },
  ], { argent: true, reunion: /Port|Leu|Cilaos/.test(lieu) });
}

const ORGANISATEURS = [
  "l'association des parents d'élèves",
  "le club de handball du Tampon",
  "l'amicale des pompiers de Saint-Benoît",
  "la classe de terminale (pour son voyage)",
  "le club de football de Saint-Leu",
  "la troupe de théâtre du lycée",
];

/** Une tombola ou des tickets à gratter : T billets, des gros lots et des petits lots. */
function sitTombola(): Sit {
  const T = pick([50, 100, 200, 250, 500, 1000]);
  const n1 = ri(1, T >= 500 ? 5 : 3);
  const n2 = pick([5, 10, 15, 20, 25, 40]) * (T >= 500 ? 2 : 1);
  const a = pick([50, 80, 100, 150, 200]);
  const b = pick([2, 5, 10, 20]);
  const n3 = T - n1 - n2;
  if (Math.random() < 0.5) {
    const org = pick(ORGANISATEURS);
    const intro = `Pour une tombola, ${org} vend ${T} billets. Parmi eux, ${nb(n1, "billet gagne", "billets gagnent")} un gros lot de ${a} €, ${nb(n2, "billet gagne", "billets gagnent")} un lot de ${b} €, les autres sont perdants. On achète un billet au hasard.`;
    return sit(intro, pick(["la valeur du lot obtenu, en euros", "le gain obtenu, en euros"]), [
      { v: a, n: n1, ev: "le billet gagne un gros lot" },
      { v: b, n: n2, ev: "le billet gagne un petit lot" },
      { v: 0, n: n3, ev: "le billet est perdant" },
    ], { argent: true, reunion: /Tampon|Benoît|Leu/.test(org) });
  }
  const intro = `Un buraliste reçoit un lot de ${T} tickets à gratter : ${nb(n1, "ticket rapporte", "tickets rapportent")} ${a} €, ${nb(n2, "ticket rapporte", "tickets rapportent")} ${b} €, les autres ne rapportent rien. ${pick(["Un client", "Une cliente"])} achète un ticket de ce lot au hasard.`;
  return sit(intro, pick(["la somme gagnée, en euros", "le gain obtenu, en euros"]), [
    { v: a, n: n1, ev: `le ticket rapporte ${a} €` },
    { v: b, n: n2, ev: `le ticket rapporte ${b} €` },
    { v: 0, n: n3, ev: "le ticket ne rapporte rien" },
  ], { argent: true });
}

/** Un dé équilibré (cubique ou de jeu de rôle) et une règle par seuils ou par parité. */
function sitDe(): Sit {
  const F = pick([6, 6, 8, 10, 12, 20]);
  const nomDe = F === 6 ? "un dé cubique équilibré" : `un dé équilibré à ${F} faces numérotées de 1 à ${F}`;
  const a = pick([6, 8, 10, 12, 15, 20]);
  const b = ri(1, 5);
  if (F % 2 === 0 && Math.random() < 0.35) {
    // Parité : F → a, autre pair → b, impair → rien.
    const p = pick(PRENOMS);
    const il = p.f ? "elle" : "il";
    const si = p.f ? "Si elle" : "S'il";
    const intro = `${p.nom} lance ${nomDe}. ${si} obtient ${F}, ${il} gagne ${a} € ; ${si.toLowerCase()} obtient un autre numéro pair, ${il} gagne ${b} € ; avec un numéro impair, ${il} ne gagne rien.`;
    return sit(intro, `le gain ${deN(p)}, en euros`, [
      { v: a, n: 1, ev: `le dé donne ${F}` },
      { v: b, n: F / 2 - 1, ev: `le dé donne un numéro pair autre que ${F}` },
      { v: 0, n: F / 2, ev: "le dé donne un numéro impair" },
    ], { argent: true });
  }
  const t = ri(Math.ceil(F / 2) + 1, F); // numéros ≥ t : gros gain
  const u = ri(2, t - 1); // numéros de u à t − 1 : petit gain
  const intro =
    `On lance ${nomDe}. Si le numéro est supérieur ou égal à ${t}, on gagne ${a} € ; ` +
    `s'il est compris entre ${u} et ${t - 1}, on gagne ${b} € ; sinon, on ne gagne rien.`;
  return sit(intro, pick(["le gain, en euros", "la somme gagnée, en euros"]), [
    { v: a, n: F - t + 1, ev: `le numéro obtenu est supérieur ou égal à ${t}` },
    { v: b, n: t - u, ev: `le numéro obtenu est compris entre ${u} et ${t - 1}` },
    { v: 0, n: u - 1, ev: `le numéro obtenu est inférieur ou égal à ${u - 1}` },
  ], { argent: true });
}

/** Deux dés cubiques équilibrés (36 issues). */
function sitDeuxDes(): Sit {
  const a = pick([10, 12, 15, 20, 30]);
  const b = ri(2, 6);
  if (Math.random() < 0.5) {
    const intro = `On lance deux dés cubiques équilibrés. Un double rapporte ${a} €, une somme égale à 7 rapporte ${b} €, tout autre résultat ne rapporte rien.`;
    return sit(intro, "le gain, en euros", [
      { v: a, n: 6, ev: "on obtient un double" },
      { v: b, n: 6, ev: "la somme des deux dés vaut 7" },
      { v: 0, n: 24, ev: "on n'obtient ni un double ni une somme égale à 7" },
    ], { argent: true });
  }
  const intro = `Au jeu des petits chevaux, on lance deux dés cubiques équilibrés. Un double six rapporte ${a} jetons, un autre double rapporte ${b} jetons, le reste ne rapporte rien.`;
  return sit(intro, "le nombre de jetons gagnés", [
    { v: a, n: 1, ev: "on obtient un double six" },
    { v: b, n: 5, ev: "on obtient un double autre que le double six" },
    { v: 0, n: 30, ev: "on n'obtient pas de double" },
  ]);
}

/** k pièces équilibrées : X = nombre de « pile », ou gain proportionnel. */
function sitPieces(): Sit {
  const k = pick([2, 3]);
  const binom = k === 2 ? [1, 2, 1] : [1, 3, 3, 1];
  const qui = pick(["On lance", "Inès lance", "Yanis lance", "Pour départager deux équipes, l'arbitre lance"]);
  if (Math.random() < 0.5) {
    const intro = `${qui} ${k === 2 ? "deux" : "trois"} pièces équilibrées.`;
    return sit(intro, "le nombre de « pile » obtenus", binom.map((n, j) => ({ v: j, n, ev: j === 0 ? "aucune pièce ne tombe sur pile" : `exactement ${j} ${pl(j, "pièce tombe", "pièces tombent")} sur pile` })));
  }
  const a = pick([2, 3, 4, 5]);
  const intro = `${qui} ${k === 2 ? "deux" : "trois"} pièces équilibrées ; chaque « pile » rapporte ${a} €.`;
  return sit(intro, "le gain, en euros", binom.map((n, j) => ({ v: a * j, n, ev: j === 0 ? "aucune pièce ne tombe sur pile" : `exactement ${j} ${pl(j, "pièce tombe", "pièces tombent")} sur pile` })), { argent: true });
}

/** Une carte tirée d'un jeu de 32 ou de 52 cartes. */
function sitCartes(): Sit {
  const N = pick([32, 52]);
  const a = pick([5, 10, 15, 20]);
  const b = ri(1, 4);
  const intro = `On tire une carte au hasard dans un jeu de ${N} cartes. Un as rapporte ${a} €, une figure (roi, dame ou valet) rapporte ${b} €, les autres cartes ne rapportent rien.`;
  return sit(intro, "le gain, en euros", [
    { v: a, n: 4, ev: "la carte tirée est un as" },
    { v: b, n: 12, ev: "la carte tirée est une figure" },
    { v: 0, n: N - 16, ev: "la carte tirée n'est ni un as ni une figure" },
  ], { argent: true });
}

/** Découpe `total` en `k` parts entières, chacune ≥ `min`. */
function parts(total: number, k: number, min = 1): number[] {
  const out = Array(k).fill(min);
  for (let i = 0; i < total - k * min; i++) out[ri(0, k - 1)]++;
  return out;
}

/** Une enquête dans une classe : on choisit un élève au hasard. */
const ENQUETES: { quoi: string; sur: string; ev: (k: number) => string; max: number }[] = [
  { quoi: "le nombre de frères et sœurs de l'élève choisi", sur: "leur nombre de frères et sœurs", ev: (k) => (k === 0 ? "l'élève choisi n'a ni frère ni sœur" : `l'élève choisi a ${k} ${pl(k, "frère ou sœur", "frères et sœurs")}`), max: 3 },
  { quoi: "le nombre d'animaux de compagnie de l'élève choisi", sur: "leur nombre d'animaux de compagnie", ev: (k) => (k === 0 ? "l'élève choisi n'a pas d'animal" : `l'élève choisi a ${k} ${pl(k, "animal", "animaux")}`), max: 3 },
  { quoi: "le nombre de livres lus pendant les vacances par l'élève choisi", sur: "le nombre de livres lus pendant les vacances", ev: (k) => (k === 0 ? "l'élève choisi n'a lu aucun livre" : `l'élève choisi a lu ${k} ${pl(k, "livre", "livres")}`), max: 4 },
  { quoi: "le nombre de jours où l'élève choisi a pris le car jaune cette semaine", sur: "le nombre de jours où ils ont pris le car jaune cette semaine", ev: (k) => (k === 0 ? "l'élève choisi n'a pas pris le car jaune" : `l'élève choisi a pris le car jaune ${k} ${pl(k, "jour", "jours")}`), max: 5 },
  { quoi: "le nombre de randonnées faites dans les cirques par l'élève choisi cette année", sur: "le nombre de randonnées faites dans les cirques cette année", ev: (k) => (k === 0 ? "l'élève choisi n'a fait aucune randonnée" : `l'élève choisi a fait ${k} ${pl(k, "randonnée", "randonnées")}`), max: 3 },
  { quoi: "le nombre de matchs joués le week-end dernier par l'élève choisi", sur: "le nombre de matchs joués le week-end dernier", ev: (k) => (k === 0 ? "l'élève choisi n'a joué aucun match" : `l'élève choisi a joué ${k} ${pl(k, "match", "matchs")}`), max: 2 },
];
const CLASSES = ["de la terminale 2 du lycée de Saint-Pierre", "d'une classe de terminale du Tampon", "de la terminale 4 du lycée Leconte-de-Lisle", "d'une classe de terminale de Saint-André", "de la terminale 1 du lycée de Cilaos", "d'une classe de terminale de Saint-Joseph"];

function sitEnquete(): Sit {
  const e = pick(ENQUETES);
  const S = pick([24, 25, 28, 30, 32, 35]);
  const k = Math.min(e.max, ri(2, 3)) + 1; // valeurs 0..k−1
  const ns = parts(S, k);
  const cl = pick(CLASSES);
  const reps = ns.map((n, v) => `${n} ${n === 1 ? "répond" : "répondent"} ${v}`);
  const intro = `On a interrogé les ${S} élèves ${cl} sur ${e.sur} : ${reps.slice(0, -1).join(", ")} et ${reps[reps.length - 1]}. On choisit un élève de la classe au hasard.`;
  return sit(intro, e.quoi, ns.map((n, v) => ({ v, n, ev: e.ev(v) })), { reunion: true });
}

/** Les relevés du car jaune : on choisit un jour au hasard. */
function sitCarJaune(): Sit {
  const J = pick([20, 40, 50, 100]);
  const pas = pick([5, 10]);
  const k = ri(3, 4);
  const ns = parts(J, k);
  const heure = pick(["6 h 45", "7 h 05", "6 h 30", "7 h 15"]);
  const ligne = pick(["Saint-Louis – Cilaos", "Saint-Denis – Sainte-Marie", "Le Tampon – Saint-Pierre", "Saint-Paul – Le Port"]);
  const rel = ns.map((n, i) => (i === 0 ? `à l'heure ${n} fois` : `avec ${i * pas} minutes de retard ${n} fois`));
  const intro = `Sur ${J} jours d'école, le car jaune de ${heure} de la ligne ${ligne} est arrivé ${rel.slice(0, -1).join(", ")} et ${rel[rel.length - 1]}. On choisit un de ces jours au hasard.`;
  return sit(intro, "le retard du car ce jour-là, en minutes", ns.map((n, i) => ({ v: i * pas, n, ev: i === 0 ? "le car est à l'heure" : `le car a ${i * pas} minutes de retard` })), { reunion: true });
}

/** Des barquettes (ou sachets) qui ne contiennent pas toutes autant d'objets. */
const LOTS = [
  { qui: "Au marché de Saint-Paul, un marchand a préparé", lot: ["barquette", "barquettes"], obj: "letchis", tailles: [15, 20, 25, 30] },
  { qui: "Pour le pique-nique, la classe a préparé", lot: ["boîte", "boîtes"], obj: "samoussas", tailles: [6, 8, 10, 12] },
  { qui: "Un boulanger de Saint-Denis a rempli", lot: ["sachet", "sachets"], obj: "bonbons piment", tailles: [10, 12, 15, 20] },
  { qui: "Une vendeuse du marché forain a préparé", lot: ["panier", "paniers"], obj: "mangues", tailles: [4, 5, 6, 8] },
];
function sitLots(): Sit {
  const l = pick(LOTS);
  const ts = melange(l.tailles).slice(0, 3).sort((a, b) => a - b);
  const ns = [ri(2, 12), ri(2, 12), ri(2, 12)];
  const desc = ts.map((t, i) => `${nb(ns[i], l.lot[0], l.lot[1])} de ${t} ${l.obj}`);
  const intro = `${l.qui} ${desc[0]}, ${desc[1]} et ${desc[2]}. On prend ${/e$/.test(l.lot[0]) ? "une" : "un"} ${l.lot[0]} au hasard.`;
  return sit(intro, `le nombre de ${l.obj} ${/e$/.test(l.lot[0]) ? "qu'elle" : "qu'il"} contient`, ts.map((t, i) => ({ v: t, n: ns[i], ev: `${/e$/.test(l.lot[0]) ? "la" : "le"} ${l.lot[0]} contient ${t} ${l.obj}` })), { reunion: true });
}

/* ---------- 2. Les lois DONNÉES (relevés, statistiques) ---------- */
type Theme = { intro: (p: Prenom) => string; X: (p: Prenom) => string; vals: number[][]; ev: (k: number, p: Prenom) => string; argent?: boolean; reunion?: boolean };
const il = (p: Prenom) => (p.f ? "elle" : "il");
const THEMES: Theme[] = [
  {
    intro: (p) => `Au basket, lors d'une action, ${p.nom}, du club de Saint-Paul, peut marquer 0, 1, 2 ou 3 points.`,
    X: () => "le nombre de points marqués lors d'une action",
    vals: [[0, 1, 2, 3], [0, 2, 3]],
    ev: (k, p) => (k === 0 ? `${p.nom} ne marque aucun point` : `${p.nom} marque ${k} ${pl(k, "point", "points")}`),
    reunion: true,
  },
  {
    intro: (p) => `${p.nom} part randonner deux jours à Cilaos, en pleine saison des pluies ; les relevés de Météo-France donnent les probabilités.`,
    X: () => "le nombre de jours de pluie pendant la randonnée",
    vals: [[0, 1, 2]],
    ev: (k) => (k === 0 ? "il ne pleut aucun jour" : k === 1 ? "il pleut un seul jour" : "il pleut les deux jours"),
    reunion: true,
  },
  {
    intro: (p) => `${p.nom} est pêcheur${p.f ? "se" : ""} au large de Saint-Gilles ; ses carnets de pêche donnent les probabilités.`,
    X: () => "le nombre de thons pêchés lors d'une sortie",
    vals: [[0, 1, 2, 3], [0, 1, 2]],
    ev: (k) => (k === 0 ? "aucun thon n'est pêché" : `${k} ${pl(k, "thon est pêché", "thons sont pêchés")}`),
    reunion: true,
  },
  {
    intro: () => `Lors d'une sortie en mer à Saint-Leu, entre juillet et octobre, on peut apercevoir des baleines à bosse.`,
    X: () => "le nombre de baleines aperçues pendant la sortie",
    vals: [[0, 1, 2, 3], [0, 1, 2, 3, 4]],
    ev: (k) => (k === 0 ? "on n'aperçoit aucune baleine" : `on aperçoit ${k} ${pl(k, "baleine", "baleines")}`),
    reunion: true,
  },
  {
    intro: () => `Au snack du front de mer de Saint-Pierre, on compte les clients qui arrivent en cinq minutes.`,
    X: () => "le nombre de clients arrivés en cinq minutes",
    vals: [[0, 1, 2, 3], [0, 1, 2, 3, 4]],
    ev: (k) => (k === 0 ? "aucun client n'arrive" : `${k} ${pl(k, "client arrive", "clients arrivent")}`),
    reunion: true,
  },
  {
    intro: () => `L'équipe de football de la JS Saint-Pierroise dispute un match.`,
    X: () => "le nombre de buts marqués par l'équipe",
    vals: [[0, 1, 2, 3], [0, 1, 2, 3, 4]],
    ev: (k) => (k === 0 ? "l'équipe ne marque aucun but" : `l'équipe marque ${k} ${pl(k, "but", "buts")}`),
    reunion: true,
  },
  {
    intro: (p) => `${p.nom} participe à la descente VTT du Maïdo ; les courses des années précédentes donnent les probabilités.`,
    X: () => "le nombre de crevaisons pendant la course",
    vals: [[0, 1, 2], [0, 1, 2, 3]],
    ev: (k) => (k === 0 ? "il n'y a aucune crevaison" : `il y a ${k} ${pl(k, "crevaison", "crevaisons")}`),
    reunion: true,
  },
  {
    intro: () => `La photocopieuse du lycée tombe parfois en panne.`,
    X: () => "le nombre de pannes en une semaine",
    vals: [[0, 1, 2], [0, 1, 2, 3]],
    ev: (k) => (k === 0 ? "la photocopieuse ne tombe pas en panne" : `la photocopieuse tombe ${k} fois en panne`),
  },
  {
    intro: (p) => `Au stand de fléchettes de la fête foraine, ${p.nom} lance une fléchette. Selon la zone touchée, ${il(p)} gagne 0, 2, 5 ou 10 €.`,
    X: (p) => `le gain ${deN(p)}, en euros`,
    vals: [[0, 2, 5, 10]],
    ev: (k, p) => (k === 0 ? `${p.nom} ne gagne rien` : `${p.nom} gagne ${k} €`),
    argent: true,
  },
  {
    intro: (p) => `${p.nom} joue au chamboule-tout de la kermesse : selon le nombre de boîtes renversées, ${il(p)} gagne 0, 1, 3 ou 8 €.`,
    X: (p) => `le gain ${deN(p)}, en euros`,
    vals: [[0, 1, 3, 8]],
    ev: (k, p) => (k === 0 ? `${p.nom} ne gagne rien` : `${p.nom} gagne ${k} €`),
    argent: true,
    reunion: true,
  },
  {
    intro: (p) => `Au quiz de fin de cours, ${p.nom} répond à quatre questions.`,
    X: () => "le nombre de bonnes réponses",
    vals: [[0, 1, 2, 3, 4], [1, 2, 3, 4]],
    ev: (k, p) => (k === 0 ? `${p.nom} n'a aucune bonne réponse` : `${p.nom} a ${k} ${pl(k, "bonne réponse", "bonnes réponses")}`),
  },
  {
    intro: () => `Une compagnie d'assurance étudie les sinistres déclarés par ses clients en un an.`,
    X: () => "le nombre de sinistres déclarés par un client pris au hasard",
    vals: [[0, 1, 2], [0, 1, 2, 3]],
    ev: (k) => (k === 0 ? "le client ne déclare aucun sinistre" : `le client déclare ${k} ${pl(k, "sinistre", "sinistres")}`),
  },
];

/** Une loi donnée : probabilités multiples de 0,05 (ou de 0,1), toutes non nulles. */
function sitDonnee(): Sit {
  const t = pick(THEMES);
  const p = pick(PRENOMS);
  const vals = pick(t.vals);
  const D = pick([10, 20, 20]);
  const ns = parts(D, vals.length);
  return sit(t.intro(p), t.X(p), vals.map((v, i) => ({ v, n: ns[i], ev: t.ev(v, p) })), { donnee: true, argent: t.argent, reunion: t.reunion });
}

/* ---------- 3. Le tirage d'une situation ---------- */
const COMPTAGE_ARGENT = [sitUrne, sitUrne, sitRoue, sitTombola, sitDe, sitDeuxDes, sitCartes];
const COMPTAGE_AUTRE = [sitEnquete, sitCarJaune, sitLots, sitPieces];

/** Tire une situation parmi `makers`, jusqu'à ce que `ok` soit vrai. */
function tirer(makers: (() => Sit)[], ok: (s: Sit) => boolean = () => true): Sit {
  for (let k = 0; k < 200; k++) {
    const s = pick(makers)();
    if (ok(s)) return s;
  }
  return pick(makers)();
}
/** N'importe quelle situation. */
const sitTout = (ok?: (s: Sit) => boolean) => tirer([...COMPTAGE_ARGENT, ...COMPTAGE_AUTRE, sitDonnee, sitDonnee, sitDonnee], ok);
/** Un jeu d'argent (comptage ou loi donnée). */
const sitArgent = (ok?: (s: Sit) => boolean) => tirer([...COMPTAGE_ARGENT, sitPieces, sitDonnee], (s) => s.argent && (!ok || ok(s)));
/** Une loi qui se déduit d'un comptage. */
const sitComptage = (ok?: (s: Sit) => boolean) => tirer([...COMPTAGE_ARGENT, ...COMPTAGE_AUTRE], ok);
/** Toutes les probabilités tombent juste au centième (0,25 ; 0,4…). */
const loiDecimale = (s: Sit) => s.issues.every((i) => 100 % r(i.n, s.D).d === 0);

/* ---------- 4. Les calculs exacts ---------- */
const P = (s: Sit, i: Issue) => r(i.n, s.D);
const E = (s: Sit) => somme(s.issues.map((i) => r(i.v * i.n, s.D)));
const E2 = (s: Sit) => somme(s.issues.map((i) => r(i.v * i.v * i.n, s.D)));
const V = (s: Sit) => sub(E2(s), mul(E(s), E(s)));
const sigma = (s: Sit) => Math.sqrt(val(V(s)));
/** « $0 \times 0{,}2 + 1 \times 0{,}5 + 2 \times 0{,}3$ » (sans $). */
const sommeTx = (s: Sit, carre = false) =>
  s.issues.map((i) => `${i.v < 0 ? `(${i.v})` : i.v}${carre ? "^2" : ""} \\times ${tx(P(s, i))}`).join(" + ");

/** Une mise entière raisonnable, plus petite que le plus gros gain. */
const miseTiree = (brut: number[]) => ri(1, Math.max(1, Math.min(10, brut[brut.length - 1] - 1)));

/** La situation avec une mise : G = X − m (gain algébrique). */
function avecMise(s: Sit, mise: number): Sit {
  const phrase = pick([`Une partie coûte ${mise} €.`, `Pour jouer, on paie ${mise} €.`, `La participation coûte ${mise} €.`]);
  return {
    ...s,
    intro: `${s.intro} ${phrase}`,
    X: "le gain algébrique du joueur (ce qu'il gagne moins ce qu'il a payé), en euros",
    issues: s.issues.map((i) => ({ ...i, v: i.v - mise })),
    L: "G",
  };
}

/** « $P(X = 0) = 0{,}2$, $P(X = 1) = 0{,}5$ et … » ; `cacher` : l'indice écrit « p ». */
function loiTexte(s: Sit, cacher = -1): string {
  const t = s.issues.map((i, k) => `$P(${s.L} = ${i.v}) = ${k === cacher ? "p" : tx(P(s, i))}$`);
  return `${t.slice(0, -1).join(", ")} et ${t[t.length - 1]}`;
}
/** L'énoncé de la situation : contexte, variable, et la loi si on la donne. */
function pres(s: Sit, o: { loi?: boolean; cacher?: number } = {}): string {
  const loi = o.loi ?? s.donnee;
  const def = pick(["On note", "Soit", "On appelle"]);
  return `${s.intro} ${def} $${s.L}$ ${s.X}.` + (loi ? ` ${pick(["La loi de", "La loi de probabilité de"])} $${s.L}$ est : ${loiTexte(s, o.cacher)}.` : "");
}
/** La loi dessinée en tableau. */
function tableau(s: Sit, cacher = -1): CanvasFigure {
  return {
    kind: "probabilites",
    variant: "tableau",
    tableau: {
      entetes: ["xᵢ", ...s.issues.map((i) => String(i.v))],
      lignes: [[`P(${s.L} = xᵢ)`, ...s.issues.map((i, k) => (k === cacher ? "p" : brut(P(s, i))))]],
    },
  };
}
/** L'ensemble des valeurs, en LaTeX : « $\{0\,;2\,;5\}$ ». */
const ensemble = (vs: number[]) => `$\\{${vs.join("\\,;")}\\}$`;
/** Le détail de la loi pour une explication : « P(X = 5) = 2/10 = 0,2 ; … ». */
const loiDetail = (s: Sit) =>
  s.issues
    .map((i) => {
      const f = `\\dfrac{${i.n}}{${s.D}}`;
      const t = tx(P(s, i));
      return `$P(${s.L} = ${i.v}) = ${s.donnee || f === t ? "" : `${f} = `}${t}$`;
    })
    .join(" ; ");

/* =========================================================================
   VA_DEFINITION — Comprendre une variable aléatoire
========================================================================= */
const evs = (is: Issue[]) => maj(is.map((i) => i.ev).join(" ou "));
/** Toutes les réunions d'issues non vides et différentes de tout : des leurres de secours. */
const autresReunions = (is: Issue[]) =>
  melange(Array.from({ length: 2 ** is.length - 2 }, (_, k) => is.filter((_, j) => ((k + 1) >> j) & 1)).map(evs));

/** ★1-2 — Les valeurs prises par X. */
function defValeurs(): Q {
  const s = sitComptage();
  const vs = s.issues.map((i) => i.v);
  const q = pick([
    `Quelles valeurs $${s.L}$ peut-elle prendre ?`,
    `Quel est l'ensemble $${s.L}(\\Omega)$ des valeurs prises par $${s.L}$ ?`,
    `Parmi ces ensembles, lequel est l'ensemble des valeurs de $${s.L}$ ?`,
  ]);
  const ns = [...new Set(s.issues.map((i) => i.n))].sort((a, b) => a - b);
  const sansMin = vs.slice(1);
  const avecD = [...vs, s.D].sort((a, b) => a - b);
  const probas = `$\\{${s.issues.map((i) => tx(P(s, i))).join("\\,;")}\\}$`;
  return {
    text: `${pres(s, { loi: false })} ${q}`,
    format: "qcm",
    ...qcmS(ensemble(vs), [ensemble(ns), ensemble(sansMin), probas, ensemble(avecD)]),
    comparator: "mcq_exact",
    explanation: exp(
      "Une variable aléatoire associe un nombre réel à chaque issue ; $X(\\Omega)$ est l'ensemble de ces nombres.",
      "On passe en revue les résultats possibles et on écrit la valeur de $X$ pour chacun.",
      s.issues.map((i) => `si ${i.ev}, $${s.L} = ${i.v}$`).join(" ; ") + ".",
      `$${s.L}(\\Omega) = ${ensemble(vs).slice(1, -1)}$ : ce sont des valeurs, pas des effectifs ni des probabilités.`,
    ),
  };
}

/** ★4 — Les valeurs du gain algébrique, mise déduite. */
function defMise(): Q {
  const base = sitArgent();
  const brut = base.issues.map((i) => i.v);
  const mise = miseTiree(brut);
  const s = avecMise(base, mise);
  const vs = s.issues.map((i) => i.v);
  const q = pick([
    "Quelles valeurs le gain algébrique $G$ peut-il prendre ?",
    "Quel est l'ensemble des valeurs prises par $G$ ?",
    "Le joueur se demande ce qu'il peut gagner ou perdre. Quelles sont les valeurs de $G$ ?",
  ]);
  const inverse = [...vs].map((v) => -v).sort((a, b) => a - b);
  const oubli = [...new Set([-mise, ...brut.filter((v) => v > 0)])].sort((a, b) => a - b);
  return {
    text: `${pres(s, { loi: false })} ${q}`,
    format: "qcm",
    ...qcmS(ensemble(vs), [
      ensemble(brut),
      ensemble(inverse),
      ensemble(oubli),
      ensemble([...vs, -mise].filter((v, k, t) => t.indexOf(v) === k).sort((a, b) => a - b)),
      ensemble(vs.map((v) => v - mise)),
      ensemble(brut.map((v) => v + mise)),
    ]),
    comparator: "mcq_exact",
    explanation: exp(
      "Le gain algébrique est ce que l'on gagne MOINS ce que l'on a payé : il peut être négatif.",
      `Pour chaque résultat, on retire la mise de $${mise}$ € au gain.`,
      base.issues.map((i) => `si ${i.ev} : $${i.v} - ${mise} = ${i.v - mise}$`).join(" ; ") + ".",
      `$G$ prend les valeurs ${ensemble(vs)} (en euros).`,
    ),
  };
}

/** ★2 — Que signifie l'événement {X = v} ? */
function defEvenement(): Q {
  const s = sitTout();
  const i = pick(s.issues);
  const q = pick([
    `Que signifie l'événement $\\{${s.L} = ${i.v}\\}$ ?`,
    `Quel résultat de l'expérience s'écrit $\\{${s.L} = ${i.v}\\}$ ?`,
    `Dans cette situation, à quoi correspond l'événement « $${s.L} = ${i.v}$ » ?`,
  ]);
  const autres = s.issues.filter((j) => j !== i).map((j) => maj(j.ev));
  return {
    text: `${pres(s)} ${q}`,
    format: "qcm",
    ...qcmS(maj(i.ev), [...autres, `L'événement de probabilité égale à $${i.v}$`]),
    comparator: "mcq_exact",
    explanation: exp(
      `$\\{${s.L} = k\\}$ est l'ensemble des issues pour lesquelles $${s.L}$ prend la valeur $k$.`,
      `On cherche le résultat de l'expérience qui donne $${s.L} = ${i.v}$.`,
      `$${s.L}$ vaut $${i.v}$ exactement quand ${i.ev}.`,
      `$\\{${s.L} = ${i.v}\\}$ : « ${i.ev} ». Le nombre $${i.v}$ est une VALEUR de $${s.L}$, pas une probabilité.`,
    ),
  };
}

/** ★2-3 — Que signifie l'égalité P(X = v) = p ? */
function defProbaSens(): Q {
  const s = sitTout();
  const i = pick(s.issues);
  const p = P(s, i);
  const autre = pick(s.issues.filter((j) => j !== i));
  const q = pick([
    `Dans cette situation, que signifie l'égalité $P(${s.L} = ${i.v}) = ${tx(p)}$ ?`,
    `On a $P(${s.L} = ${i.v}) = ${tx(p)}$. Comment le dire avec les mots de la situation ?`,
    `Comment traduire l'égalité $P(${s.L} = ${i.v}) = ${tx(p)}$ ?`,
  ]);
  return {
    text: `${pres(s, { loi: false })} ${q}`,
    format: "qcm",
    ...qcmS(`La probabilité de l'événement « ${i.ev} » est ${m(p)}`, [
      `La probabilité de l'événement « ${autre.ev} » est ${m(p)}`,
      `En moyenne, $${s.L}$ vaut $${i.v}$`,
      `L'événement « ${i.ev} » se produit à chaque fois`,
    ]),
    comparator: "mcq_exact",
    explanation: exp(
      `$P(${s.L} = k)$ est la probabilité de l'événement $\\{${s.L} = k\\}$.`,
      `On traduit d'abord $\\{${s.L} = ${i.v}\\}$ avec les mots de la situation.`,
      `$\\{${s.L} = ${i.v}\\}$ : « ${i.ev} »` + (s.donnee ? "." : ` ; il y a $${i.n}$ cas favorables sur $${s.D}$, d'où $\\dfrac{${i.n}}{${s.D}} = ${tx(p)}$.`),
      `La probabilité de l'événement « ${i.ev} » vaut ${m(p)}. Ce n'est ni une moyenne, ni une certitude.`,
    ),
  };
}

/** ★2-3 — Une loi recopiée : peut-elle être juste ? (somme 1, probabilités dans [0 ; 1]) */
function defLoiValide(): Q {
  const s = sitTout((x) => loiDecimale(x) && x.issues.length >= 3);
  const ps = s.issues.map((i) => P(s, i));
  const cas = pick(["ok", "somme", "somme", "negatif"] as const);
  const k = ri(0, ps.length - 1);
  const j = (k + 1) % ps.length;
  const delta = r(pick([1, 2]), 10);
  if (cas === "somme") ps[k] = val(add(ps[k], delta)) < 1 ? add(ps[k], delta) : sub(ps[k], delta);
  if (cas === "negatif") {
    // Une probabilité passe en négatif, une autre compense : la somme vaut toujours 1.
    const neg = r(-pick([1, 2]), 10);
    ps[j] = add(ps[j], sub(ps[k], neg));
    ps[k] = neg;
  }
  // Une seule raison de refuser, jamais deux : on retire si une probabilité dépasse 1.
  if (ps.some((x) => val(x) > 1)) return defLoiValide();
  const loi = s.issues.map((i, n) => `$P(${s.L} = ${i.v}) = ${tx(ps[n])}$`).join(", ");
  const sum = somme(ps);
  const qui = pick(PRENOMS);
  const OUI = "Oui, c'est possible";
  const SOMME = "Non : la somme des probabilités ne vaut pas $1$";
  const NEG = "Non : une probabilité ne peut pas être négative";
  const SUP = "Non : une probabilité ne peut pas dépasser $1$";
  const bon = cas === "ok" ? OUI : cas === "somme" ? SOMME : NEG;
  return {
    text: `${s.intro} ${pick(["On note", "Soit"])} $${s.L}$ ${s.X}. ${qui.nom} ${pick(["recopie", "propose", "écrit"])} cette loi : ${loi}. ${pick(["Cette loi peut-elle être correcte ?", "Peut-il s'agir de la loi de $X$ ?", "Cette loi est-elle possible ?"]).replace("$X$", `$${s.L}$`)}`,
    format: "qcm",
    ...qcmS(bon, [OUI, SOMME, NEG, SUP]),
    comparator: "mcq_exact",
    explanation: exp(
      "Une loi de probabilité : chaque probabilité est entre $0$ et $1$, et leur somme vaut $1$.",
      "On vérifie le signe de chaque probabilité, puis on fait la somme.",
      `Somme : $${ps.map((x) => (x.n < 0 ? `(${tx(x)})` : tx(x))).join(" + ")} = ${tx(sum)}$` + (cas === "negatif" ? ` ; mais $${tx(ps[k])}$ est négatif.` : "."),
      cas === "ok" ? "Les deux conditions sont vérifiées : c'est possible." : cas === "somme" ? `La somme vaut $${tx(sum)} \\neq 1$ : ce n'est pas une loi.` : "Une probabilité négative est impossible, même si la somme vaut $1$.",
    ),
  };
}

/** ★3 — Un événement {X ≥ t}, {X < t}… traduit en mots. */
function defEvenementIneg(): Q {
  const s = sitTout((x) => x.issues.length >= 3);
  const is = s.issues;
  const ops = [
    { tex: "\\geqslant", f: (a: number, t: number) => a >= t },
    { tex: ">", f: (a: number, t: number) => a > t },
    { tex: "\\leqslant", f: (a: number, t: number) => a <= t },
    { tex: "<", f: (a: number, t: number) => a < t },
  ];
  let op = pick(ops);
  let t = pick(is).v;
  let dans = is.filter((i) => op.f(i.v, t));
  for (let k = 0; k < 30 && (dans.length === 0 || dans.length === is.length); k++) {
    op = pick(ops);
    t = pick(is).v;
    dans = is.filter((i) => op.f(i.v, t));
  }
  const hors = is.filter((i) => !dans.includes(i));
  const egal = is.filter((i) => i.v === t);
  const large = is.filter((i) => (op.tex.includes("g") || op.tex === ">" ? i.v >= t : i.v <= t));
  const strict = is.filter((i) => (op.tex.includes("g") || op.tex === ">" ? i.v > t : i.v < t));
  const q = pick([
    `Que signifie l'événement $\\{${s.L} ${op.tex} ${t}\\}$ ?`,
    `Quels résultats réalisent l'événement $\\{${s.L} ${op.tex} ${t}\\}$ ?`,
  ]);
  return {
    text: `${pres(s, { loi: false })} ${q}`,
    format: "qcm",
    ...qcmS(evs(dans), [...melange([evs(hors), evs(egal), evs(large), evs(strict)].filter((t) => t && t !== evs(dans))).slice(0, 2), ...autresReunions(is)]),
    comparator: "mcq_exact",
    explanation: exp(
      `$\\{${s.L} ${op.tex} ${t}\\}$ regroupe les issues où $${s.L}$ prend une valeur ${op.tex.includes("g") ? "supérieure ou égale à" : op.tex === ">" ? "strictement supérieure à" : op.tex.includes("l") ? "inférieure ou égale à" : "strictement inférieure à"} $${t}$.`,
      `Valeurs possibles : ${ensemble(is.map((i) => i.v))} ; on garde celles qui conviennent.`,
      `On garde ${dans.map((i) => `$${i.v}$`).join(", ")}.`,
      `$\\{${s.L} ${op.tex} ${t}\\}$ : « ${dans.map((i) => i.ev).join(" ou ")} ».`,
    ),
  };
}

/** ★4 — Avec une mise : quels résultats font GAGNER (ou perdre) de l'argent ? */
function defEvenementMise(): Q {
  const base = sitArgent((x) => x.issues.length >= 3);
  const brut = base.issues.map((i) => i.v);
  // La mise tombe entre deux gains : certains résultats gagnent, d'autres perdent.
  const mise = ri(Math.max(1, brut[1]), Math.max(1, brut[brut.length - 1] - 1));
  const s = avecMise(base, mise);
  const cas = pick([
    { tex: "G > 0", mots: "le joueur gagne de l'argent", f: (g: number) => g > 0 },
    { tex: "G < 0", mots: "le joueur perd de l'argent", f: (g: number) => g < 0 },
    { tex: "G \\geqslant 0", mots: "le joueur ne perd pas d'argent", f: (g: number) => g >= 0 },
  ]);
  const dans = s.issues.filter((i) => cas.f(i.v));
  if (dans.length === 0 || dans.length === s.issues.length) return defEvenementMise();
  const hors = s.issues.filter((i) => !cas.f(i.v));
  const gainsBruts = base.issues.filter((i) => i.v > 0).map((i) => s.issues[base.issues.indexOf(i)]);
  const q = pick([
    `L'événement $\\{${cas.tex}\\}$ signifie que ${cas.mots}. Quels résultats le réalisent ?`,
    `Quels résultats réalisent l'événement $\\{${cas.tex}\\}$ ?`,
  ]);
  return {
    text: `${pres(s, { loi: false })} ${q}`,
    format: "qcm",
    ...qcmS(evs(dans), [...[evs(hors), evs(gainsBruts)].filter((t) => t && t !== evs(dans)), ...autresReunions(s.issues)]),
    comparator: "mcq_exact",
    explanation: exp(
      "Le gain algébrique $G$ est le gain MOINS la mise ; on lit son signe.",
      `On calcule $G$ pour chaque résultat (mise : $${mise}$ €).`,
      base.issues.map((i) => `si ${i.ev} : $G = ${i.v} - ${mise} = ${i.v - mise}$`).join(" ; ") + ".",
      `$\\{${cas.tex}\\}$ : « ${dans.map((i) => i.ev).join(" ou ")} ». Un gain inférieur à la mise fait perdre de l'argent.`,
    ),
  };
}

/* =========================================================================
   VA_LOI_PROBABILITE — Déterminer la loi d'une variable aléatoire
========================================================================= */

/** ★2 — Une probabilité P(X = v) déduite d'un comptage. */
function loiLireP(): Q {
  const s = sitComptage();
  const i = pick(s.issues);
  const p = P(s, i);
  const q = pick([
    `Que vaut $P(${s.L} = ${i.v})$ ?`,
    `Quelle est la probabilité de l'événement « ${i.ev} » ?`,
    `Calcule $P(${s.L} = ${i.v})$.`,
  ]);
  const k = s.issues.length;
  return {
    text: `${pres(s, { loi: false })} ${q}`,
    format: "qcm",
    ...qcmP(p, [r(i.n, Math.max(1, s.D - i.n)), r(1, k), ...s.issues.filter((j) => j !== i).map((j) => P(s, j)), r(i.v, s.D)]),
    comparator: "mcq_exact",
    explanation: exp(
      "Situation d'équiprobabilité : probabilité = nombre de cas favorables ÷ nombre de cas possibles.",
      `On compte les cas où ${i.ev}.`,
      `Il y en a $${i.n}$ sur $${s.D}$ : $P(${s.L} = ${i.v}) = \\dfrac{${i.n}}{${s.D}}` + (tx(p) === `\\dfrac{${i.n}}{${s.D}}` ? "$." : ` = ${tx(p)}$.`),
      `$P(${s.L} = ${i.v}) = ${tx(p)}$ (on divise par le nombre TOTAL de cas, pas par les autres cas).`,
    ),
  };
}

/** ★2 — Lire une probabilité dans une loi donnée (texte + tableau). */
function loiLireTableau(): Q {
  const s = sitDonnee();
  const i = pick(s.issues);
  const p = P(s, i);
  const q = pick([
    `Quelle est la probabilité de l'événement « ${i.ev} » ?`,
    `Avec quelle probabilité ${i.ev} ?`,
    `D'après le tableau, quelle est la probabilité de l'événement « ${i.ev} » ?`,
  ]);
  return {
    text: `${pres(s)} ${q}`,
    format: "qcm",
    canvas: tableau(s),
    ...qcmP(p, [...s.issues.filter((j) => j !== i).map((j) => P(s, j)), sub(r(1), p)]),
    comparator: "mcq_exact",
    explanation: exp(
      `L'événement « ${i.ev} » s'écrit $\\{${s.L} = ${i.v}\\}$.`,
      `On lit la probabilité sous la valeur $${i.v}$ dans le tableau.`,
      `$P(${s.L} = ${i.v}) = ${tx(p)}$.`,
      `La probabilité cherchée est ${m(p)}.`,
    ),
  };
}

/** ★3 — La probabilité manquante : la somme vaut 1. */
function loiManquante(): Q {
  const s = sitTout((x) => (x.donnee || loiDecimale(x)) && x.issues.length >= 3);
  const c = ri(0, s.issues.length - 1);
  const p = P(s, s.issues[c]);
  const autres = s.issues.filter((_, k) => k !== c).map((i) => P(s, i));
  const sAutres = somme(autres);
  const q = pick(["Que vaut $p$ ?", "Détermine $p$.", "Quelle valeur faut-il donner à $p$ ?"]);
  return {
    text: `${pres(s, { loi: true, cacher: c })} ${q}`,
    format: "qcm",
    canvas: tableau(s, c),
    ...qcmP(p, [sAutres, ...autres, sub(r(1), autres[0])]),
    comparator: "mcq_exact",
    explanation: exp(
      "La somme des probabilités d'une loi vaut $1$.",
      `On écrit $${autres.map(tx).join(" + ")} + p = 1$.`,
      `$p = 1 - ${tx(sAutres)} = ${tx(p)}$.`,
      `$p = ${tx(p)}$.`,
    ),
  };
}

/** ★3 — P(X ≤ t), P(X > t)… : on additionne les bonnes cases. */
function loiCumul(): Q {
  const s = sitTout((x) => x.issues.length >= 3 && (x.donnee || x.issues.length >= 3));
  const ops = [
    { tex: "\\leqslant", f: (a: number, t: number) => a <= t },
    { tex: "<", f: (a: number, t: number) => a < t },
    { tex: "\\geqslant", f: (a: number, t: number) => a >= t },
    { tex: ">", f: (a: number, t: number) => a > t },
  ];
  let op = pick(ops);
  let t = pick(s.issues).v;
  for (let k = 0; k < 40; k++) {
    const n = s.issues.filter((i) => op.f(i.v, t)).length;
    if (n >= 2 && n < s.issues.length) break;
    op = pick(ops);
    t = pick(s.issues).v;
  }
  const dans = s.issues.filter((i) => op.f(i.v, t));
  const p = somme(dans.map((i) => P(s, i)));
  const ferme = op.tex.includes("slant");
  const autreSens = s.issues.filter((i) => (ferme ? i.v !== t && op.f(i.v, t) : op.f(i.v, t) || i.v === t));
  const q = pick([`Que vaut $P(${s.L} ${op.tex} ${t})$ ?`, `Calcule $P(${s.L} ${op.tex} ${t})$.`, `Quelle est la probabilité de l'événement $\\{${s.L} ${op.tex} ${t}\\}$ ?`]);
  return {
    text: `${pres(s)} ${q}`,
    format: "qcm",
    canvas: s.donnee ? tableau(s) : undefined,
    ...qcmP(p, [somme(autreSens.map((i) => P(s, i))), sub(r(1), p), P(s, dans[0]), P(s, dans[dans.length - 1])]),
    comparator: "mcq_exact",
    explanation: exp(
      `$P(${s.L} ${op.tex} ${t})$ est la somme des $P(${s.L} = x_i)$ pour les valeurs $x_i ${op.tex} ${t}$.`,
      `Valeurs qui conviennent : ${dans.map((i) => `$${i.v}$`).join(", ")}${ferme ? ` ($${t}$ compris)` : ` ($${t}$ exclu)`}.`,
      (s.donnee ? "" : `${loiDetail(s)}. `) + `$P(${s.L} ${op.tex} ${t}) = ${dans.map((i) => tx(P(s, i))).join(" + ")} = ${tx(p)}$.`,
      `$P(${s.L} ${op.tex} ${t}) = ${tx(p)}$.`,
    ),
  };
}

/** ★4 — La loi complète du gain algébrique (mise déduite). */
function loiComplete(): Q {
  const base = sitComptage((x) => x.argent && x.issues.length >= 3);
  const brut = base.issues.map((i) => i.v);
  const mise = miseTiree(brut);
  const s = avecMise(base, mise);
  const ps = s.issues.map((i) => P(s, i));
  const ecrit = (vs: number[], qs: R[]) => vs.map((v, k) => `$P(G = ${v}) = ${tx(qs[k])}$`).join(" ; ");
  const bon = ecrit(s.issues.map((i) => i.v), ps);
  const q = pick(["Quelle est la loi de probabilité de $G$ ?", "Parmi ces propositions, laquelle est la loi de $G$ ?", "Donne la loi de $G$."]);
  return {
    text: `${pres(s, { loi: false })} ${q}`,
    format: "qcm",
    ...qcmS(bon, [
      ecrit(brut, ps),
      ecrit(s.issues.map((i) => i.v), [...ps].reverse()),
      ecrit(s.issues.map((i) => i.v), s.issues.map((i) => r(i.n, Math.max(1, s.D - i.n)))),
      ecrit(s.issues.map((i) => -i.v), ps),
    ]),
    comparator: "mcq_exact",
    explanation: exp(
      "Donner la loi de $G$, c'est donner chaque valeur de $G$ et sa probabilité.",
      `Valeurs : gain moins la mise de $${mise}$ € ; probabilités : cas favorables sur $${s.D}$.`,
      base.issues.map((i) => `${i.ev} : $G = ${i.v} - ${mise} = ${i.v - mise}$, probabilité $\\dfrac{${i.n}}{${s.D}}$`).join(" ; ") + ".",
      `${bon}. Vérification : la somme des probabilités vaut $1$.`,
    ),
  };
}

/** Deux épreuves indépendantes de même succès p : X = nombre de succès (0, 1 ou 2). */
const DEUX_ESSAIS: { phrase: (p: Prenom, pt: string) => string; X: string; ev: (k: number) => string; reunion?: boolean }[] = [
  { phrase: (p, pt) => `${p.nom} tire deux penalties. À chaque tir, ${il(p)} marque avec la probabilité ${pt}, indépendamment de l'autre tir.`, X: "le nombre de penalties marqués", ev: (k) => `${k} ${pl(k, "penalty marqué", "penalties marqués")}` },
  { phrase: (p, pt) => `${p.nom} tente deux lancers francs. Chaque lancer est réussi avec la probabilité ${pt}, indépendamment de l'autre.`, X: "le nombre de lancers réussis", ev: (k) => `${k} ${pl(k, "lancer réussi", "lancers réussis")}` },
  { phrase: (_p, pt) => `Sur la route du littoral, un automobiliste passe deux feux tricolores. Chacun est vert à son arrivée avec la probabilité ${pt}, indépendamment de l'autre.`, X: "le nombre de feux verts rencontrés", ev: (k) => `${k} ${pl(k, "feu vert", "feux verts")}`, reunion: true },
  { phrase: (p, pt) => `${p.nom} plante deux boutures de vanille. Chacune prend racine avec la probabilité ${pt}, indépendamment de l'autre.`, X: "le nombre de boutures qui prennent racine", ev: (k) => `${k} ${pl(k, "bouture", "boutures")}`, reunion: true },
  { phrase: (p, pt) => `${p.nom} prend le car jaune lundi et mardi. Chaque jour, le car est à l'heure avec la probabilité ${pt}, indépendamment de l'autre jour.`, X: "le nombre de jours où le car est à l'heure", ev: (k) => `${k} ${pl(k, "jour", "jours")}`, reunion: true },
  { phrase: (_p, pt) => `Deux randonneurs partent, chacun de leur côté, vers le sommet du Piton des Neiges. Chacun l'atteint avec la probabilité ${pt}, indépendamment de l'autre.`, X: "le nombre de randonneurs qui atteignent le sommet", ev: (k) => `${k} ${pl(k, "randonneur", "randonneurs")}`, reunion: true },
  { phrase: (p, pt) => `${p.nom} tire deux flèches sur une cible. Chaque flèche touche le centre avec la probabilité ${pt}, indépendamment de l'autre.`, X: "le nombre de flèches au centre", ev: (k) => `${k} ${pl(k, "flèche", "flèches")}` },
  { phrase: (_p, pt) => `Une guirlande a deux ampoules indépendantes. Chacune fonctionne avec la probabilité ${pt}.`, X: "le nombre d'ampoules qui fonctionnent", ev: (k) => `${k} ${pl(k, "ampoule", "ampoules")}` },
];

/** ★4 — La loi du nombre de succès sur deux épreuves indépendantes. */
function loiIndependants(): Q {
  const c = pick(DEUX_ESSAIS);
  const pr = pick(PRENOMS);
  const p = r(pick([1, 2, 3, 4, 6, 7, 8, 9]), 10);
  const qq = sub(r(1), p);
  const k = pick([0, 1, 2]);
  const bon = k === 0 ? mul(qq, qq) : k === 2 ? mul(p, p) : mul(r(2), mul(p, qq));
  const pieges = k === 1 ? [mul(p, qq), mul(r(2), p), r(1, 3), r(1, 2)] : k === 0 ? [sub(r(1), mul(p, p)), qq, mul(r(2), qq)] : [mul(r(2), p), p, sub(r(1), mul(qq, qq))];
  const calc =
    k === 0 ? `$P(X = 0) = ${tx(qq)} \\times ${tx(qq)} = ${tx(bon)}$` : k === 2 ? `$P(X = 2) = ${tx(p)} \\times ${tx(p)} = ${tx(bon)}$` : `$P(X = 1) = ${tx(p)} \\times ${tx(qq)} + ${tx(qq)} \\times ${tx(p)} = 2 \\times ${tx(p)} \\times ${tx(qq)} = ${tx(bon)}$`;
  const q = pick([`Que vaut $P(X = ${k})$ ?`, k === 0 ? `Quelle est la probabilité de l'événement $\\{X = 0\\}$ ?` : `Quelle est la probabilité d'obtenir exactement ${c.ev(k)} ?`, `Calcule $P(X = ${k})$.`]);
  return {
    text: `${c.phrase(pr, m(p))} On note $X$ ${c.X}. ${q}`,
    format: "qcm",
    ...qcmP(bon, pieges),
    comparator: "mcq_exact",
    explanation: exp(
      "Les deux épreuves sont indépendantes : on multiplie les probabilités le long d'un chemin de l'arbre.",
      k === 1 ? "Exactement un succès : succès puis échec, OU échec puis succès — deux chemins." : `Un seul chemin : ${k === 0 ? "échec puis échec" : "succès puis succès"}.`,
      `Succès : $${tx(p)}$ ; échec : $1 - ${tx(p)} = ${tx(qq)}$. ${calc}.`,
      `$P(X = ${k}) = ${tx(bon)}$.`,
    ),
  };
}

/* =========================================================================
   VA_ESPERANCE — Calculer une espérance
========================================================================= */
const moyValeurs = (s: Sit) => r(s.issues.reduce((a, i) => a + i.v, 0), s.issues.length);
const DEF_E = "$E(X) = \\sum x_i \\, P(X = x_i)$ : chaque valeur est pondérée par sa probabilité.";

/** ★2 — E(X) à partir d'une loi écrite (texte + tableau). */
function espTableau(): Q {
  const s = sitTout((x) => x.donnee || loiDecimale(x));
  const e = E(s);
  const sansDernier = somme(s.issues.slice(0, -1).map((i) => r(i.v * i.n, s.D)));
  const q = pick([`Calcule $E(${s.L})$.`, `Que vaut l'espérance de $${s.L}$ ?`, `Quelle est l'espérance $E(${s.L})$ ?`]);
  return {
    text: `${pres(s, { loi: true })} ${q}`,
    format: "qcm",
    canvas: tableau(s),
    ...qcmR(e, [moyValeurs(s), sansDernier, r(s.issues.reduce((a, i) => a + i.v, 0)), E2(s)]),
    comparator: "mcq_exact",
    explanation: exp(
      DEF_E.replace(/X/g, s.L),
      "On multiplie chaque valeur par sa probabilité, puis on additionne tout.",
      `$E(${s.L}) = ${sommeTx(s)} = ${tx(e)}$.`,
      `$E(${s.L}) = ${tx(e)}$ — et non la moyenne des valeurs ($${tx(moyValeurs(s))}$), qui oublie les probabilités.`,
    ),
  };
}

/** ★3 — E(X) quand la loi se déduit d'un comptage. */
function espComptage(): Q {
  const s = sitComptage();
  const e = E(s);
  const tot = s.issues.reduce((a, i) => a + i.v * i.n, 0);
  const q = pick([`Calcule l'espérance de $${s.L}$.`, `Que vaut $E(${s.L})$ ?`, `Quelle est la valeur moyenne de $${s.L}$ que l'on peut espérer, c'est-à-dire $E(${s.L})$ ?`]);
  return {
    text: `${pres(s, { loi: false })} ${q}`,
    format: "qcm",
    ...qcmR(e, [moyValeurs(s), r(tot), r(tot, s.issues.length), add(e, r(1, s.D))]),
    comparator: "mcq_exact",
    explanation: exp(
      DEF_E.replace(/X/g, s.L),
      "On écrit d'abord la loi (cas favorables ÷ cas possibles), puis on applique la formule.",
      `${loiDetail(s)}. $E(${s.L}) = ${sommeTx(s)} = ${tx(e)}$.`,
      `$E(${s.L}) = ${tx(e)}$.`,
    ),
  };
}

/** ★4 — L'espérance du gain algébrique : E(G) = E(X) − mise. */
function espMise(): Q {
  const base = sitArgent((x) => x.donnee || loiDecimale(x) || Math.random() < 0.4);
  const brut = base.issues.map((i) => i.v);
  const mise = miseTiree(brut);
  const s = avecMise(base, mise);
  const eX = E(base);
  const eG = E(s);
  const q = pick(["Calcule l'espérance de $G$.", "Que vaut $E(G)$ ?", "Quelle est l'espérance du gain algébrique $G$ ?"]);
  return {
    text: `${pres(s, { loi: s.donnee })} ${q}`,
    format: "qcm",
    canvas: s.donnee ? tableau(s) : undefined,
    ...qcmR(eG, [eX, add(eX, r(mise)), moyValeurs(s), r(-eG.n, eG.d)]),
    comparator: "mcq_exact",
    explanation: exp(
      "$E(G) = \\sum g_i \\, P(G = g_i)$ ; et comme $G = X - \\text{mise}$, on a aussi $E(G) = E(X) - \\text{mise}$.",
      "On calcule l'espérance du gain sans la mise, puis on retire la mise (elle est payée à chaque partie).",
      `${s.donnee ? "" : `${loiDetail(base)}. `}$E(X) = ${sommeTx(base)} = ${tx(eX)}$, donc $E(G) = ${tx(eX)} - ${mise} = ${tx(eG)}$.`,
      `$E(G) = ${tx(eG)}$ €.`,
    ),
  };
}

/** ★4 — La linéarité : E(aX + b) = a E(X) + b. */
function espLineaire(): Q {
  const s = sitTout((x) => x.donnee || loiDecimale(x));
  const e = E(s);
  const a = pick([2, 3, 4, 5, 10, -1, -2]);
  const b = pick([-5, -3, -2, 1, 2, 3, 5, 10]);
  const Y = `${a === -1 ? "-" : a}${s.L} ${b < 0 ? "-" : "+"} ${Math.abs(b)}`;
  const contexte = s.argent && a > 0
    ? pick([`Pour une édition spéciale, les gains sont multipliés par $${a}$ puis ${b > 0 ? `augmentés d'un bonus de $${b}$ €` : `diminués de frais de $${-b}$ €`} : on note $Y = ${Y}$ le nouveau gain.`, `On pose $Y = ${Y}$.`])
    : pick([`On pose $Y = ${Y}$.`, `On définit la variable aléatoire $Y = ${Y}$.`]);
  const bon = add(mul(r(a), e), r(b));
  const q = pick([`Sachant que $E(${s.L}) = ${tx(e)}$, que vaut $E(Y)$ ?`, `On admet que $E(${s.L}) = ${tx(e)}$. Calcule $E(Y)$.`]);
  return {
    text: `${s.intro} ${pick(["On note", "Soit"])} $${s.L}$ ${s.X}. ${contexte} ${q}`,
    format: "qcm",
    ...qcmR(bon, [mul(r(a), e), add(e, r(b)), mul(r(a), add(e, r(b))), add(mul(r(a * a), e), r(b))]),
    comparator: "mcq_exact",
    explanation: exp(
      "Linéarité de l'espérance : $E(aX + b) = a\\,E(X) + b$.",
      `Ici $a = ${a}$ et $b = ${b}$.`,
      `$E(Y) = ${a} \\times ${e.n < 0 ? `(${tx(e)})` : tx(e)} ${b < 0 ? "-" : "+"} ${Math.abs(b)} = ${tx(bon)}$.`,
      `$E(Y) = ${tx(bon)}$ (le coefficient $a$ n'est PAS au carré : c'est la variance qui l'élève au carré).`,
    ),
  };
}

/* =========================================================================
   VA_VARIANCE_ECART_TYPE — Variance et écart-type
========================================================================= */
const DEF_V = "$V(X) = E(X^2) - E(X)^2$ (König-Huygens) et $\\sigma(X) = \\sqrt{V(X)}$.";
/** Le contexte seul (sans la loi) et la variable. */
const contexte = (s: Sit) => `${s.intro} ${pick(["On note", "Soit"])} $${s.L}$ ${s.X}.`;
/** Une situation dont la variance tombe juste en décimal (au plus 4 décimales). */
const sitVarDecimale = () => sitTout((x) => (x.donnee || loiDecimale(x)) && 100 % V(x).d === 0);

/** ★2 — De la variance à l'écart-type (la vraie variance de la situation). */
function varSigma(): Q {
  const s = sitVarDecimale();
  const v = V(s);
  const sg = Math.sqrt(val(v));
  const vals = [Math.sqrt(val(v)), val(v) ** 2, val(v) / 2, val(v)];
  const distincts = vals.every((x, k) => vals.every((y, j) => j === k || Math.abs(x - y) > 1e-9));
  if (distincts && Math.random() < 0.4) {
    const q = pick([`On a calculé $V(${s.L}) = ${tx(v)}$. Quel calcul donne l'écart-type $\\sigma(${s.L})$ ?`, `La variance de $${s.L}$ vaut $${tx(v)}$. Comment obtenir son écart-type ?`]);
    return {
      text: `${contexte(s)} ${q}`,
      format: "qcm",
      ...qcmS(`$\\sqrt{${tx(v)}}$`, [`$${tx(v)}^2$`, `$\\dfrac{${tx(v)}}{2}$`, `$${tx(v)}$, sans calcul`]),
      comparator: "mcq_exact",
      explanation: exp(DEF_V.replace(/X/g, s.L), "L'écart-type est la RACINE CARRÉE de la variance.", `$\\sigma(${s.L}) = \\sqrt{${tx(v)}} \\approx ${arr2(sg).slice(1, -1)}$.`, `On calcule $\\sqrt{${tx(v)}}$ : l'écart-type est dans la même unité que $${s.L}$.`),
    };
  }
  const q = pick([`On a calculé $V(${s.L}) = ${tx(v)}$. Que vaut l'écart-type $\\sigma(${s.L})$, arrondi au centième ?`, `La variance de $${s.L}$ vaut $${tx(v)}$. Quel est son écart-type, arrondi au centième ?`]);
  return {
    text: `${contexte(s)} ${q}`,
    format: "qcm",
    ...qcmN(sg, [val(v) / 2, val(v), val(v) ** 2, sg / 2]),
    comparator: "mcq_exact",
    explanation: exp(DEF_V.replace(/X/g, s.L), "L'écart-type est la RACINE CARRÉE de la variance.", `$\\sigma(${s.L}) = \\sqrt{${tx(v)}} \\approx ${arr2(sg).slice(1, -1)}$.`, `$\\sigma(${s.L}) \\approx ${arr2(sg).slice(1, -1)}$ (diviser par 2 n'est pas prendre la racine).`),
  };
}

/** ★3 — König-Huygens : V = E(X²) − E(X)². */
function varKonig(): Q {
  const s = sitVarDecimale();
  const e = E(s);
  const e2 = E2(s);
  const v = V(s);
  const q = pick([
    `On a calculé $E(${s.L}) = ${tx(e)}$ et $E(${s.L}^2) = ${tx(e2)}$. Que vaut $V(${s.L})$ ?`,
    `On sait que $E(${s.L}) = ${tx(e)}$ et $E(${s.L}^2) = ${tx(e2)}$. Calcule la variance de $${s.L}$.`,
  ]);
  return {
    text: `${contexte(s)} ${q}`,
    format: "qcm",
    ...qcmR(v, [sub(e2, e), sub(mul(e, e), e2), add(e2, mul(e, e)), mul(sub(e2, e), sub(e2, e))]),
    comparator: "mcq_exact",
    explanation: exp(
      DEF_V.replace(/X/g, s.L),
      `On élève $E(${s.L})$ au carré, puis on le retire à $E(${s.L}^2)$.`,
      `$V(${s.L}) = ${tx(e2)} - ${e.n < 0 ? `(${tx(e)})` : tx(e)}^2 = ${tx(e2)} - ${tx(mul(e, e))} = ${tx(v)}$.`,
      `$V(${s.L}) = ${tx(v)}$ (une variance n'est jamais négative).`,
    ),
  };
}

/** ★4 — La variance calculée depuis la loi. */
function varCalcul(): Q {
  const s = sitVarDecimale();
  const e = E(s);
  const e2 = E2(s);
  const v = V(s);
  const q = pick([`Calcule $V(${s.L})$.`, `Que vaut la variance de $${s.L}$ ?`, `Quelle est la variance $V(${s.L})$ ?`]);
  return {
    text: `${pres(s, { loi: true })} ${q}`,
    format: "qcm",
    canvas: tableau(s),
    ...qcmR(v, [e2, sub(e2, e), mul(e, e), add(e2, mul(e, e))]),
    comparator: "mcq_exact",
    explanation: exp(
      DEF_V.replace(/X/g, s.L),
      `On calcule $E(${s.L})$, puis $E(${s.L}^2)$ (on élève les VALEURS au carré, pas les probabilités).`,
      `$E(${s.L}) = ${sommeTx(s)} = ${tx(e)}$ ; $E(${s.L}^2) = ${sommeTx(s, true)} = ${tx(e2)}$ ; $V(${s.L}) = ${tx(e2)} - ${tx(mul(e, e))} = ${tx(v)}$.`,
      `$V(${s.L}) = ${tx(v)}$.`,
    ),
  };
}

/** ★4 — V(aX + b) = a² V(X) et σ(aX + b) = |a| σ(X). */
function varLineaire(): Q {
  const s = sitVarDecimale();
  const vr = V(s);
  const sgArr = Math.round(sigma(s) * 100);
  const sg = r(sgArr, 100); // σ(X) arrondi au centième, annoncé comme tel
  const a = pick([2, 3, 4, 5, 10, -1, -2, -3]);
  const b = pick([-5, -2, 1, 3, 5, 10, 20]);
  const Y = `${a === -1 ? "-" : a}${s.L} ${b < 0 ? "-" : "+"} ${Math.abs(b)}`;
  const intro = `${contexte(s)} On pose $Y = ${Y}$.`;
  if (Math.random() < 0.5) {
    const bon = mul(r(a * a), vr);
    return {
      text: `${intro} Sachant que $V(${s.L}) = ${tx(vr)}$, que vaut $V(Y)$ ?`,
      format: "qcm",
      ...qcmR(bon, [mul(r(a), vr), add(mul(r(a * a), vr), r(b)), add(mul(r(a), vr), r(b)), vr]),
      comparator: "mcq_exact",
      explanation: exp("$V(aX + b) = a^2\\,V(X)$ : la constante $b$ décale les valeurs sans changer leur dispersion.", `Ici $a = ${a}$, donc $a^2 = ${a * a}$ ; $b$ ne compte pas.`, `$V(Y) = ${a * a} \\times ${tx(vr)} = ${tx(bon)}$.`, `$V(Y) = ${tx(bon)}$.`),
    };
  }
  const bon = mul(r(Math.abs(a)), sg);
  return {
    text: `${intro} On a obtenu $\\sigma(${s.L}) \\approx ${tx(sg)}$ ; avec cette valeur, que vaut $\\sigma(Y)$ ?`,
    format: "qcm",
    ...qcmR(bon, [mul(r(a * a), sg), add(mul(r(Math.abs(a)), sg), r(b)), mul(r(a), sg), sg]),
    comparator: "mcq_exact",
    explanation: exp("$\\sigma(aX + b) = |a|\\,\\sigma(X)$ (racine de $a^2\\,V(X)$).", `Ici $|a| = ${Math.abs(a)}$ ; $b$ ne change pas la dispersion.`, `$\\sigma(Y) \\approx ${Math.abs(a)} \\times ${tx(sg)} = ${tx(bon)}$.`, `$\\sigma(Y) \\approx ${tx(bon)}$ (un écart-type n'est jamais négatif).`),
  };
}

/** ★5 — L'écart-type complet, arrondi au centième (annoncé). */
function varSigmaArrondi(): Q {
  const s = sitTout();
  const e = E(s);
  const e2 = E2(s);
  const v = V(s);
  const sg = sigma(s);
  const q = pick([`Calcule $\\sigma(${s.L})$, arrondi au centième.`, `Que vaut l'écart-type de $${s.L}$ (arrondi au centième) ?`, `Quel est l'écart-type $\\sigma(${s.L})$, arrondi à $0{,}01$ près ?`]);
  return {
    text: `${pres(s)} ${q}`,
    format: "qcm",
    canvas: s.donnee ? tableau(s) : undefined,
    ...qcmN(sg, [val(v), Math.sqrt(val(e2)), Math.sqrt(Math.abs(val(sub(e2, e)))), sg / 2]),
    comparator: "mcq_exact",
    explanation: exp(
      DEF_V.replace(/X/g, s.L),
      `On écrit la loi, on calcule $E(${s.L})$ et $E(${s.L}^2)$, puis $V(${s.L})$, et enfin la racine carrée.`,
      (s.donnee ? "" : `${loiDetail(s)}. `) + `$E(${s.L}) = ${tx(e)}$ ; $E(${s.L}^2) = ${sommeTx(s, true)} = ${tx(e2)}$ ; $V(${s.L}) = ${tx(e2)} - ${tx(mul(e, e))} = ${tx(v)}$ ; $\\sigma(${s.L}) = \\sqrt{${tx(v)}} \\approx ${arr2(sg).slice(1, -1)}$.`,
      `$\\sigma(${s.L}) \\approx ${arr2(sg).slice(1, -1)}$ (sans la racine, on aurait donné la variance).`,
    ),
  };
}

/* =========================================================================
   VA_INTERPRETER — Interpréter espérance, écart-type, jeu équitable
========================================================================= */
/** « 2,5 » → « $2{,}5$ € » pour une mise quelconque. */
const euros = (x: number) => eur(r(Math.round(x * 100), 100));
const phraseMise = (x: number) => pick([`Une partie coûte ${euros(x)}.`, `Pour jouer, on paie ${euros(x)}.`, `La participation coûte ${euros(x)}.`]);

/** ★2 — Que veut dire E = … dans la situation ? */
function intE(): Q {
  if (Math.random() < 0.5) {
    const base = sitArgent();
    const eX = E(base);
    const mise = Math.max(1, Math.round(val(eX)) + pick([-1, 1, 2]));
    const eG = sub(eX, r(mise));
    if (eG.n === 0) return intE();
    const s = avecMise(base, mise);
    const ab = r(Math.abs(eG.n), eG.d);
    const sens = eG.n > 0 ? "gagne" : "perd";
    const inv = eG.n > 0 ? "perd" : "gagne";
    return {
      text: `${contexte(s)} On a calculé $E(G) = ${tx(eG)}$. ${pick(["Comment interpréter ce résultat ?", "Que signifie ce nombre pour le joueur ?", "Quelle phrase traduit ce résultat ?"])}`,
      format: "qcm",
      ...qcmS(`Sur un grand nombre de parties, le joueur ${sens} en moyenne ${eur(ab)} par partie`, [
        `Le joueur ${sens} exactement ${eur(ab)} à chaque partie`,
        `Sur un grand nombre de parties, le joueur ${inv} en moyenne ${eur(ab)} par partie`,
        `Le joueur ${sens} ${eur(ab)} avec une probabilité de $${tx(r(1, 2))}$`,
      ]),
      comparator: "mcq_exact",
      explanation: exp(
        "L'espérance est la MOYENNE des valeurs de $G$ que l'on obtiendrait sur un très grand nombre de parties.",
        `On lit le signe de $E(G)$ : ${eG.n > 0 ? "positif, le joueur gagne" : "négatif, le joueur perd"} en moyenne.`,
        `$E(G) = ${tx(eG)}$ : ce n'est pas le résultat d'UNE partie (une partie donne une des valeurs de $G$).`,
        `En moyenne, sur beaucoup de parties, le joueur ${sens} ${eur(ab)} par partie.`,
      ),
    };
  }
  const s = sitTout((x) => !x.argent);
  const e = E(s);
  return {
    text: `${contexte(s)} On a calculé $E(${s.L}) = ${tx(e)}$. ${pick(["Comment interpréter ce résultat ?", "Que signifie ce nombre ?", "Quelle phrase traduit ce résultat ?"])}`,
    format: "qcm",
    ...qcmS(`Si l'on répète l'expérience un grand nombre de fois, la moyenne des valeurs de $${s.L}$ se rapproche de $${tx(e)}$`, [
      `$${s.L}$ prend toujours la valeur $${tx(e)}$`,
      `La valeur la plus probable de $${s.L}$ est $${tx(e)}$`,
      `La probabilité de l'événement $\\{${s.L} = ${tx(e)}\\}$ vaut $${tx(r(1, 2))}$`,
    ]),
    comparator: "mcq_exact",
    explanation: exp(
      "L'espérance est une moyenne « à long terme » des valeurs de la variable.",
      "Elle ne dit pas ce qui arrive à chaque fois, ni quelle valeur est la plus probable.",
      `$E(${s.L}) = ${tx(e)}$ : sur un grand nombre de répétitions, la moyenne observée de $${s.L}$ est proche de $${tx(e)}$.`,
      "C'est une valeur moyenne, qui n'est d'ailleurs pas forcément une valeur prise par la variable.",
    ),
  };
}

/** ★2-3 — Que mesure l'écart-type dans la situation ? */
function intSigmaSens(): Q {
  const s = sitTout();
  const sg = sigma(s);
  const BON = `La dispersion des valeurs de $${s.L}$ autour de son espérance`;
  return {
    text: `${contexte(s)} On a calculé $\\sigma(${s.L}) \\approx ${arr2(sg).slice(1, -1)}$. ${pick(["Que mesure ce nombre ?", "Que traduit l'écart-type ici ?", "À quoi sert ce nombre ?"])}`,
    format: "qcm",
    ...qcmS(BON, [
      `La valeur moyenne de $${s.L}$`,
      `L'écart entre la plus grande et la plus petite valeur de $${s.L}$`,
      `La probabilité de la valeur la plus fréquente de $${s.L}$`,
    ]),
    comparator: "mcq_exact",
    explanation: exp(
      "L'écart-type mesure l'écart « moyen » des valeurs à l'espérance.",
      "Petit écart-type : valeurs serrées autour de la moyenne ; grand : valeurs dispersées.",
      `Ici les valeurs ${ensemble(s.issues.map((i) => i.v))} s'écartent en moyenne d'environ $${arr2(sg).slice(1, -1)}$ de $E(${s.L}) = ${tx(E(s))}$.`,
      "L'écart-type mesure la dispersion (le risque, l'irrégularité), pas la moyenne.",
    ),
  };
}

/** Une mise : parfois exactement E(X) (jeu équitable), sinon un entier voisin. */
function choisirMise(eX: R): number {
  const juste = Math.abs(Math.round(val(eX) * 100) - val(eX) * 100) < 1e-9 && val(eX) > 0;
  if (juste && Math.random() < 0.35) return val(eX);
  const m = Math.max(1, Math.round(val(eX)) + pick([-2, -1, 1, 2]));
  return Math.abs(m - val(eX)) < 1e-9 ? m + 1 : m;
}
const EQUI = "Oui : $E(G) = 0$, le jeu est équitable";
const FAV = "Non : $E(G) > 0$, le jeu est favorable au joueur";
const DEFAV = "Non : $E(G) < 0$, le jeu est défavorable au joueur";
const SIGMA_PIEGE = "On ne peut pas conclure sans connaître l'écart-type";

/** ★3 — Le jeu est-il équitable ? On compare E(X) et la mise. */
function intEquitable(): Q {
  const base = sitArgent();
  const eX = E(base);
  const mise = choisirMise(eX);
  const eG = sub(eX, r(Math.round(mise * 100), 100));
  const bon = eG.n === 0 ? EQUI : eG.n > 0 ? FAV : DEFAV;
  const donneE = Math.random() < 0.5;
  return {
    text: `${pres(base, { loi: base.donnee })} ${phraseMise(mise)} On note $G$ le gain algébrique (gain moins mise).${donneE ? ` On a calculé $E(${base.L}) = ${tx(eX)}$.` : ""} ${pick(["Ce jeu est-il équitable ?", "Le jeu est-il équitable pour le joueur ?", "Que dire de ce jeu ?"])}`,
    format: "qcm",
    canvas: base.donnee ? tableau(base) : undefined,
    ...qcmS(bon, [EQUI, FAV, DEFAV, SIGMA_PIEGE]),
    comparator: "mcq_exact",
    explanation: exp(
      "Un jeu est équitable si $E(G) = 0$, favorable au joueur si $E(G) > 0$, défavorable si $E(G) < 0$.",
      "$E(G) = E(X) - \\text{mise}$ : on compare l'espérance du gain à la mise.",
      `${donneE ? "" : `$E(${base.L}) = ${sommeTx(base)} = ${tx(eX)}$ ; `}$E(G) = ${tx(eX)} - ${tx(r(Math.round(mise * 100), 100))} = ${tx(eG)}$.`,
      `${bon.replace(/^(Oui|Non) : /, "")}. L'écart-type mesure le risque, il ne décide pas de l'équité.`,
    ),
  };
}

/** ★3 — Pour quelles mises le jeu est-il favorable / équitable / défavorable ? */
function intMiseSeuil(): Q {
  const base = sitArgent();
  const eX = E(base);
  const max = base.issues[base.issues.length - 1].v;
  const cas = pick([
    { mot: "favorable au joueur", bon: `Pour une mise strictement inférieure à ${eur(eX)}` },
    { mot: "équitable", bon: `Pour une mise égale à ${eur(eX)}` },
    { mot: "défavorable au joueur", bon: `Pour une mise strictement supérieure à ${eur(eX)}` },
  ]);
  return {
    text: `${pres(base)} On a calculé $E(${base.L}) = ${tx(eX)}$. Les organisateurs fixent le prix d'une partie. ${pick([`Pour quelles mises le jeu est-il ${cas.mot} ?`, `Quelle mise rend le jeu ${cas.mot} ?`])}`,
    format: "qcm",
    canvas: base.donnee ? tableau(base) : undefined,
    ...qcmS(cas.bon, [
      `Pour une mise strictement inférieure à ${eur(eX)}`,
      `Pour une mise égale à ${eur(eX)}`,
      `Pour une mise strictement supérieure à ${eur(eX)}`,
      `Pour une mise inférieure à ${eur(r(max))}`,
    ]),
    comparator: "mcq_exact",
    explanation: exp(
      "Avec une mise $m$, le gain algébrique vaut $G = X - m$, donc $E(G) = E(X) - m$.",
      `Le jeu est ${cas.mot} quand $E(G)$ est ${cas.mot === "équitable" ? "nul" : cas.mot.startsWith("fav") ? "positif" : "négatif"}.`,
      `$E(G) = ${tx(eX)} - m$ : ${cas.mot === "équitable" ? `nul pour $m = ${tx(eX)}$` : cas.mot.startsWith("fav") ? `positif pour $m < ${tx(eX)}$` : `négatif pour $m > ${tx(eX)}$`}.`,
      `${cas.bon}.`,
    ),
  };
}

/** Deux options à comparer : (nom A, nom B), la grandeur, le contexte. */
const DUOS: { ctx: string; quoi: string; A: string; B: string; plus: string; reunion?: boolean }[] = [
  { ctx: "À la kermesse, deux stands proposent un jeu au même prix.", quoi: "le gain d'une partie, en euros", A: "le stand de la roue", B: "le stand des enveloppes", plus: "rapporte le plus en moyenne" },
  { ctx: "On compare les retards de deux lignes de car jaune.", quoi: "le retard du car, en minutes", A: "la ligne Saint-Louis – Cilaos", B: "la ligne Saint-Pierre – Le Tampon", plus: "a le plus de retard en moyenne", reunion: true },
  { ctx: "Deux basketteurs du club de Saint-Paul sont comparés sur la saison.", quoi: "le nombre de points marqués lors d'un match", A: "Kenji", B: "Noah", plus: "marque le plus de points en moyenne", reunion: true },
  { ctx: "Un pêcheur hésite entre deux coins de pêche.", quoi: "le nombre de poissons pêchés lors d'une sortie", A: "le coin de Saint-Gilles", B: "le coin de Saint-Leu", plus: "donne le plus de poissons en moyenne", reunion: true },
  { ctx: "Une épicerie compare deux producteurs de letchis.", quoi: "le nombre de letchis abîmés dans une cagette", A: "le producteur de Saint-André", B: "le producteur de Sainte-Suzanne", plus: "a le plus de letchis abîmés en moyenne", reunion: true },
  { ctx: "Pour aller à Saint-Denis, un automobiliste peut prendre deux routes.", quoi: "le temps perdu dans les bouchons, en minutes", A: "la route du littoral", B: "la route de la montagne", plus: "fait perdre le plus de temps en moyenne", reunion: true },
  { ctx: "Deux machines remplissent des pots de confiture de goyave.", quoi: "l'écart à la masse prévue, en grammes", A: "la machine 1", B: "la machine 2", plus: "donne le plus grand écart en moyenne" },
];

/** ★3-4 — Comparer deux variables avec leur espérance et leur écart-type. */
function intComparer(): Q {
  const d = pick(DUOS);
  const nomX = pick(["X", "Y"]);
  const eA = r(ri(10, 150), 10);
  const memeE = Math.random() < 0.6;
  let eB = memeE ? eA : r(ri(10, 150), 10);
  if (!memeE && eB.n === eA.n) eB = add(eA, r(1, 2));
  const sA = r(ri(2, 30), 10);
  let sB = r(ri(2, 30), 10);
  if (sB.n === sA.n) sB = add(sA, r(7, 10));
  const type = memeE ? pick(["regulier", "risque"] as const) : ("moyenne" as const);
  const q = type === "regulier" ? "Lequel est le plus régulier (le moins dispersé) ?" : type === "risque" ? "Lequel est le plus irrégulier (le plus dispersé) ?" : `Lequel ${d.plus} ?`;
  const aGagne = type === "regulier" ? val(sA) < val(sB) : type === "risque" ? val(sA) > val(sB) : val(eA) > val(eB);
  const bon = maj(aGagne ? d.A : d.B);
  return {
    text: `${d.ctx} On note $${nomX}_A$ et $${nomX}_B$ ${d.quoi}, pour ${d.A} (A) et pour ${d.B} (B). On a $E(${nomX}_A) = ${tx(eA)}$, $\\sigma(${nomX}_A) = ${tx(sA)}$, $E(${nomX}_B) = ${tx(eB)}$ et $\\sigma(${nomX}_B) = ${tx(sB)}$. ${q}`,
    format: "qcm",
    ...qcmS(bon, [maj(d.A), maj(d.B), "Les deux se valent : ils ont la même espérance", "On ne peut pas comparer sans connaître les lois"]),
    comparator: "mcq_exact",
    explanation: exp(
      "L'espérance donne la valeur moyenne ; l'écart-type mesure la dispersion autour de cette moyenne.",
      type === "moyenne" ? "On compare les espérances." : "Les espérances sont égales : on compare les écarts-types.",
      type === "moyenne" ? `$${tx(eA)}$ contre $${tx(eB)}$.` : `$\\sigma_A = ${tx(sA)}$ contre $\\sigma_B = ${tx(sB)}$ : ${type === "regulier" ? "le plus petit écart-type" : "le plus grand écart-type"} l'emporte.`,
      `Réponse : ${aGagne ? d.A : d.B}. Même espérance ne veut pas dire même comportement : l'écart-type fait la différence.`,
    ),
  };
}

/** « un gain d'environ 20 € », « une perte d'environ 15 € ». */
const bilan = (x: R) => (x.n === 0 ? "ni gain ni perte" : x.n > 0 ? `un gain d'environ ${eur(x)}` : `une perte d'environ ${eur(r(-x.n, x.d))}`);

/** ★4 — Sur n parties : n × E(G). */
function intLoterie(): Q {
  const base = sitArgent();
  const eX = E(base);
  const mise = Math.max(1, Math.round(val(eX)) + pick([-1, 1, 2]));
  const s = avecMise(base, mise);
  const eG = E(s);
  if (eG.n === 0) return intLoterie();
  const n = pick([50, 100, 200, 300, 1000]);
  const tot = mul(r(n), eG);
  const donne = Math.random() < 0.5;
  return {
    text: `${pres(s, { loi: s.donnee })}${donne ? ` On a calculé $E(G) = ${tx(eG)}$.` : ""} Un joueur fait ${n} parties. ${pick(["Que peut-il prévoir, en moyenne, sur l'ensemble de ces parties ?", "Quel bilan peut-il attendre en moyenne ?"])}`,
    format: "qcm",
    canvas: s.donnee ? tableau(s) : undefined,
    ...qcmR(tot, [eG, r(-tot.n, tot.d), mul(r(n), eX), mul(r(n), r(mise))], bilan),
    comparator: "mcq_exact",
    explanation: exp(
      "L'espérance est le gain moyen PAR partie ; sur $n$ parties, le bilan moyen est $n \\times E(G)$.",
      `On calcule $E(G)$, puis on multiplie par $${n}$.`,
      `${donne ? "" : `$E(G) = E(X) - ${mise} = ${tx(eX)} - ${mise} = ${tx(eG)}$ ; `}$${n} \\times ${eG.n < 0 ? `(${tx(eG)})` : tx(eG)} = ${tx(tot)}$.`,
      `En moyenne : ${bilan(tot)} (ce n'est pas garanti : c'est une moyenne).`,
    ),
  };
}

/** ★5 — Le point de vue de l'organisateur : bénéfice moyen = −N × E(G). */
function intOrganisateur(): Q {
  const base = sitComptage((x) => x.argent);
  const eX = E(base);
  const mise = Math.max(1, Math.ceil(val(eX)) + ri(0, 2));
  const s = avecMise(base, mise);
  const eG = E(s);
  if (eG.n === 0) return intOrganisateur();
  const N = pick([100, 200, 250, 400, 500]);
  const benef = mul(r(-N), eG);
  return {
    text: `${pres(s, { loi: false })} L'organisateur prévoit ${N} parties sur la journée. ${pick(["Quel bilan peut-il espérer, en moyenne ?", "Que peut-il attendre, en moyenne, pour sa caisse ?"])}`,
    format: "qcm",
    ...qcmR(benef, [mul(r(N), eG), mul(r(N), r(mise)), r(-eG.n, eG.d), mul(r(-N), sub(eX, r(0)))], bilan),
    comparator: "mcq_exact",
    explanation: exp(
      "Ce que le joueur gagne, l'organisateur le perd : par partie, l'organisateur gagne en moyenne $-E(G)$.",
      "On calcule $E(G)$ à partir de la loi, puis on multiplie par $-N$.",
      `${loiDetail(base)} ; $E(X) = ${tx(eX)}$, $E(G) = ${tx(eX)} - ${mise} = ${tx(eG)}$ ; $-${N} \\times ${eG.n < 0 ? `(${tx(eG)})` : tx(eG)} = ${tx(benef)}$.`,
      `Pour l'organisateur : ${bilan(benef)}.`,
    ),
  };
}

/* =========================================================================
   VA_DEFI — Exercices type bac
========================================================================= */
const verdict = (x: R) => (x.n === 0 ? "le jeu est équitable" : x.n > 0 ? "le jeu est favorable au joueur" : "le jeu est défavorable au joueur");
const resultat = (x: R) => `$E(G) = ${tx(x)}$ € : ${verdict(x)}`;

/** ★4-5 — Tout le jeu : loi, E(G), verdict. */
function defiJeuComplet(): Q {
  const base = sitComptage((x) => x.argent);
  const eX = E(base);
  const mise = choisirMise(eX);
  const rm = r(Math.round(mise * 100), 100);
  const eG = sub(eX, rm);
  const faux = (x: R, v: R) => `$E(G) = ${tx(x)}$ € : ${verdict(v)}`;
  const autreVerdict = eG.n >= 0 ? r(-1) : r(1);
  return {
    text: `${pres(base, { loi: false })} ${phraseMise(mise)} On note $G$ le gain algébrique du joueur. ${pick(["Calcule $E(G)$ et conclus.", "Quelle est l'espérance de $G$, et que peut-on en conclure ?", "Le jeu est-il équitable ? Justifie par $E(G)$."])}`,
    format: "qcm",
    ...qcmS(resultat(eG), [resultat(eX), faux(eG, autreVerdict), resultat(r(-eG.n, eG.d)), resultat(sub(moyValeurs(base), rm)), faux(eG, r(1)), faux(eG, r(-1)), faux(eG, r(0))]),
    comparator: "mcq_exact",
    explanation: exp(
      "$E(G) = E(X) - \\text{mise}$ ; le jeu est équitable si $E(G) = 0$, favorable si $E(G) > 0$, défavorable si $E(G) < 0$.",
      "On écrit la loi du gain $X$ (sans la mise), on calcule $E(X)$, puis on retire la mise.",
      `${loiDetail(base)}. $E(X) = ${sommeTx(base)} = ${tx(eX)}$ ; $E(G) = ${tx(eX)} - ${tx(rm)} = ${tx(eG)}$.`,
      `${resultat(eG)}.`,
    ),
  };
}

/** ★4 — E(X²) : on élève les VALEURS au carré. */
function defiEX2(): Q {
  const s = sitTout((x) => x.donnee || loiDecimale(x));
  const e = E(s);
  const e2 = E2(s);
  const sansP = r(s.issues.reduce((a, i) => a + i.v * i.v, 0));
  const pCarre = somme(s.issues.map((i) => mul(r(i.v), mul(P(s, i), P(s, i)))));
  return {
    text: `${pres(s, { loi: true })} Pour calculer la variance, on a besoin de $E(${s.L}^2)$. ${pick(["Que vaut $E(" + s.L + "^2)$ ?", "Calcule $E(" + s.L + "^2)$."])}`,
    format: "qcm",
    canvas: tableau(s),
    ...qcmR(e2, [mul(e, e), sansP, pCarre, V(s)]),
    comparator: "mcq_exact",
    explanation: exp(
      `$E(${s.L}^2) = \\sum x_i^2 \\, P(${s.L} = x_i)$ : on élève les VALEURS au carré, les probabilités restent telles quelles.`,
      `Attention : $E(${s.L}^2)$ n'est pas $E(${s.L})^2 = ${tx(mul(e, e))}$.`,
      `$E(${s.L}^2) = ${sommeTx(s, true)} = ${tx(e2)}$.`,
      `$E(${s.L}^2) = ${tx(e2)}$ ; alors $V(${s.L}) = ${tx(e2)} - ${tx(mul(e, e))} = ${tx(V(s))}$.`,
    ),
  };
}

/** ★4 — Deux probabilités inconnues : somme = 1 et espérance connue. */
function defiTrouverP(): Q {
  const s = sitTout((x) => x.donnee && x.issues.length === 3 && x.issues[0].v === 0);
  if (!(s.donnee && s.issues.length === 3 && s.issues[0].v === 0)) return defiEX2();
  const [i0, i1, i2] = s.issues;
  const [p, q, t] = [P(s, i0), P(s, i1), P(s, i2)];
  const e = E(s);
  const b = i1.v;
  const c = i2.v;
  const loi = `$P(${s.L} = 0) = p$, $P(${s.L} = ${b}) = q$ et $P(${s.L} = ${c}) = ${tx(t)}$`;
  const cherche = pick(["p", "q"] as const);
  const bon = cherche === "q" ? q : p;
  return {
    text: `${contexte(s)} Sa loi s'écrit : ${loi}, et l'on sait que $E(${s.L}) = ${tx(e)}$. ${pick([`Que vaut $${cherche}$ ?`, `Détermine $${cherche}$.`])}`,
    format: "qcm",
    ...qcmP(bon, cherche === "q" ? [mul(e, r(1, b)), sub(r(1), t), p, mul(e, r(1, b + c))] : [q, sub(r(1), t), sub(r(1), mul(e, r(1, b))), mul(e, r(1, b))]),
    comparator: "mcq_exact",
    explanation: exp(
      "Deux inconnues, deux équations : la somme des probabilités vaut $1$, et la formule de l'espérance.",
      `$E(${s.L}) = 0 \\times p + ${b === 1 ? "" : b}q + ${c} \\times ${tx(t)}$ donne $q$ ; puis $p = 1 - q - ${tx(t)}$.`,
      `$${b === 1 ? "" : b}q = ${tx(e)} - ${tx(mul(r(c), t))} = ${tx(mul(r(b), q))}$, donc $q = ${tx(q)}$ ; $p = 1 - ${tx(q)} - ${tx(t)} = ${tx(p)}$.`,
      `$${cherche} = ${tx(bon)}$.`,
    ),
  };
}

/** ★5 — Deux étapes : un premier tirage choisit le sac, puis on tire dans ce sac. */
function defiDeuxEtapes(): Q {
  const u = pick(URNES.filter((x) => !/canard|enveloppe/.test(x.objS)));
  const [gagne] = melange(u.sortes);
  const n1 = pick([4, 5, 8, 10]);
  const n2 = pick([4, 5, 8, 10]);
  const g1 = ri(1, n1 - 1);
  const g2 = ri(1, n2 - 1);
  const etape = pick([
    { txt: "On lance une pièce équilibrée : pile, on tire dans le sac A ; face, dans le sac B.", pA: r(1, 2) },
    { txt: "On lance un dé cubique équilibré : avec 1 ou 2, on tire dans le sac A ; sinon, dans le sac B.", pA: r(1, 3) },
    { txt: "On lance un dé cubique équilibré : avec 6, on tire dans le sac A ; sinon, dans le sac B.", pA: r(1, 6) },
    { txt: "On tire au sort l'un des deux sacs, le sac A avec la probabilité $0{,}4$, le sac B sinon.", pA: r(2, 5) },
  ]);
  const pB = sub(r(1), etape.pA);
  const a = pick([5, 10, 12, 15, 20]);
  const mise = ri(1, Math.max(1, Math.floor(a / 2)));
  const pG = add(mul(etape.pA, r(g1, n1)), mul(pB, r(g2, n2)));
  const eG = sub(mul(r(a), pG), r(mise));
  const melangeSacs = sub(mul(r(a), r(g1 + g2, n1 + n2)), r(mise));
  const sansPoids = sub(mul(r(a), add(r(g1, n1), r(g2, n2))), r(mise));
  const objS = u.objS.replace(/^(\S+).*/, "$1");
  const sac = (n: number, g: number) => `${nb(g, `${u.objS} ${gagne[0]}`, `${u.objP} ${gagne[1]}`)} sur ${n} ${u.objP}`;
  return {
    text: `Jeu de la kermesse : le sac A contient ${sac(n1, g1)}, le sac B ${sac(n2, g2)}. ${etape.txt} ${maj(u.f ? "une" : "un")} ${u.objS} ${gagne[0]} rapporte ${a} €, ${u.f ? "toute autre" : "tout autre"} ${objS} ne rapporte rien ; une partie coûte ${mise} €. On note $G$ le gain algébrique. ${pick(["Que vaut $E(G)$ ?", "Calcule l'espérance de $G$.", "Quelle est l'espérance du gain algébrique ?"])}`,
    format: "qcm",
    ...qcmR(eG, [melangeSacs, add(eG, r(mise)), sansPoids, mul(r(a), pG)]),
    comparator: "mcq_exact",
    explanation: exp(
      "Formule des probabilités totales : $P(\\text{gagnant}) = P(A)\\,P_A(\\text{gagnant}) + P(B)\\,P_B(\\text{gagnant})$.",
      "On calcule la probabilité de tirer un objet gagnant, puis la loi de $G$ (deux valeurs), puis $E(G)$.",
      `$P(\\text{gagnant}) = ${tx(etape.pA)} \\times \\dfrac{${g1}}{${n1}} + ${tx(pB)} \\times \\dfrac{${g2}}{${n2}} = ${tx(pG)}$. $G$ vaut $${a - mise}$ (probabilité $${tx(pG)}$) ou $${-mise}$ : $E(G) = ${a - mise} \\times ${tx(pG)} + (${-mise}) \\times ${tx(sub(r(1), pG))} = ${tx(eG)}$.`,
      `$E(G) = ${tx(eG)}$ €, donc ${verdict(eG)}.`,
    ),
  };
}

/** ★5 — Rendre le jeu équitable : trouver la mise, ou le montant du gros lot. */
function defiMiseEquitable(): Q {
  const ok = (x: Sit) => x.argent && x.issues.length === 3 && x.issues[0].v === 0 && 100 % E(x).d === 0;
  const base = sitComptage(ok);
  if (!ok(base)) return defiJeuComplet();
  const eX = E(base);
  if (Math.random() < 0.5) {
    return {
      text: `${pres(base, { loi: false })} ${pick(["Quelle mise faut-il demander pour que le jeu soit équitable ?", "Quel prix de la partie rend ce jeu équitable ?"])}`,
      format: "qcm",
      ...qcmR(eX, [moyValeurs(base), r(base.issues[2].v), mul(r(base.issues[2].v), P(base, base.issues[2])), add(eX, r(1))], eur),
      comparator: "mcq_exact",
      explanation: exp("Avec une mise $m$ : $E(G) = E(X) - m$. Le jeu est équitable si $E(G) = 0$, c'est-à-dire $m = E(X)$.", "On calcule l'espérance du gain $X$ (sans mise).", `${loiDetail(base)}. $E(X) = ${sommeTx(base)} = ${tx(eX)}$.`, `La mise équitable est $${tx(eX)}$ €.`),
    };
  }
  // Le gros lot inconnu : mise donnée, on cherche a tel que E(G) = 0.
  const [, ib, ia] = base.issues;
  const a = ia.v;
  const mise = eX;
  const sansA = (t: string) => t.replace(new RegExp(`(?<![0-9,])${a} €`, "g"), "$a$ €");
  const qui = sansA(ia.ev);
  return {
    text: `${sansA(base.intro)} ${pick(["Une partie coûte", "Le prix d'une partie est"])} ${eur(mise)}. ${pick(["Quelle valeur de $a$ rend le jeu équitable ?", "Pour quel montant $a$ le jeu est-il équitable ?"])}`,
    format: "qcm",
    ...qcmR(r(a), [mul(mise, r(base.D)), r(a * ia.n), mul(mise, r(base.D, ia.n)), add(r(a), r(ib.v))]),
    comparator: "mcq_exact",
    explanation: exp(
      "Le jeu est équitable si l'espérance du gain est égale à la mise.",
      `On écrit $E(X)$ avec l'inconnue $a$ : le cas « ${qui} » a la probabilité $\\dfrac{${ia.n}}{${base.D}}$.`,
      `$a \\times \\dfrac{${ia.n}}{${base.D}} + ${ib.v} \\times \\dfrac{${ib.n}}{${base.D}} = ${tx(mise)}$, donc $${ia.n}a = ${tx(mul(mise, r(base.D)))} - ${ib.v * ib.n} = ${a * ia.n}$ et $a = ${a}$.`,
      `$a = ${a}$ €.`,
    ),
  };
}

/** ★5 — σ(G) quand G = X − mise : la mise ne change pas la dispersion. */
function defiSigmaMise(): Q {
  const base = sitComptage((x) => x.argent);
  const brut = base.issues.map((i) => i.v);
  const mise = miseTiree(brut);
  const s = avecMise(base, mise);
  const sg = sigma(s);
  const e2G = val(E2(s));
  return {
    text: `${pres(s, { loi: false })} ${pick([`Calcule $\\sigma(G)$, arrondi au centième.`, `Que vaut l'écart-type de $G$ (arrondi au centième) ?`])}`,
    format: "qcm",
    ...qcmN(sg, [Math.abs(sg - mise), val(V(s)), Math.sqrt(e2G), sg + mise]),
    comparator: "mcq_exact",
    explanation: exp(
      "$G = X - \\text{mise}$ et $\\sigma(X - b) = \\sigma(X)$ : retirer la même somme à chaque valeur ne change pas la dispersion.",
      "On calcule $V(X)$ avec la loi du gain sans mise, puis la racine.",
      `${loiDetail(base)}. $E(X) = ${tx(E(base))}$, $E(X^2) = ${tx(E2(base))}$, $V(X) = ${tx(V(base))}$ ; $\\sigma(G) = \\sigma(X) = \\sqrt{${tx(V(base))}} \\approx ${arr2(sg).slice(1, -1)}$.`,
      `$\\sigma(G) \\approx ${arr2(sg).slice(1, -1)}$ (la mise déplace l'espérance, pas l'écart-type).`,
    ),
  };
}

/* =========================================================================
   LA BANQUE — les ids d'origine sont gardés (figés devenus gabarits).
========================================================================= */
const D_ = "va_definition";
const L_ = "va_loi_probabilite";
const E_ = "va_esperance";
const V_ = "va_variance_ecart_type";
const I_ = "va_interpreter";
const F_ = "va_defi";
const id = (s: string) => `terminale_spe_${s}`;

export const variablesAleatoiresBank: TutorBankItemV4[] = [
  // VA_DEFINITION
  gab(id("va_definition_fixed_1"), D_, 1, "Pour chaque résultat possible, quel nombre prend $X$ ?", ["definition", "valeurs", "qcm"], defValeurs),
  gab(id("va_definition_fixed_2"), D_, 2, "$X(\\Omega)$ : les VALEURS de $X$, pas les effectifs.", ["definition", "valeurs", "qcm"], defValeurs),
  gab(id("va_definition_fixed_3"), D_, 2, "$\\{X = k\\}$ : les résultats pour lesquels $X$ vaut $k$.", ["definition", "evenement", "qcm"], defEvenement),
  gab(id("va_definition_fixed_4"), D_, 2, "$P(X = k)$ est la probabilité de l'événement $\\{X = k\\}$.", ["definition", "notation", "qcm"], defProbaSens),
  gab(id("va_definition_fixed_8"), D_, 2, "Chaque probabilité est entre $0$ et $1$, et leur somme vaut $1$.", ["definition", "loi", "qcm"], defLoiValide),
  gab(id("va_definition_fixed_5"), D_, 3, "Fais la somme des probabilités proposées.", ["definition", "loi", "qcm"], defLoiValide),
  gab(id("va_definition_fixed_6"), D_, 3, "Traduis l'égalité avec les mots de la situation.", ["definition", "notation", "qcm"], defProbaSens),
  gab(id("va_definition_fixed_7"), D_, 3, "Repère les valeurs qui vérifient l'inégalité (large ou stricte ?).", ["definition", "evenement", "qcm"], defEvenementIneg),
  gab(id("va_definition_fixed_9"), D_, 4, "Gain algébrique = gain − mise : il peut être négatif.", ["definition", "mise", "qcm"], defMise),
  gab(id("va_definition_fixed_10"), D_, 4, "Calcule $G$ pour chaque résultat, puis regarde son signe.", ["definition", "mise", "evenement", "qcm"], defEvenementMise),

  // VA_LOI_PROBABILITE
  gab(id("va_loi_fixed_1"), L_, 2, "Cas favorables ÷ nombre TOTAL de cas.", ["loi", "qcm"], loiLireP),
  gab(id("va_loi_fixed_4"), L_, 2, "Cas favorables ÷ nombre TOTAL de cas.", ["loi", "qcm"], loiLireP),
  gab(id("va_loi_fixed_2"), L_, 2, "Traduis l'événement en $\\{X = k\\}$, puis lis le tableau.", ["loi", "tableau", "canvas", "qcm"], loiLireTableau),
  gab(id("va_loi_fixed_3"), L_, 3, "La somme des probabilités vaut $1$.", ["loi", "canvas", "qcm"], loiManquante),
  gab(id("va_loi_fixed_8"), L_, 3, "La somme des probabilités vaut $1$.", ["loi", "canvas", "qcm"], loiManquante),
  gab(id("va_loi_tpl_1"), L_, 3, "La somme des probabilités vaut $1$.", ["loi", "canvas", "qcm"], loiManquante),
  gab(id("va_loi_fixed_5"), L_, 3, "Additionne les probabilités des valeurs qui conviennent.", ["loi", "cumul", "qcm"], loiCumul),
  gab(id("va_loi_fixed_6"), L_, 3, "Large ou stricte : la valeur frontière compte-t-elle ?", ["loi", "cumul", "qcm"], loiCumul),
  gab(id("va_loi_fixed_7"), L_, 4, "Valeurs : gain − mise ; probabilités : cas favorables ÷ total.", ["loi", "mise", "qcm"], loiComplete),
  gab(id("va_loi_fixed_9"), L_, 4, "Fais l'arbre : on multiplie le long d'un chemin, on additionne les chemins.", ["loi", "independance", "qcm"], loiIndependants),

  // VA_ESPERANCE
  gab(id("va_esperance_fixed_1"), E_, 2, "$E(X) = \\sum x_i\\,P(X = x_i)$.", ["esperance", "canvas", "qcm"], espTableau),
  gab(id("va_esperance_fixed_6"), E_, 2, "Chaque valeur multipliée par sa probabilité, puis on additionne.", ["esperance", "canvas", "qcm"], espTableau),
  gab(id("va_esperance_fixed_2"), E_, 3, "Écris d'abord la loi, puis $E(X) = \\sum x_i\\,P(X = x_i)$.", ["esperance", "qcm"], espComptage),
  gab(id("va_esperance_fixed_3"), E_, 3, "Écris d'abord la loi, puis $E(X) = \\sum x_i\\,P(X = x_i)$.", ["esperance", "qcm"], espComptage),
  gab(id("va_esperance_fixed_4"), E_, 3, "Ce n'est pas la moyenne des valeurs : pondère par les probabilités.", ["esperance", "qcm"], espComptage),
  gab(id("va_esperance_tpl_1"), E_, 3, "Écris d'abord la loi, puis $E(X) = \\sum x_i\\,P(X = x_i)$.", ["esperance", "qcm"], espComptage),
  gab(id("va_esperance_fixed_5"), E_, 4, "$E(G) = E(X) - \\text{mise}$.", ["esperance", "mise", "qcm"], espMise),
  gab(id("va_esperance_fixed_9"), E_, 4, "$E(G) = E(X) - \\text{mise}$.", ["esperance", "mise", "qcm"], espMise),
  gab(id("va_esperance_fixed_7"), E_, 4, "$E(aX + b) = a\\,E(X) + b$.", ["esperance", "linearite", "qcm"], espLineaire),
  gab(id("va_esperance_fixed_8"), E_, 4, "$E(aX + b) = a\\,E(X) + b$.", ["esperance", "linearite", "qcm"], espLineaire),

  // VA_VARIANCE_ECART_TYPE
  gab(id("va_variance_fixed_1"), V_, 2, "$\\sigma = \\sqrt{V}$ et $V = \\sigma^2$.", ["variance", "ecart_type", "qcm"], varSigma),
  gab(id("va_variance_fixed_2"), V_, 2, "$\\sigma = \\sqrt{V}$ et $V = \\sigma^2$.", ["variance", "ecart_type", "qcm"], varSigma),
  gab(id("va_variance_fixed_5"), V_, 3, "$V(X) = E(X^2) - E(X)^2$.", ["variance", "konig", "qcm"], varKonig),
  gab(id("va_variance_fixed_8"), V_, 3, "Élève $E(X)$ au carré avant de soustraire.", ["variance", "konig", "qcm"], varKonig),
  gab(id("va_variance_fixed_3"), V_, 4, "Calcule $E(X)$, puis $E(X^2)$, puis $V = E(X^2) - E(X)^2$.", ["variance", "canvas", "qcm"], varCalcul),
  gab(id("va_variance_fixed_6"), V_, 4, "Calcule $E(X)$, puis $E(X^2)$, puis $V = E(X^2) - E(X)^2$.", ["variance", "canvas", "qcm"], varCalcul),
  gab(id("va_variance_fixed_4"), V_, 4, "$V(aX + b) = a^2 V(X)$ et $\\sigma(aX + b) = |a|\\,\\sigma(X)$.", ["variance", "linearite", "qcm"], varLineaire),
  gab(id("va_variance_fixed_10"), V_, 4, "$b$ décale les valeurs sans changer leur dispersion.", ["variance", "linearite", "qcm"], varLineaire),
  gab(id("va_variance_fixed_7"), V_, 5, "Loi, $E(X)$, $E(X^2)$, $V(X)$, puis la racine carrée.", ["ecart_type", "qcm"], varSigmaArrondi),
  gab(id("va_variance_fixed_9"), V_, 5, "N'oublie pas la racine carrée à la fin.", ["ecart_type", "qcm"], varSigmaArrondi),

  // VA_INTERPRETER
  gab(id("va_interpreter_fixed_1"), I_, 2, "L'espérance est une moyenne sur un grand nombre de répétitions.", ["interpreter", "esperance", "qcm"], intE),
  gab(id("va_interpreter_fixed_2"), I_, 2, "L'écart-type mesure la dispersion autour de l'espérance.", ["interpreter", "ecart_type", "qcm"], intSigmaSens),
  gab(id("va_interpreter_fixed_3"), I_, 3, "Équitable : $E(G) = 0$ ; compare $E(X)$ à la mise.", ["interpreter", "equitable", "qcm"], intEquitable),
  gab(id("va_interpreter_fixed_4"), I_, 3, "$E(G) = E(X) - m$ : quel signe veut-on ?", ["interpreter", "equitable", "qcm"], intMiseSeuil),
  gab(id("va_interpreter_fixed_7"), I_, 3, "$E(G) = E(X) - m$ : quel signe veut-on ?", ["interpreter", "equitable", "qcm"], intMiseSeuil),
  gab(id("va_interpreter_fixed_10"), I_, 3, "Même espérance ? Alors compare les écarts-types.", ["interpreter", "ecart_type", "qcm"], intComparer, "reunion"),
  gab(id("va_interpreter_fixed_5"), I_, 4, "Même espérance ? Alors compare les écarts-types.", ["interpreter", "ecart_type", "qcm"], intComparer, "reunion"),
  gab(id("va_interpreter_fixed_8"), I_, 4, "Équitable : $E(G) = 0$ ; favorable : $E(G) > 0$.", ["interpreter", "equitable", "qcm"], intEquitable),
  gab(id("va_interpreter_fixed_6"), I_, 4, "Sur $n$ parties, le bilan moyen est $n \\times E(G)$.", ["interpreter", "repetition", "qcm"], intLoterie),
  gab(id("va_interpreter_fixed_9"), I_, 5, "Ce que le joueur gagne, l'organisateur le perd.", ["interpreter", "organisateur", "qcm"], intOrganisateur),

  // VA_DEFI
  gab(id("va_defi_fixed_1"), F_, 4, "Loi du gain, $E(X)$, puis $E(G) = E(X) - \\text{mise}$.", ["type_bac", "qcm"], defiJeuComplet),
  gab(id("va_defi_fixed_4"), F_, 4, "$E(X^2)$ : on élève les VALEURS au carré.", ["type_bac", "variance", "canvas", "qcm"], defiEX2),
  gab(id("va_defi_fixed_6"), F_, 4, "Deux équations : somme des probabilités et espérance.", ["type_bac", "systeme", "qcm"], defiTrouverP),
  gab(id("va_defi_fixed_8"), F_, 4, "Par partie, l'organisateur gagne en moyenne $-E(G)$.", ["type_bac", "organisateur", "qcm"], intOrganisateur),
  gab(id("va_defi_fixed_2"), F_, 5, "Probabilités totales : on pondère par la probabilité de chaque sac.", ["type_bac", "arbre", "qcm"], defiDeuxEtapes),
  gab(id("va_defi_fixed_3"), F_, 5, "Loi du gain, $E(X)$, puis $E(G) = E(X) - \\text{mise}$.", ["type_bac", "equitable", "qcm"], defiJeuComplet),
  gab(id("va_defi_fixed_5"), F_, 5, "Équitable : la mise est égale à l'espérance du gain.", ["type_bac", "equitable", "qcm"], defiMiseEquitable),
  gab(id("va_defi_fixed_7"), F_, 5, "$\\sigma(X - b) = \\sigma(X)$.", ["type_bac", "ecart_type", "qcm"], defiSigmaMise),
  gab(id("va_defi_fixed_9"), F_, 5, "Loi, $E(X)$, $E(X^2)$, $V(X)$, puis la racine carrée.", ["type_bac", "ecart_type", "qcm"], varSigmaArrondi),
  gab(id("va_defi_fixed_10"), F_, 5, "Sur $n$ parties, le bilan moyen est $n \\times E(G)$.", ["type_bac", "repetition", "qcm"], intLoterie),
];
