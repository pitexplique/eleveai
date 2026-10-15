// lib/tutor-v4/questionBank/premiere/maths/automatismes-probabilites.bank.ts
//
// Notions : auto_proba_base, auto_proba_lecture (automatismes, domaine BOP1AU)
//
// Micros : auto_proba_encadrement, auto_proba_somme_issues, auto_proba_contraire,
// auto_proba_equiprobabilite (auto_proba_base) ; auto_proba_intersection_tableau,
// auto_proba_conditionnelle_lecture, auto_proba_distinguer (auto_proba_lecture).
//
// ⛔⛔ 15/10/2026 — « DES QUESTIONS REVIENNENT ». Mesuré avant
// (scripts/mesurer-squelettes-coach.ts premiere auto_proba_base auto_proba_lecture) :
// les 7 micros sous le seuil, 1 à 5 squelettes par micro, 15 à 19 répétitions
// sur une série de 20 à la même étoile. Un seul gabarit par micro, une phrase
// fixe, un seul décor (« un dé truqué à quatre faces », « une urne de jetons »).
// Même méthode que les probabilités de 3e (dd5e9f75) : chaque gabarit croise
//   · une SITUATION (vingt-quatre tableaux croisés : section sportive, car
//     jaune, randonneurs du Piton de la Fournaise, kermesse, self du lycée,
//     coureurs de la Diagonale des Fous, marché de Saint-Paul, école de surf
//     de Saint-Leu, gîte de Cilaos… ; des urnes, des dés, des roues, la météo,
//     les matchs, la tombola) ;
//   · une TOURNURE (trois ou quatre façons de poser la même question) ;
//   · des NOMBRES tirés, les valeurs calculées exactement (centièmes entiers).
// Les quatre gabarits historiques de auto_proba_base vivaient dans
// automatismes-proportions-stats.bank.ts : ils sont ici, ids conservés.
// Les trois gabarits historiques de auto_proba_lecture restent dans
// probabilites-conditionnelles.bank.ts (ids conservés) : ceux d'ici les
// complètent, à la même étoile, pour que l'élève ne les voie plus revenir.
//
// ⚠️ AUTOMATISMES, SANS CALCULATRICE : des centièmes multiples de 5, des
// fractions lues dans un tableau (acceptées brutes, simplifiées, en décimal ou
// en pourcentage quand ils tombent juste : `ecritures`).
// ⭐ QCM : `qcmF` écarte les leurres de même VALEUR (jamais 2/4 à côté de 1/2) ;
// les leurres sont les erreurs vraies (diviser par le total au lieu de la
// ligne, inverser la condition, oublier le « 1 − »).

import type { CanvasFigure, DifficultyLevel, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { PRENOMS, type Prenom } from "@/lib/tutor-v4/questionBank/6e/maths/entiers.bank";

type Q = TutorGeneratedQuestionV4;

/* ─────────────────────────── outils ─────────────────────────── */

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
const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const ilElle = (p: Prenom) => (p.f ? "elle" : "il");
/** « que le car… », « qu'il pleuve », « qu'aucun… ». */
/** « de pièces », « d'élèves ». */
const deN = (s: string) => (/^[aeiouéèh]/i.test(s) ? `d'${s}` : `de ${s}`);
const qu = (s: string) => (/^[aeiouéèh]/i.test(s) ? `qu'${s}` : `que ${s}`);
function pgcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : pgcd(b, a % b);
}
/** 0.35 → « 0,35 ». */
function fr(x: number): string {
  const r = Math.round(x * 1000000) / 1000000;
  return String(r).replace(".", ",");
}
/** Un nombre de centièmes affiché : 35 → « $0,35$ ». */
const dc = (c: number) => `$${fr(c / 100)}$`;
/** Un nombre de millièmes affiché : 343 → « $0,343$ ». */
const dm = (c: number) => `$${fr(c / 1000)}$`;

type Fr = [number, number];
const red = (a: number, b: number): Fr => (a === 0 ? [0, 1] : [a / pgcd(a, b), b / pgcd(a, b)]);
/** « $\dfrac{3}{8}$ », « $0$ », « $1$ ». */
const tf = (a: number, b: number) => (a === 0 ? "$0$" : b === 1 ? `$${a}$` : `$\\dfrac{${a}}{${b}}$`);
/** L'écriture décimale exacte de a/b, ou null si elle ne tombe pas juste (1/3…). */
function decimale(a: number, b: number): string | null {
  let d = red(a, b)[1];
  while (d % 2 === 0) d /= 2;
  while (d % 5 === 0) d /= 5;
  return d === 1 ? fr(a / b) : null;
}
function pourcent(a: number, b: number): string | null {
  const v = (100 * a) / b;
  const r = Math.round(v * 100) / 100;
  return Math.abs(v - r) < 1e-9 ? `${fr(r)} %` : null;
}
/** « $\dfrac{6}{8}$ = $\dfrac{3}{4}$ = 0,75 » : les égalités de l'explication. */
function egalites(a: number, b: number): string {
  const [n, d] = red(a, b);
  const t = [tf(a, b)];
  if (n !== a && d !== 1) t.push(tf(n, d));
  const dec = decimale(a, b);
  if (dec !== null && d !== 1) t.push(`$${dec}$`);
  return t.join(" $=$ ");
}
/** Toutes les écritures acceptées d'une probabilité a/b. */
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
/** QCM de fractions : trois leurres distincts EN VALEUR de la bonne réponse et entre eux. */
function qcmF(bon: Fr, pieges: Fr[]): { choices: string[]; expected: string[] } {
  const v = (f: Fr) => f[0] / f[1];
  const secours: Fr[] = [
    [bon[0] + 1, bon[1]],
    [bon[0], bon[1] + 1],
    [bon[0] + 2, bon[1]],
    [bon[0], bon[1] + 2],
  ];
  const pris: Fr[] = [];
  for (const f of [...melange(pieges), ...secours]) {
    if (pris.length === 3) break;
    if (!(f[1] > 0) || f[0] < 0 || !Number.isInteger(f[0]) || !Number.isInteger(f[1])) continue;
    if ([bon, ...pris].some((g) => Math.abs(v(g) - v(f)) < 1e-9)) continue;
    pris.push(f);
  }
  const c = tf(bon[0], bon[1]);
  return { choices: melange([c, ...pris.map((f) => tf(f[0], f[1]))]), expected: [c] };
}
/** n parts multiples de 5 (au moins 5 chacune), de somme `total` (en centièmes). */
function partage(n: number, total = 100): number[] {
  const crans = total / 5;
  const coupes = new Set<number>();
  while (coupes.size < n - 1) coupes.add(ri(1, crans - 1));
  const c = [0, ...[...coupes].sort((x, y) => x - y), crans];
  return c.slice(1).map((x, i) => (x - c[i]) * 5);
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

const OUI_NON = ["oui", "non"];

function gab(
  id: string,
  notionId: "auto_proba_base" | "auto_proba_lecture",
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
    niveau: "premiere",
    matiere: "maths",
    notionId,
    microId,
    difficulty,
    theme,
    hint,
    tags: ["premiere", "maths", "automatisme", "probabilites", ...tags, "template"],
    generate,
  };
}

/* ═══════════════════════ LES ÉVÈNEMENTS DE LA VIE COURANTE ═══════════════════════
   [« que » + subjonctif, l'évènement contraire au même mode]. */

const EVENEMENTS: readonly (readonly [string, string])[] = [
  ["le car jaune soit en retard ce matin", "le car jaune soit à l'heure ce matin"],
  ["il pleuve demain à Cilaos", "il ne pleuve pas demain à Cilaos"],
  ["l'équipe de foot de Saint-Pierre gagne son match", "l'équipe ne gagne pas son match"],
  ["une pièce prélevée au hasard soit défectueuse", "la pièce soit conforme"],
  ["le Piton de la Fournaise entre en éruption ce mois-ci", "le volcan n'entre pas en éruption ce mois-ci"],
  ["un ticket de tombola acheté à la kermesse soit gagnant", "le ticket soit perdant"],
  ["le tir au but de Yanis soit réussi", "le tir au but soit manqué"],
  ["un élève pris au hasard soit demi-pensionnaire", "l'élève ne soit pas demi-pensionnaire"],
  ["un téléphone neuf tombe en panne avant deux ans", "le téléphone ne tombe pas en panne avant deux ans"],
  ["la route du littoral soit fermée demain", "la route du littoral soit ouverte demain"],
  ["un letchi pris au hasard dans la barquette soit abîmé", "le letchi soit en bon état"],
  ["un test de dépistage soit positif", "le test soit négatif"],
  ["une graine de vanille plantée germe", "la graine ne germe pas"],
  ["le vol pour Paris parte en retard", "le vol parte à l'heure"],
  ["un client du marché paie par carte", "le client ne paie pas par carte"],
  ["on tire une carte de cœur dans le jeu", "on ne tire pas de carte de cœur"],
  ["le dé tombe sur 6", "le dé ne tombe pas sur 6"],
  ["un cyclone touche l'île cette saison", "aucun cyclone ne touche l'île cette saison"],
  ["un coureur inscrit termine la Diagonale des Fous", "le coureur ne termine pas la course"],
  ["une ampoule dure plus de 1 000 heures", "l'ampoule dure 1 000 heures ou moins"],
  ["un surfeur de Saint-Leu prenne la vague", "le surfeur ne prenne pas la vague"],
  ["la roue de la kermesse s'arrête sur le rouge", "la roue ne s'arrête pas sur le rouge"],
  ["un bonbon pioché soit à la coco", "le bonbon ne soit pas à la coco"],
  ["le pion du jeu de l'oie tombe sur une case piège", "le pion ne tombe pas sur une case piège"],
  ["un samoussa pris au hasard soit au poulet", "le samoussa ne soit pas au poulet"],
  ["il fasse beau dimanche pour le pique-nique", "il ne fasse pas beau dimanche"],
];

/* ═══════════════════════ auto_proba_encadrement ═══════════════════════ */

type Valeur = { t: string; v: number; genre: "decimal" | "negatif" | "pourcent" | "fraction" | "borne" };
const IMPOSSIBLES: (() => Valeur)[] = [
  () => { const v = pick([1.2, 1.05, 1.5, 2, 1.25, 3.4, 1.01, 1.8]); return { t: `$${fr(v)}$`, v, genre: "decimal" }; },
  () => { const v = pick([-0.3, -0.5, -0.05, -1, -0.25, -0.8]); return { t: `$${fr(v)}$`, v, genre: "negatif" }; },
  () => { const v = pick([110, 120, 150, 105, 200, 101]); return { t: `${v} %`, v: v / 100, genre: "pourcent" }; },
  () => { const [n, d] = pick([[7, 5], [5, 4], [9, 8], [4, 3], [11, 10], [3, 2]] as const); return { t: tf(n, d), v: n / d, genre: "fraction" }; },
];
const POSSIBLES: (() => Valeur)[] = [
  () => { const v = pick([0.15, 0.4, 0.85, 0.99, 0.07, 0.5, 0.62, 0.3]); return { t: `$${fr(v)}$`, v, genre: "decimal" }; },
  () => ({ t: "$0$", v: 0, genre: "borne" }),
  () => ({ t: "$1$", v: 1, genre: "borne" }),
  () => { const v = pick([35, 80, 100, 5, 45, 12]); return { t: `${v} %`, v: v / 100, genre: "pourcent" }; },
  () => { const [n, d] = pick([[3, 4], [5, 8], [2, 7], [1, 3], [9, 10], [4, 9]] as const); return { t: tf(n, d), v: n / d, genre: "fraction" }; },
];
function pourquoiImpossible(x: Valeur): string {
  if (x.v < 0) return `${x.t} est négatif : une probabilité n'est jamais négative`;
  if (x.genre === "pourcent") return `${x.t} dépasse $100$ %, c'est-à-dire $1$`;
  if (x.genre === "fraction") return `${x.t} a un numérateur plus grand que le dénominateur : elle dépasse $1$`;
  return `${x.t} dépasse $1$`;
}
const THEMES_EXO = [
  "la tombola de la kermesse", "les lancers de dé", "la roue de la fête foraine", "le jeu de l'oie",
  "le loto de Saint-Gilles", "les tirs au but", "la météo de la semaine", "les cartes Pokémon",
  "les bonbons coco", "le car jaune", "les billes du sac", "le jeu de 32 cartes",
];

const encadrementQcm = (): Q => {
  const imp = pick(IMPOSSIBLES)();
  const poss: Valeur[] = [];
  for (let k = 0; poss.length < 3 && k < 50; k++) {
    const p = pick(POSSIBLES)();
    if (![imp, ...poss].some((x) => x.t === p.t)) poss.push(p);
  }
  const ev = pick(EVENEMENTS)[0];
  const p = pick(PRENOMS);
  const t = ri(0, 3);
  const text = [
    "Parmi ces nombres, lequel NE PEUT PAS être une probabilité ?",
    `Quatre élèves ont calculé la probabilité ${qu(ev)}. Un seul résultat est FORCÉMENT faux : lequel ?`,
    `Dans son exercice sur ${pick(THEMES_EXO)}, ${p.nom} a obtenu ces quatre probabilités. Laquelle est forcément une erreur ?`,
    `Une application annonce la probabilité ${qu(ev)}. Quelle valeur ne peut-elle PAS afficher ?`,
  ][t];
  return {
    text,
    format: "qcm",
    choices: qcm(imp.t, poss.map((x) => x.t)),
    expected: [imp.t],
    comparator: "mcq_exact",
    explanation: exp(
      "Une probabilité est un nombre compris entre $0$ et $1$, bornes incluses (entre $0$ % et $100$ %).",
      "On vérifie l'encadrement de chaque proposition, en écriture décimale si besoin.",
      `${maj(pourquoiImpossible(imp))}. Les autres (${poss.map((x) => x.t).join(" ; ")}) sont entre $0$ et $1$ : ` +
        `$0$ correspond à un évènement impossible, $1$ à un évènement certain.`,
      `${imp.t} ne peut pas être une probabilité.`,
    ),
  };
};

const encadrementOuiNon = (): Q => {
  const ok = Math.random() < 0.5;
  const x = ok ? pick(POSSIBLES)() : pick(IMPOSSIBLES)();
  const ev = pick(EVENEMENTS)[0];
  const p = pick(PRENOMS);
  const t = ri(0, 2);
  const text = [
    `${p.nom} affirme que la probabilité ${qu(ev)} vaut ${x.t}. Est-ce possible ?`,
    `Le nombre ${x.t} peut-il être la probabilité ${qu(ev)} ?`,
    `Une application annonce ${x.t} pour la probabilité ${qu(ev)}. Ce nombre peut-il être une probabilité ?`,
  ][t];
  return {
    text,
    format: "qcm",
    choices: [...OUI_NON],
    expected: [ok ? "oui" : "non"],
    comparator: "mcq_exact",
    explanation: exp(
      "Une probabilité est toujours comprise entre $0$ et $1$ (entre $0$ % et $100$ %).",
      "On regarde si le nombre est dans cet intervalle.",
      ok
        ? `${x.t} est bien entre $0$ et $1$${x.v === 0 ? " : c'est la probabilité d'un évènement impossible" : x.v === 1 ? " : c'est la probabilité d'un évènement certain" : ""}.`
        : `${maj(pourquoiImpossible(x))}.`,
      ok ? "Oui, ce nombre peut être une probabilité." : "Non, ce nombre ne peut pas être une probabilité.",
    ),
  };
};

const SENS = [
  { cle: "imp", phrase: "l'évènement est impossible" },
  { cle: "peu", phrase: "l'évènement est peu probable" },
  { cle: "moitie", phrase: "l'évènement a autant de chances de se produire que de ne pas se produire" },
  { cle: "tres", phrase: "l'évènement est très probable, sans être certain" },
  { cle: "cert", phrase: "l'évènement est certain" },
] as const;
const encadrementSens = (): Q => {
  const s = pick(SENS);
  const val: Record<string, () => string> = {
    imp: () => pick(["$0$", "0 %"]),
    peu: () => pick([`$${fr(pick([0.02, 0.05, 0.08, 0.1]))}$`, `${pick([2, 3, 5])} %`, tf(1, pick([20, 50, 100]))]),
    moitie: () => pick(["$0,5$", "50 %", tf(1, 2)]),
    tres: () => pick([`$${fr(pick([0.9, 0.95, 0.98, 0.92]))}$`, `${pick([95, 97, 99])} %`, tf(...pick([[19, 20], [49, 50], [99, 100], [9, 10]] as [number, number][]))]),
    cert: () => pick(["$1$", "100 %"]),
  };
  const v = val[s.cle]();
  const ev = pick(EVENEMENTS)[0];
  const t = ri(0, 2);
  const text = [
    `La probabilité ${qu(ev)} vaut ${v}. Quelle phrase est juste ?`,
    `Un modèle donne ${v} pour la probabilité ${qu(ev)}. Comment le comprendre ?`,
    `On lit : « probabilité ${qu(ev)} : ${v} ». Que peut-on en dire ?`,
  ][t];
  const leurres = SENS.filter((x) => x.cle !== s.cle).map((x) => maj(x.phrase));
  return {
    text,
    format: "qcm",
    choices: qcm(maj(s.phrase), leurres),
    expected: [maj(s.phrase)],
    comparator: "mcq_exact",
    explanation: exp(
      "Une probabilité mesure la chance qu'un évènement se produise, sur une échelle de $0$ (impossible) à $1$ (certain).",
      "On place la valeur sur cette échelle : $0$, proche de $0$, $\\frac{1}{2}$, proche de $1$, ou $1$.",
      `${v} ${s.cle === "imp" ? "est le bas de l'échelle" : s.cle === "cert" ? "est le haut de l'échelle" : s.cle === "moitie" ? "vaut $\\frac{1}{2}$, le milieu de l'échelle" : s.cle === "peu" ? "est proche de $0$" : "est proche de $1$, sans l'atteindre"}.`,
      `${maj(s.phrase)}.`,
    ),
  };
};

/* ═══════════════════════ auto_proba_somme_issues ═══════════════════════ */

type Experience = { intro: string; issues: string[]; titre: string };
const EXPERIENCES: (() => Experience)[] = [
  () => { const n = pick([4, 5, 6]); return { intro: `On lance un dé truqué à ${n} faces.`, issues: Array.from({ length: n }, (_, i) => `face ${i + 1}`), titre: `Dé truqué à ${n} faces` }; },
  () => ({ intro: "La roue de la kermesse est partagée en secteurs de couleurs, de tailles différentes.", issues: melange(["rouge", "bleu", "vert", "jaune", "violet"]).slice(0, ri(3, 5)), titre: "Roue de la kermesse" }),
  () => ({ intro: "Le bulletin météo donne le temps de demain à Cilaos.", issues: ["soleil", "nuages", "pluie"], titre: "Météo de demain à Cilaos" }),
  () => ({ intro: "On s'intéresse au prochain match de l'équipe de foot de Saint-Pierre.", issues: ["victoire", "match nul", "défaite"], titre: "Prochain match" }),
  () => ({ intro: "On choisit au hasard un élève du lycée et on note comment il vient le matin.", issues: ["car jaune", "voiture", "à pied", "vélo"], titre: "Trajet du matin" }),
  () => ({ intro: "On pioche un bonbon au hasard dans un sachet de bonbons de plusieurs parfums.", issues: melange(["coco", "menthe", "fraise", "citron", "goyavier"]).slice(0, ri(3, 5)), titre: "Parfum du bonbon" }),
  () => ({ intro: "On tire une carte Pokémon au hasard dans une pioche.", issues: ["feu", "eau", "plante", "électrique"].slice(0, ri(3, 4)), titre: "Type de la carte" }),
  () => ({ intro: "Au snack, on note le parfum de la glace choisie par un client pris au hasard.", issues: melange(["vanille", "coco", "letchi", "mangue", "chocolat"]).slice(0, ri(3, 5)), titre: "Parfum de la glace" }),
  () => ({ intro: "Au marché de Saint-Paul, on note comment paie un client pris au hasard.", issues: ["espèces", "carte", "chèque"], titre: "Moyen de paiement" }),
  () => ({ intro: "On fait tourner une toupie à cinq faces marquées A, B, C, D et E.", issues: ["A", "B", "C", "D", "E"], titre: "Toupie à cinq faces" }),
  () => ({ intro: "On choisit au hasard un coureur inscrit à la Diagonale des Fous.", issues: ["arrive en moins de 40 h", "arrive en 40 h ou plus", "abandonne"], titre: "Résultat du coureur" }),
  () => ({ intro: "À la tombola de la kermesse, on gratte un ticket.", issues: ["gros lot", "petit lot", "perdant"], titre: "Ticket de tombola" }),
  () => ({ intro: "Au jeu de l'oie, on regarde la case sur laquelle tombe le pion au prochain tour.", issues: ["case normale", "case oie", "case piège", "case pont"].slice(0, ri(3, 4)), titre: "Case d'arrivée" }),
  () => ({ intro: "On choisit au hasard un samoussa dans le sachet du pique-nique.", issues: ["thon", "poulet", "fromage", "légumes"].slice(0, ri(3, 4)), titre: "Garniture du samoussa" }),
  () => ({ intro: "On tire une bille au hasard dans un sac de billes de couleurs.", issues: melange(["rouge", "bleue", "verte", "noire", "blanche"]).slice(0, ri(3, 5)), titre: "Couleur de la bille" }),
];
const canvasLoi = (e: Experience, valeurs: (string | number)[]): CanvasFigure => ({
  kind: "tableau_donnees",
  title: e.titre,
  headers: ["Issue", ...e.issues.map(maj)],
  rows: [{ label: "Probabilité", values: valeurs }],
});
const somme = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

const sommeManquante = (): Q => {
  const e = pick(EXPERIENCES)();
  const p = partage(e.issues.length);
  const h = ri(0, e.issues.length - 1);
  const connues = p.filter((_, i) => i !== h);
  const s = somme(connues);
  const nom = e.issues[h];
  const t = ri(0, 2);
  const text = `${e.intro} Le tableau donne la probabilité de chaque issue, sauf une. ` + [
    `Quelle est la probabilité de l'issue « ${nom} » ?`,
    `Complète la case manquante : que vaut $P(\\text{« ${nom} »})$ ?`,
    `Quelle probabilité faut-il écrire sous « ${maj(nom)} » ?`,
  ][t];
  return {
    text,
    format: "short",
    expected: ecritures(p[h], 100),
    comparator: "fraction_decimal_equivalent",
    canvas: canvasLoi(e, p.map((x, i) => (i === h ? "?" : fr(x / 100)))),
    explanation: exp(
      "La somme des probabilités de toutes les issues d'une expérience aléatoire vaut $1$.",
      "On additionne les probabilités connues, puis on retire ce total à $1$.",
      `$${connues.map((x) => fr(x / 100)).join(" + ")} = ${fr(s / 100)}$, donc $1 - ${fr(s / 100)} = ${fr(p[h] / 100)}$.`,
      `La probabilité de l'issue « ${nom} » vaut $${fr(p[h] / 100)}$.`,
    ),
  };
};

const sommeValide = (): Q => {
  const e = pick(EXPERIENCES)();
  const p = partage(e.issues.length);
  const ok = Math.random() < 0.45;
  if (!ok) {
    const i = ri(0, p.length - 1);
    p[i] = p[i] + pick([-5, 5, 10, -10, 15].filter((d) => p[i] + d > 0));
  }
  const s = somme(p);
  const q = pick(PRENOMS);
  const t = ri(0, 2);
  const text = `${e.intro} ` + [
    `${q.nom} propose le tableau de probabilités ci-contre. Ce tableau est-il possible ?`,
    `Ce tableau peut-il donner les probabilités de toutes les issues ?`,
    `${q.nom} affirme que ce tableau décrit bien l'expérience. A-t-${ilElle(q)} raison ?`,
  ][t];
  return {
    text,
    format: "qcm",
    choices: [...OUI_NON],
    expected: [ok ? "oui" : "non"],
    comparator: "mcq_exact",
    canvas: canvasLoi(e, p.map((x) => fr(x / 100))),
    explanation: exp(
      "Les probabilités de toutes les issues sont entre $0$ et $1$ et leur somme vaut exactement $1$.",
      "On additionne toutes les probabilités du tableau.",
      `$${p.map((x) => fr(x / 100)).join(" + ")} = ${fr(s / 100)}$.`,
      ok ? "La somme vaut $1$ : le tableau est possible." : `La somme vaut $${fr(s / 100)}$, pas $1$ : le tableau est impossible.`,
    ),
  };
};

const sommeDeuxInconnues = (): Q => {
  let e = pick(EXPERIENCES)();
  while (e.issues.length < 3) e = pick(EXPERIENCES)();
  const mult = pick([1, 2, 3]);
  const n = e.issues.length;
  let x = 0;
  let autres: number[] = [];
  for (let k = 0; k < 100; k++) {
    x = pick([5, 10, 15, 20, 25]);
    const reste = 100 - (mult + 1) * x;
    if (reste >= 5 * (n - 2)) {
      autres = n - 2 === 1 ? [reste] : partage(n - 2, reste);
      break;
    }
  }
  const [iu, iv] = melange(e.issues.map((_, i) => i)).slice(0, 2);
  const p: number[] = [];
  let k = 0;
  for (let i = 0; i < n; i++) p.push(i === iu ? x : i === iv ? mult * x : autres[k++]);
  const U = e.issues[iu];
  const V = e.issues[iv];
  const lien = mult === 1 ? `les issues « ${U} » et « ${V} » ont la même probabilité` : `l'issue « ${V} » est ${mult === 2 ? "deux" : "trois"} fois plus probable que l'issue « ${U} »`;
  const cible = mult === 1 || Math.random() < 0.5 ? "U" : "V";
  const rep = cible === "U" ? x : mult * x;
  const s = 100 - (mult + 1) * x;
  const t = ri(0, 2);
  const text = `${e.intro} On sait que ${lien}. ` + [
    `Quelle est la probabilité de l'issue « ${cible === "U" ? U : V} » ?`,
    `Complète le tableau : que vaut la probabilité de « ${cible === "U" ? U : V} » ?`,
    `Calcule $P(\\text{« ${cible === "U" ? U : V} »})$.`,
  ][t];
  return {
    text,
    format: "short",
    expected: ecritures(rep, 100),
    comparator: "fraction_decimal_equivalent",
    canvas: canvasLoi(e, p.map((v, i) => (i === iu || i === iv ? "?" : fr(v / 100)))),
    explanation: exp(
      "La somme des probabilités de toutes les issues vaut $1$.",
      `On appelle $p$ la probabilité de « ${U} »${mult === 1 ? " : celle de « " + V + " » vaut aussi $p$" : ` : celle de « ${V} » vaut $${mult}p$`}.`,
      `Les issues connues totalisent $${fr(s / 100)}$, donc $${mult + 1}p = 1 - ${fr(s / 100)} = ${fr(((mult + 1) * x) / 100)}$ et $p = ${fr(x / 100)}$` +
        (cible === "V" ? `, puis $${mult}p = ${fr(rep / 100)}$.` : "."),
      `La probabilité de « ${cible === "U" ? U : V} » vaut $${fr(rep / 100)}$.`,
    ),
  };
};

/* ═══════════════════════ auto_proba_contraire ═══════════════════════ */

/** Une probabilité tirée, sous l'une de ses trois écritures. */
function probaEcrite(): { a: number; b: number; t: string } {
  const g = ri(0, 2);
  if (g === 0) {
    const c = pick([5, 12, 15, 20, 25, 30, 35, 40, 45, 55, 60, 65, 72, 75, 80, 85, 88, 90, 95, 3, 8]);
    return { a: c, b: 100, t: dc(c) };
  }
  if (g === 1) {
    const c = pick([5, 10, 15, 20, 25, 30, 35, 40, 60, 70, 75, 80, 85, 90, 95, 2, 98]);
    return { a: c, b: 100, t: `${c} %` };
  }
  const b = pick([4, 5, 6, 8, 10, 12, 20]);
  const a = ri(1, b - 1);
  return { a, b, t: tf(a, b) };
}

const contraireCalcul = (): Q => {
  const [ev, contr] = pick(EVENEMENTS);
  const pr = probaEcrite();
  const q = pick(PRENOMS);
  const t = ri(0, 2);
  const text = [
    `La probabilité ${qu(ev)} vaut ${pr.t}. Quelle est la probabilité ${qu(contr)} ?`,
    `${q.nom} estime à ${pr.t} la probabilité ${qu(ev)}. Quelle est alors la probabilité ${qu(contr)} ?`,
    `La probabilité ${qu(ev)} est ${pr.t}. Combien vaut la probabilité de l'évènement contraire, c'est-à-dire ${qu(contr)} ?`,
  ][t];
  const r = pr.b - pr.a;
  const enPc = pr.t.endsWith("%");
  return {
    text,
    format: "short",
    expected: ecritures(r, pr.b),
    comparator: "fraction_decimal_equivalent",
    explanation: exp(
      "L'évènement contraire de $A$, noté $\\overline{A}$, se réalise exactement quand $A$ ne se réalise pas : $P(\\overline{A}) = 1 - P(A)$.",
      "On retire la probabilité donnée à $1$ (ou à $100$ %).",
      enPc
        ? `$100 - ${pr.a} = ${r}$, donc ${r} %, soit $${fr(r / 100)}$.`
        : pr.b === 100
          ? `$1 - ${fr(pr.a / 100)} = ${fr(r / 100)}$.`
          : `$1 - \\dfrac{${pr.a}}{${pr.b}} = \\dfrac{${pr.b}}{${pr.b}} - \\dfrac{${pr.a}}{${pr.b}} = \\dfrac{${r}}{${pr.b}}$.`,
      `La probabilité ${qu(contr)} vaut ${enPc ? `${r} %` : pr.b === 100 ? dc(r) : tf(r, pr.b)}.`,
    ),
  };
};

const AU_MOINS: readonly (readonly [string, string])[] = [
  ["aucun des trois tirs au but ne soit réussi", "au moins un des trois tirs soit réussi"],
  ["aucun des tickets de tombola achetés ne soit gagnant", "au moins un ticket soit gagnant"],
  ["il ne pleuve aucun jour de la semaine à Cilaos", "il pleuve au moins un jour de la semaine"],
  ["aucun des quatre lancers de dé ne donne 6", "au moins un des quatre lancers donne 6"],
  ["aucun des cars jaunes du matin ne soit en retard", "au moins un car jaune soit en retard"],
  ["aucune pièce du lot ne soit défectueuse", "au moins une pièce du lot soit défectueuse"],
  ["aucun des cinq élèves interrogés ne soit gaucher", "au moins un des cinq élèves soit gaucher"],
  ["on n'obtienne aucun pile en trois lancers de pièce", "on obtienne au moins un pile"],
  ["aucune des graines semées ne germe", "au moins une graine germe"],
  ["aucun des deux vols de la journée ne parte en retard", "au moins un des deux vols parte en retard"],
  ["aucun des letchis de la barquette ne soit abîmé", "au moins un letchi soit abîmé"],
  ["aucune vague surfée par Léa ne la mène jusqu'au bord", "au moins une vague la mène jusqu'au bord"],
];
const contraireAuMoins = (): Q => {
  const [aucun, auMoins] = pick(AU_MOINS);
  const sens = Math.random() < 0.6;
  const mil = Math.random() < 0.4;
  const c = mil ? pick([343, 125, 216, 512, 729, 64, 27, 810, 902]) : pick([12, 15, 25, 32, 36, 45, 64, 81, 9, 16, 49]);
  const base = mil ? 1000 : 100;
  const aff = mil ? dm : dc;
  const [donne, cherche] = sens ? [aucun, auMoins] : [auMoins, aucun];
  const t = ri(0, 2);
  const text = [
    `La probabilité ${qu(donne)} vaut ${aff(c)}. Quelle est la probabilité ${qu(cherche)} ?`,
    `On a calculé la probabilité ${qu(donne)} : on trouve ${aff(c)}. En déduire la probabilité ${qu(cherche)}.`,
    `Sachant que la probabilité ${qu(donne)} est ${aff(c)}, que vaut la probabilité ${qu(cherche)} ?`,
  ][t];
  return {
    text,
    format: "short",
    expected: ecritures(base - c, base),
    comparator: "fraction_decimal_equivalent",
    explanation: exp(
      "Le contraire de « aucun » est « au moins un » : l'un se réalise exactement quand l'autre ne se réalise pas.",
      "On utilise $P(\\overline{A}) = 1 - P(A)$.",
      `$1 - ${fr(c / base)} = ${fr((base - c) / base)}$.`,
      `La probabilité ${qu(cherche)} vaut ${aff(base - c)}.`,
    ),
  };
};

type PaireContraire = { ev: string; bon: string; leurres: string[]; pourquoi: string };
const NUMEROTES = [
  (n: number) => `On lance un dé équilibré à ${n} faces numérotées de 1 à ${n}.`,
  (n: number) => `On fait tourner une roue partagée en ${n} secteurs égaux, numérotés de 1 à ${n}.`,
  (n: number) => `On tire une boule dans une urne contenant ${n} boules numérotées de 1 à ${n}.`,
  (n: number) => `Au loto de la kermesse, on tire un jeton parmi ${n}, numérotés de 1 à ${n}.`,
  (n: number) => `On tire au sort un dossard parmi ${n}, numérotés de 1 à ${n}.`,
];
const PAIRES_NUM: ((n: number) => PaireContraire)[] = [
  (n) => { const k = ri(3, n - 2); return { ev: `obtenir un nombre supérieur ou égal à ${k}`, bon: `obtenir un nombre strictement inférieur à ${k}`, leurres: [`obtenir un nombre inférieur ou égal à ${k}`, `obtenir un nombre strictement supérieur à ${k}`, `obtenir un nombre strictement inférieur à ${k - 1}`], pourquoi: `le nombre ${k} est dans $A$ : il ne doit pas être dans le contraire` }; },
  (n) => { const k = ri(3, n - 2); return { ev: `obtenir au moins ${k}`, bon: `obtenir au plus ${k - 1}`, leurres: [`obtenir au plus ${k}`, `obtenir moins de ${k - 1}`, `obtenir plus de ${k}`], pourquoi: `« au moins ${k} » contient ${k} ; son contraire s'arrête à ${k - 1}` }; },
  (n) => { const k = ri(2, n - 2); return { ev: `obtenir un nombre strictement supérieur à ${k}`, bon: `obtenir un nombre inférieur ou égal à ${k}`, leurres: [`obtenir un nombre strictement inférieur à ${k}`, `obtenir un nombre supérieur ou égal à ${k}`, `obtenir un nombre inférieur ou égal à ${k - 1}`], pourquoi: `${k} n'est pas dans $A$ : il est donc dans le contraire` }; },
  () => ({ ev: "obtenir un nombre pair", bon: "obtenir un nombre impair", leurres: ["obtenir un multiple de 2", "obtenir un nombre premier", "obtenir un nombre pair ou impair"], pourquoi: "un nombre qui n'est pas pair est impair" }),
  () => { const m = pick([3, 4, 5]); return { ev: `obtenir un multiple de ${m}`, bon: `obtenir un nombre qui n'est pas un multiple de ${m}`, leurres: [`obtenir un diviseur de ${m}`, "obtenir un nombre impair", `obtenir un multiple de ${m + 1}`], pourquoi: `le contraire garde toutes les issues qui ne sont pas des multiples de ${m}` }; },
];
const PAIRES_MOTS: PaireContraire[] = [
  { ev: "obtenir au moins un pile en deux lancers de pièce", bon: "obtenir deux fois face", leurres: ["obtenir un seul pile", "obtenir deux fois pile", "obtenir au plus un pile"], pourquoi: "le contraire de « au moins un pile » est « aucun pile », donc face aux deux lancers" },
  { ev: "réussir au moins un des trois tirs au but", bon: "rater les trois tirs au but", leurres: ["rater au moins un tir au but", "réussir les trois tirs au but", "rater un seul tir au but"], pourquoi: "le contraire de « au moins un réussi » est « aucun réussi »" },
  { ev: "les deux cars jaunes du matin sont à l'heure", bon: "au moins un des deux cars est en retard", leurres: ["les deux cars sont en retard", "un seul car est en retard", "aucun car n'est en retard"], pourquoi: "il suffit qu'UN car soit en retard pour que « les deux à l'heure » soit faux" },
  { ev: "il pleut tous les jours de la semaine à Cilaos", bon: "il y a au moins un jour sans pluie dans la semaine", leurres: ["il ne pleut aucun jour de la semaine", "il pleut au moins un jour de la semaine", "il pleut un seul jour de la semaine"], pourquoi: "« tous les jours » est faux dès qu'UN jour fait exception" },
  { ev: "tirer au moins une bille rouge en deux tirages", bon: "ne tirer aucune bille rouge en deux tirages", leurres: ["tirer deux billes rouges", "tirer une seule bille rouge", "tirer au plus une bille rouge"], pourquoi: "le contraire de « au moins une » est « aucune »" },
  { ev: "gagner au moins un lot avec ses trois tickets de tombola", bon: "n'avoir aucun ticket gagnant", leurres: ["avoir trois tickets gagnants", "avoir un seul ticket gagnant", "avoir au moins un ticket perdant"], pourquoi: "le contraire de « au moins un » est « aucun »" },
];
const contraireQcm = (): Q => {
  let intro: string;
  let pc: PaireContraire;
  if (Math.random() < 0.65) {
    const n = pick([6, 8, 10, 12, 20]);
    intro = pick(NUMEROTES)(n);
    pc = pick(PAIRES_NUM)(n);
  } else {
    intro = "On réalise une expérience aléatoire.";
    pc = pick(PAIRES_MOTS);
  }
  const t = ri(0, 2);
  const text = `${intro} ` + [
    `On considère l'évènement $A$ : « ${pc.ev} ». Quel est l'évènement contraire $\\overline{A}$ ?`,
    `Quel évènement est le contraire de « ${pc.ev} » ?`,
    `On s'intéresse à l'évènement « ${pc.ev} ». Lequel se réalise exactement quand celui-ci ne se réalise PAS ?`,
  ][t];
  return {
    text,
    format: "qcm",
    choices: qcm(maj(pc.bon), pc.leurres.map(maj)),
    expected: [maj(pc.bon)],
    comparator: "mcq_exact",
    explanation: exp(
      "L'évènement contraire de $A$ est formé de TOUTES les issues qui ne réalisent pas $A$, et d'elles seules.",
      "On cherche l'évènement qui se produit exactement quand $A$ ne se produit pas.",
      `${maj(pc.pourquoi)}.`,
      `Le contraire de « ${pc.ev} » est « ${pc.bon} ».`,
    ),
  };
};

/* ═══════════════════════ auto_proba_equiprobabilite ═══════════════════════ */

/** cats : [ce qu'on lit dans l'énoncé (« 5 rouges »), l'objet au singulier (« une bille rouge »)]. */
type Urne = { intro: (n: number) => string; objet: string; cats: [string, string][]; tirer: string; juste: string };
const URNES: Urne[] = [
  { intro: (n) => `Un sac contient ${n} billes indiscernables au toucher.`, objet: "billes", cats: [["rouges", "une bille rouge"], ["bleues", "une bille bleue"], ["vertes", "une bille verte"], ["noires", "une bille noire"]], tirer: "On tire une bille au hasard", juste: "les billes sont indiscernables au toucher" },
  { intro: (n) => `Une boîte contient ${n} bonbons coco, tous emballés pareil.`, objet: "bonbons", cats: [["à la vanille", "un bonbon à la vanille"], ["au chocolat", "un bonbon au chocolat"], ["nature", "un bonbon nature"], ["au letchi", "un bonbon au letchi"]], tirer: "On prend un bonbon les yeux fermés", juste: "les emballages sont identiques" },
  { intro: (n) => `Un sachet de pique-nique contient ${n} samoussas.`, objet: "samoussas", cats: [["au thon", "un samoussa au thon"], ["au poulet", "un samoussa au poulet"], ["au fromage", "un samoussa au fromage"], ["aux légumes", "un samoussa aux légumes"]], tirer: "On prend un samoussa au hasard", juste: "on prend au hasard, sans regarder" },
  { intro: (n) => `À la tombola de la kermesse, ${n} tickets sont mis en vente.`, objet: "tickets", cats: [["qui donnent un gros lot", "un ticket qui donne un gros lot"], ["qui donnent un petit lot", "un ticket qui donne un petit lot"], ["perdants", "un ticket perdant"]], tirer: "On achète un ticket au hasard", juste: "chaque ticket a la même chance d'être acheté" },
  { intro: (n) => `Une classe de première compte ${n} élèves.`, objet: "élèves", cats: [["internes", "un élève interne"], ["demi-pensionnaires", "un élève demi-pensionnaire"], ["externes", "un élève externe"]], tirer: "On tire au sort le délégué", juste: "le tirage au sort donne la même chance à chacun" },
  { intro: (n) => `La playlist du bus scolaire contient ${n} morceaux.`, objet: "morceaux", cats: [["de maloya", "un morceau de maloya"], ["de séga", "un morceau de séga"], ["de rap", "un morceau de rap"], ["de reggae", "un morceau de reggae"]], tirer: "La lecture aléatoire choisit un morceau", juste: "la lecture aléatoire ne favorise aucun morceau" },
  { intro: (n) => `Une glacière contient ${n} bouteilles de même forme.`, objet: "bouteilles", cats: [["de jus de goyavier", "une bouteille de jus de goyavier"], ["d'eau", "une bouteille d'eau"], ["de jus d'ananas", "une bouteille de jus d'ananas"], ["de limonade", "une bouteille de limonade"]], tirer: "On prend une bouteille sans regarder", juste: "les bouteilles ont la même forme" },
  { intro: (n) => `Une pioche contient ${n} cartes Pokémon retournées.`, objet: "cartes", cats: [["de type feu", "une carte de type feu"], ["de type eau", "une carte de type eau"], ["de type plante", "une carte de type plante"], ["de type électrique", "une carte de type électrique"]], tirer: "On pioche une carte au hasard", juste: "les cartes sont retournées et mélangées" },
  { intro: (n) => `Un sac contient ${n} jetons de jeu, tous de même forme.`, objet: "jetons", cats: [["jaunes", "un jeton jaune"], ["rouges", "un jeton rouge"], ["verts", "un jeton vert"], ["bleus", "un jeton bleu"]], tirer: "On pioche un jeton au hasard", juste: "les jetons ont la même forme" },
  { intro: (n) => `Un sachet contient ${n} graines du jardin créole, toutes semblables.`, objet: "graines", cats: [["de piment", "une graine de piment"], ["de tomate", "une graine de tomate"], ["de brède", "une graine de brède"], ["de citrouille", "une graine de citrouille"]], tirer: "On sème une graine prise au hasard", juste: "les graines se ressemblent : on ne peut pas choisir" },
];
const CARTES = [
  { jeu: 32, cat: "un cœur", k: 8 }, { jeu: 32, cat: "un as", k: 4 }, { jeu: 32, cat: "une figure (valet, dame ou roi)", k: 12 },
  { jeu: 32, cat: "une carte rouge", k: 16 }, { jeu: 32, cat: "le roi de pique", k: 1 }, { jeu: 32, cat: "un pique ou un trèfle", k: 16 },
  { jeu: 52, cat: "un cœur", k: 13 }, { jeu: 52, cat: "un as", k: 4 }, { jeu: 52, cat: "une figure (valet, dame ou roi)", k: 12 },
  { jeu: 52, cat: "une carte rouge", k: 26 }, { jeu: 52, cat: "la dame de cœur", k: 1 }, { jeu: 52, cat: "un roi ou un as", k: 8 },
];
const MOTS = ["CILAOS", "SALAZIE", "MAFATE", "LETCHI", "SAMOUSSA", "MALOYA", "TAMARIN", "VANILLE", "BOURBON", "CARI", "ROUGAIL", "PITON", "GOYAVIER", "LAGON"];

const equiUrne = (): Q => {
  const g = ri(0, 5);
  const q = pick(PRENOMS);
  if (g === 4) {
    const c = pick(CARTES);
    const t = ri(0, 2);
    const text = `On tire une carte au hasard dans un jeu bien mélangé de ${c.jeu} cartes. ` + [
      `Quelle est la probabilité de tirer ${c.cat} ?`,
      `${q.nom} tire une carte. Quelle est la probabilité que ce soit ${c.cat} ?`,
      `Calcule la probabilité de l'évènement « tirer ${c.cat} ».`,
    ][t];
    return {
      text,
      format: "short",
      expected: ecritures(c.k, c.jeu),
      comparator: "fraction_decimal_equivalent",
      explanation: exp(
        "En situation d'équiprobabilité, $P(A) = \\dfrac{\\text{nombre de cas favorables}}{\\text{nombre de cas possibles}}$.",
        "Le jeu est bien mélangé : chaque carte a la même chance d'être tirée. On compte les cartes favorables.",
        `Il y a $${c.k}$ carte${c.k > 1 ? "s" : ""} favorable${c.k > 1 ? "s" : ""} sur $${c.jeu}$ : ${egalites(c.k, c.jeu)}.`,
        `La probabilité vaut ${tf(...red(c.k, c.jeu))}.`,
      ),
    };
  }
  if (g === 5) {
    const mot = pick(MOTS);
    const voy = [...mot].filter((l) => "AEIOUY".includes(l)).length;
    const cherche = Math.random() < 0.6 ? "voyelle" : "consonne";
    const k = cherche === "voyelle" ? voy : mot.length - voy;
    const t = ri(0, 1);
    const text = `On écrit chaque lettre du mot ${mot} sur un carton, puis on tire un carton au hasard. ` + [
      `Quelle est la probabilité de tirer une ${cherche} ?`,
      `${q.nom} tire un carton. Quelle est la probabilité qu'${ilElle(q) === "il" ? "il" : "elle"} tombe sur une ${cherche} ?`,
    ][t];
    return {
      text,
      format: "short",
      expected: ecritures(k, mot.length),
      comparator: "fraction_decimal_equivalent",
      explanation: exp(
        "En situation d'équiprobabilité, $P(A) = \\dfrac{\\text{nombre de cas favorables}}{\\text{nombre de cas possibles}}$.",
        "Les cartons sont identiques : chacun a la même chance. On compte les lettres, en comptant chaque répétition.",
        `${mot} a $${mot.length}$ lettres, dont $${k}$ ${cherche}s (Y compte comme voyelle) : ${egalites(k, mot.length)}.`,
        `La probabilité vaut ${tf(...red(k, mot.length))}.`,
      ),
    };
  }
  const u = pick(URNES);
  const nc = ri(2, Math.min(4, u.cats.length));
  const cats = melange(u.cats).slice(0, nc);
  const eff = cats.map(() => ri(2, 12));
  const n = somme(eff);
  const i = ri(0, nc - 1);
  const t = ri(0, 2);
  const detail = cats.map((c, j) => `${eff[j]} ${c[0]}`).join(", ").replace(/, ([^,]*)$/, " et $1");
  const text = `${u.intro(n)} Il y a ${detail}. ` + [
    `${u.tirer}. Quelle est la probabilité d'obtenir ${cats[i][1]} ?`,
    `${u.tirer}. Calcule la probabilité de l'évènement « obtenir ${cats[i][1]} ».`,
    `${u.tirer}. Quelle est la probabilité de tomber sur ${cats[i][1]} ? (Réponds par une fraction.)`,
  ][t];
  return {
    text,
    format: "short",
    expected: ecritures(eff[i], n),
    comparator: "fraction_decimal_equivalent",
    explanation: exp(
      "En situation d'équiprobabilité, $P(A) = \\dfrac{\\text{nombre de cas favorables}}{\\text{nombre de cas possibles}}$.",
      `On peut supposer l'équiprobabilité car ${u.juste}. On compte les cas favorables et les cas possibles.`,
      `${eff[i]} cas favorables (${cats[i][0]}) sur ${n} ${u.objet} en tout : ${egalites(eff[i], n)}.`,
      `La probabilité vaut ${tf(...red(eff[i], n))}.`,
    ),
  };
};

type EvNum = { lib: string; ok: (x: number) => boolean };
const EVS_NUM: ((n: number) => EvNum)[] = [
  () => ({ lib: "un nombre pair", ok: (x) => x % 2 === 0 }),
  () => ({ lib: "un nombre impair", ok: (x) => x % 2 === 1 }),
  (n) => { const m = pick([3, 4, 5].filter((v) => v < n)); return { lib: `un multiple de ${m}`, ok: (x) => x % m === 0 }; },
  (n) => { const k = ri(2, n - 1); return { lib: `un nombre supérieur ou égal à ${k}`, ok: (x) => x >= k }; },
  (n) => { const k = ri(2, n - 1); return { lib: `un nombre strictement inférieur à ${k}`, ok: (x) => x < k }; },
  (n) => { const k = ri(2, n - 2); return { lib: `un nombre strictement supérieur à ${k}`, ok: (x) => x > k }; },
  () => ({ lib: "un nombre premier", ok: (x) => x >= 2 && [2, 3, 5, 7, 11, 13, 17, 19].includes(x) }),
  (n) => ({ lib: `un diviseur de ${n}`, ok: (x) => n % x === 0 }),
];
const equiDe = (): Q => {
  const n = pick([4, 6, 8, 10, 12, 20]);
  const intro = pick(NUMEROTES)(n);
  const ev = pick(EVS_NUM)(n);
  const fav = Array.from({ length: n }, (_, i) => i + 1).filter(ev.ok);
  const t = ri(0, 2);
  const text = `${intro} ` + [
    `Quelle est la probabilité d'obtenir ${ev.lib} ?`,
    `Calcule la probabilité de l'évènement « obtenir ${ev.lib} ».`,
    `Combien de chances sur ${n} a-t-on d'obtenir ${ev.lib} ? Donne la probabilité.`,
  ][t];
  return {
    text,
    format: "short",
    expected: ecritures(fav.length, n),
    comparator: "fraction_decimal_equivalent",
    explanation: exp(
      "En situation d'équiprobabilité, $P(A) = \\dfrac{\\text{nombre de cas favorables}}{\\text{nombre de cas possibles}}$.",
      `Les ${n} issues ont la même chance. On écrit les issues favorables.`,
      `Issues favorables : ${fav.join(" ; ")}, soit ${fav.length} sur ${n} : ${egalites(fav.length, n)}.`,
      `La probabilité vaut ${tf(...red(fav.length, n))}.`,
    ),
  };
};

const INVERSES = [
  { tout: "billes", part: "billes rouges", lieu: "Un sac contient", tirer: "tirer une bille rouge" },
  { tout: "bonbons", part: "bonbons à la coco", lieu: "Une boîte contient", tirer: "prendre un bonbon à la coco" },
  { tout: "tickets", part: "tickets gagnants", lieu: "La tombola de la kermesse compte", tirer: "acheter un ticket gagnant" },
  { tout: "letchis", part: "letchis abîmés", lieu: "Une barquette contient", tirer: "prendre un letchi abîmé" },
  { tout: "samoussas", part: "samoussas au poulet", lieu: "Un sachet contient", tirer: "prendre un samoussa au poulet" },
  { tout: "cartes", part: "cartes de type feu", lieu: "Une pioche contient", tirer: "piocher une carte de type feu" },
  { tout: "élèves", part: "élèves internes", lieu: "Un lycée compte", tirer: "tirer au sort un élève interne" },
  { tout: "morceaux", part: "morceaux de maloya", lieu: "Une playlist contient", tirer: "tomber sur un morceau de maloya" },
  { tout: "jetons", part: "jetons gagnants", lieu: "Le sac du loto contient", tirer: "piocher un jeton gagnant" },
];
const equiInverse = (): Q => {
  const c = pick(INVERSES);
  const [a, b] = pick([[1, 4], [1, 5], [2, 5], [3, 4], [1, 10], [3, 10], [1, 3], [2, 3], [1, 8], [3, 8], [1, 2], [1, 6], [5, 6], [3, 5]] as const);
  const N = b * ri(2, 12);
  const k = (N * a) / b;
  const dec = decimale(a, b);
  const pc = pourcent(a, b);
  const affs = [tf(a, b)];
  if (dec !== null) affs.push(`$${dec}$`);
  if (pc !== null) affs.push(pc);
  const aff = pick(affs);
  const sens = Math.random() < 0.6;
  const t = ri(0, 1);
  const text = sens
    ? `${c.lieu} ${N} ${c.tout}. La probabilité de ${c.tirer} au hasard vaut ${aff}. ` +
      [`Combien y a-t-il ${deN(c.part)} ?`, `Combien ${deN(c.part)} faut-il pour que ce soit vrai ?`][t]
    : `${c.lieu} ${k} ${c.part}. La probabilité de ${c.tirer} au hasard vaut ${aff}. ` +
      [`Combien y a-t-il ${deN(c.tout)} en tout ?`, `Quel est le nombre total ${deN(c.tout)} ?`][t];
  return {
    text,
    format: "short",
    expected: [String(sens ? k : N)],
    comparator: "number_equal",
    explanation: exp(
      "En situation d'équiprobabilité, $P = \\dfrac{\\text{favorables}}{\\text{total}}$, donc favorables $=$ $P \\times$ total.",
      sens ? "On multiplie le total par la probabilité." : "On cherche le total qui donne cette fraction : total $=$ favorables $\\div P$.",
      sens
        ? `${tf(a, b)} de ${N}, c'est $${N} \\div ${b} \\times ${a} = ${k}$.`
        : `${k} représente ${tf(a, b)} du total : $${k} \\div ${a} \\times ${b} = ${N}$. Vérification : ${tf(k, N)} $=$ ${tf(a, b)}.`,
      sens ? `Il y a ${k} ${c.part}.` : `Il y a ${N} ${c.tout} en tout.`,
    ),
  };
};

/* ═══════════════════════ LES TABLEAUX CROISÉS (auto_proba_lecture) ═══════════════════════ */

/** [entête du tableau, verbe au singulier, verbe au pluriel]. */
type Attr = readonly [string, string, string];
type Sit = {
  intro: string;
  ind: string;
  inds: string;
  un: string;
  ch: string;
  il: string;
  ceux: string;
  A: Attr;
  nA: Attr;
  B: Attr;
  nB: Attr;
};
const m = (intro: string, ind: string, inds: string, A: Attr, nA: Attr, B: Attr, nB: Attr, fem = false): Sit => ({
  intro,
  ind,
  inds,
  un: fem ? "une" : "un",
  ch: /^[aeiouéèh]/i.test(ind) ? `l'${ind} choisi${fem ? "e" : ""}` : `${fem ? "la" : "le"} ${ind} choisi${fem ? "e" : ""}`,
  il: fem ? "elle" : "il",
  ceux: fem ? "celles" : "ceux",
  A,
  nA,
  B,
  nB,
});
const SITS: Sit[] = [
  m("Dans un lycée, on recense les élèves de la section sportive.", "élève", "élèves", ["Judo", "fait du judo", "font du judo"], ["Natation", "fait de la natation", "font de la natation"], ["Seconde", "est en seconde", "sont en seconde"], ["Terminale", "est en terminale", "sont en terminale"]),
  m("Une compagnie aérienne interroge ses clients après leur voyage.", "client", "clients", ["Internet", "a acheté son billet sur internet", "ont acheté leur billet sur internet"], ["Agence", "a acheté son billet en agence", "ont acheté leur billet en agence"], ["Satisfait", "est satisfait", "sont satisfaits"], ["Non satisfait", "n'est pas satisfait", "ne sont pas satisfaits"]),
  m("Un lycée soumet un projet au vote de ses élèves.", "élève", "élèves", ["Première", "est en première", "sont en première"], ["Terminale", "est en terminale", "sont en terminale"], ["Favorable", "est favorable au projet", "sont favorables au projet"], ["Défavorable", "est défavorable au projet", "sont défavorables au projet"]),
  m("On interroge les usagers d'une ligne de car jaune.", "usager", "usagers", ["Abonné", "a un abonnement", "ont un abonnement"], ["Ticket", "achète un ticket", "achètent un ticket"], ["Retard subi", "a subi un retard ce mois-ci", "ont subi un retard ce mois-ci"], ["Aucun retard", "n'a subi aucun retard ce mois-ci", "n'ont subi aucun retard ce mois-ci"]),
  m("On interroge les randonneurs partis vers le Piton de la Fournaise.", "randonneur", "randonneurs", ["Réunionnais", "habite à La Réunion", "habitent à La Réunion"], ["Touriste", "est en vacances sur l'île", "sont en vacances sur l'île"], ["Cratère atteint", "a atteint le cratère", "ont atteint le cratère"], ["Demi-tour", "a fait demi-tour", "ont fait demi-tour"]),
  m("À la kermesse du collège, on fait le bilan des joueurs du chamboule-tout.", "joueur", "joueurs", ["Enfant", "est un enfant", "sont des enfants"], ["Adulte", "est un adulte", "sont des adultes"], ["Lot gagné", "a gagné un lot", "ont gagné un lot"], ["Rien gagné", "n'a rien gagné", "n'ont rien gagné"]),
  m("La médiathèque fait le bilan des emprunts de la semaine.", "lecteur", "lecteurs", ["Roman", "a emprunté un roman", "ont emprunté un roman"], ["BD", "a emprunté une BD", "ont emprunté une BD"], ["Moins de 18 ans", "a moins de 18 ans", "ont moins de 18 ans"], ["18 ans ou plus", "a 18 ans ou plus", "ont 18 ans ou plus"]),
  m("Au self du lycée, on note le plat choisi par les demi-pensionnaires.", "élève", "élèves", ["Cari", "a pris le cari poulet", "ont pris le cari poulet"], ["Rougail", "a pris le rougail saucisse", "ont pris le rougail saucisse"], ["Dessert", "a pris un dessert", "ont pris un dessert"], ["Sans dessert", "n'a pas pris de dessert", "n'ont pas pris de dessert"]),
  m("Un club de football recense ses licenciés.", "licencié", "licenciés", ["Fille", "est une fille", "sont des filles"], ["Garçon", "est un garçon", "sont des garçons"], ["Compétition", "joue en compétition", "jouent en compétition"], ["Loisir", "joue en loisir", "jouent en loisir"]),
  m("Une usine fabrique des pièces sur deux machines.", "pièce", "pièces", ["Machine 1", "vient de la machine 1", "viennent de la machine 1"], ["Machine 2", "vient de la machine 2", "viennent de la machine 2"], ["Défectueuse", "est défectueuse", "sont défectueuses"], ["Conforme", "est conforme", "sont conformes"], true),
  m("Un laboratoire essaie un test de dépistage sur des volontaires.", "personne", "personnes", ["Malade", "est malade", "sont malades"], ["Non malade", "n'est pas malade", "ne sont pas malades"], ["Test positif", "a un test positif", "ont un test positif"], ["Test négatif", "a un test négatif", "ont un test négatif"], true),
  m("Un lycée recense ses élèves de seconde.", "élève", "élèves", ["Espagnol", "étudie l'espagnol", "étudient l'espagnol"], ["Allemand", "étudie l'allemand", "étudient l'allemand"], ["Interne", "est interne", "sont internes"], ["Externe", "est externe", "sont externes"]),
  m("Un cinéma fait le bilan de la séance de 18 h.", "spectateur", "spectateurs", ["Film d'action", "a vu le film d'action", "ont vu le film d'action"], ["Dessin animé", "a vu le dessin animé", "ont vu le dessin animé"], ["Pop-corn", "a acheté du pop-corn", "ont acheté du pop-corn"], ["Sans pop-corn", "n'a pas acheté de pop-corn", "n'ont pas acheté de pop-corn"]),
  m("Au festival de musique de Saint-Pierre, on interroge le public.", "festivalier", "festivaliers", ["Séga", "préfère le séga", "préfèrent le séga"], ["Maloya", "préfère le maloya", "préfèrent le maloya"], ["Moins de 25 ans", "a moins de 25 ans", "ont moins de 25 ans"], ["25 ans ou plus", "a 25 ans ou plus", "ont 25 ans ou plus"]),
  m("Une enquête porte sur les élèves d'un lycée et leur téléphone.", "élève", "élèves", ["Plus de 2 h", "passe plus de 2 h par jour sur les réseaux", "passent plus de 2 h par jour sur les réseaux"], ["2 h ou moins", "passe 2 h ou moins par jour sur les réseaux", "passent 2 h ou moins par jour sur les réseaux"], ["Seconde", "est en seconde", "sont en seconde"], ["Terminale", "est en terminale", "sont en terminale"]),
  m("Un gîte de Cilaos fait le bilan de ses clients du mois.", "client", "clients", ["Week-end", "est venu le week-end", "sont venus le week-end"], ["Semaine", "est venu en semaine", "sont venus en semaine"], ["Thermes", "est allé aux thermes", "sont allés aux thermes"], ["Sans thermes", "n'est pas allé aux thermes", "ne sont pas allés aux thermes"]),
  m("Un site de jeux en ligne étudie ses joueurs inscrits.", "joueur", "joueurs", ["Console", "joue sur console", "jouent sur console"], ["Ordinateur", "joue sur ordinateur", "jouent sur ordinateur"], ["Abonné", "a pris l'abonnement", "ont pris l'abonnement"], ["Gratuit", "joue en version gratuite", "jouent en version gratuite"]),
  m("On fait le bilan du bac blanc dans un lycée.", "élève", "élèves", ["Voie générale", "est en voie générale", "sont en voie générale"], ["Voie technologique", "est en voie technologique", "sont en voie technologique"], ["Moyenne", "a eu la moyenne", "ont eu la moyenne"], ["Sous la moyenne", "n'a pas eu la moyenne", "n'ont pas eu la moyenne"]),
  m("Un marchand du marché de Saint-Paul fait le bilan de ses clients du samedi.", "client", "clients", ["Letchis", "a acheté des letchis", "ont acheté des letchis"], ["Mangues", "a acheté des mangues", "ont acheté des mangues"], ["Carte", "a payé par carte", "ont payé par carte"], ["Espèces", "a payé en espèces", "ont payé en espèces"]),
  m("Une enquête porte sur les salariés d'une entreprise.", "salarié", "salariés", ["Vélo", "vient au travail à vélo", "viennent au travail à vélo"], ["Voiture", "vient au travail en voiture", "viennent au travail en voiture"], ["Plus de 10 km", "habite à plus de 10 km", "habitent à plus de 10 km"], ["10 km ou moins", "habite à 10 km ou moins", "habitent à 10 km ou moins"]),
  m("Une école de surf de Saint-Leu fait le bilan de ses stagiaires.", "stagiaire", "stagiaires", ["Débutant", "est débutant", "sont débutants"], ["Confirmé", "est confirmé", "sont confirmés"], ["Planche louée", "a loué sa planche", "ont loué leur planche"], ["Planche perso", "a sa propre planche", "ont leur propre planche"]),
  m("Un refuge pour animaux recense ses pensionnaires.", "animal", "animaux", ["Chien", "est un chien", "sont des chiens"], ["Chat", "est un chat", "sont des chats"], ["Adopté", "a été adopté cette année", "ont été adoptés cette année"], ["Pas adopté", "n'a pas encore été adopté", "n'ont pas encore été adoptés"]),
  m("On étudie les coureurs inscrits à la Diagonale des Fous.", "coureur", "coureurs", ["Réunionnais", "habite à La Réunion", "habitent à La Réunion"], ["Hors de l'île", "vient de l'extérieur de l'île", "viennent de l'extérieur de l'île"], ["Arrivé", "a terminé la course", "ont terminé la course"], ["Abandon", "a abandonné", "ont abandonné"]),
  m("Une pizzeria fait le bilan des commandes de la soirée.", "commande", "commandes", ["Livraison", "est livrée à domicile", "sont livrées à domicile"], ["À emporter", "est à emporter", "sont à emporter"], ["En retard", "est en retard", "sont en retard"], ["À l'heure", "est à l'heure", "sont à l'heure"], true),
];

type Tab = { s: Sit; cell: number[][]; R: number[]; C: number[]; total: number };
function tableau(): Tab {
  const s = pick(SITS);
  for (;;) {
    const k = pick([1, 1, 2, 5]);
    const cell = [
      [ri(3, 30) * k, ri(3, 30) * k],
      [ri(3, 30) * k, ri(3, 30) * k],
    ];
    const R = [cell[0][0] + cell[0][1], cell[1][0] + cell[1][1]];
    const C = [cell[0][0] + cell[1][0], cell[0][1] + cell[1][1]];
    // Les quatre marges toutes différentes : les dénominateurs « ligne » et
    // « colonne » ne se confondent jamais dans un QCM.
    if (new Set([...R, ...C]).size < 4) continue;
    return { s, cell, R, C, total: R[0] + R[1] };
  }
}
const rowA = (s: Sit, r: number) => (r ? s.nA : s.A);
const colA = (s: Sit, c: number) => (c ? s.nB : s.B);
const rowL = (r: number) => (r ? "\\overline{A}" : "A");
const colL = (c: number) => (c ? "\\overline{B}" : "B");
const canvasTab = (t: Tab): CanvasFigure => ({
  kind: "tableau_donnees",
  title: `Répartition des ${t.s.inds}`,
  headers: ["", t.s.B[0], t.s.nB[0], "Total"],
  rows: [
    { label: t.s.A[0], values: [t.cell[0][0], t.cell[0][1], t.R[0]] },
    { label: t.s.nA[0], values: [t.cell[1][0], t.cell[1][1], t.R[1]] },
    { label: "Total", values: [t.C[0], t.C[1], t.total] },
  ],
});
const intro = (t: Tab) => `${t.s.intro} Le tableau donne la répartition des $${t.total}$ ${t.s.inds}.`;
const choix = (t: Tab) => `On choisit ${t.s.un} ${t.s.ind} au hasard.`;
const notations = (s: Sit) => `On note $A$ : « ${s.ch} ${s.A[1]} » et $B$ : « ${s.ch} ${s.B[1]} ».`;

/* ═══════════════ auto_proba_intersection_tableau ═══════════════ */

const DEF_INTER = "$P(A \\cap B)$ est la probabilité que les DEUX évènements se réalisent ensemble : on la calcule sur la population ENTIÈRE.";

const interCase = (): Q => {
  const t = tableau();
  const { s } = t;
  const r = ri(0, 1);
  const c = ri(0, 1);
  const X = rowA(s, r);
  const Y = colA(s, c);
  const n = t.cell[r][c];
  const k = ri(0, 3);
  const text = `${intro(t)} ${choix(t)} ` + [
    `Quelle est la probabilité de l'évènement « ${s.ch} ${X[1]} et ${Y[1]} » ?`,
    `${notations(s)} Calcule $P(${rowL(r)} \\cap ${colL(c)})$.`,
    `Quelle est la probabilité de tomber sur ${s.un} ${s.ind} qui ${X[1]} et qui ${Y[1]} ? (Réponds par une fraction.)`,
    `Lis le tableau : quelle est la probabilité que le tirage donne ${s.un} ${s.ind} qui, à la fois, ${X[1]} et ${Y[1]} ?`,
  ][k];
  return {
    text,
    format: "short",
    expected: ecritures(n, t.total),
    comparator: "fraction_decimal_equivalent",
    canvas: canvasTab(t),
    explanation: exp(
      DEF_INTER,
      "On lit la case au croisement de la ligne et de la colonne, puis on divise par l'effectif total.",
      `La case « ${X[0]} » × « ${Y[0]} » contient $${n}$ ; le total est $${t.total}$ : ${egalites(n, t.total)}.`,
      `La probabilité vaut ${tf(n, t.total)}. ⚠️ Diviser par $${t.R[r]}$ (la ligne) donnerait une probabilité conditionnelle.`,
    ),
  };
};

const interQcm = (): Q => {
  const t = tableau();
  const { s } = t;
  const r = ri(0, 1);
  const c = ri(0, 1);
  const X = rowA(s, r);
  const Y = colA(s, c);
  const n = t.cell[r][c];
  const { choices, expected } = qcmF([n, t.total], [[n, t.R[r]], [n, t.C[c]], [t.R[r], t.total], [t.C[c], t.total]]);
  const k = ri(0, 2);
  const text = `${intro(t)} ${choix(t)} ` + [
    `Quelle est la probabilité de tirer ${s.un} ${s.ind} qui ${X[1]} et qui ${Y[1]} ?`,
    `${notations(s)} Quelle est la valeur de $P(${rowL(r)} \\cap ${colL(c)})$ ?`,
    `Quelle fraction donne la probabilité de l'évènement « ${s.ch} ${X[1]} et ${Y[1]} » ?`,
  ][k];
  return {
    text,
    format: "qcm",
    choices,
    expected,
    comparator: "mcq_exact",
    canvas: canvasTab(t),
    explanation: exp(
      DEF_INTER,
      "Numérateur : la case du croisement. Dénominateur : le total général.",
      `Case « ${X[0]} » × « ${Y[0]} » : $${n}$. Total : $${t.total}$. ` +
        `Les leurres divisent par la ligne ($${t.R[r]}$) ou la colonne ($${t.C[c]}$) — ce sont des conditionnelles — ou prennent une marge au lieu de la case.`,
      `La probabilité vaut ${tf(n, t.total)}.`,
    ),
  };
};

const interPourcent = (): Q => {
  const s = pick(SITS);
  const p = partage(4);
  const cell = [[p[0], p[1]], [p[2], p[3]]];
  const r = ri(0, 1);
  const c = ri(0, 1);
  const X = rowA(s, r);
  const Y = colA(s, c);
  const n = cell[r][c];
  const canvas: CanvasFigure = {
    kind: "tableau_donnees",
    title: `Répartition des ${s.inds} (en % du total)`,
    headers: ["", s.B[0], s.nB[0], "Total"],
    rows: [
      { label: s.A[0], values: [`${cell[0][0]} %`, `${cell[0][1]} %`, `${cell[0][0] + cell[0][1]} %`] },
      { label: s.nA[0], values: [`${cell[1][0]} %`, `${cell[1][1]} %`, `${cell[1][0] + cell[1][1]} %`] },
      { label: "Total", values: [`${cell[0][0] + cell[1][0]} %`, `${cell[0][1] + cell[1][1]} %`, "100 %"] },
    ],
  };
  const k = ri(0, 2);
  const text = `${s.intro} Le tableau donne la répartition en pourcentage de l'effectif total. ${maj(s.un)} ${s.ind} est choisi${s.un === "une" ? "e" : ""} au hasard. ` + [
    `Quelle est la probabilité de l'évènement « ${s.ch} ${X[1]} et ${Y[1]} » ? (Donne un nombre décimal.)`,
    `${notations(s)} Donne $P(${rowL(r)} \\cap ${colL(c)})$ en écriture décimale.`,
    `Quelle est la probabilité de choisir ${s.un} ${s.ind} qui ${X[1]} et ${Y[1]} ?`,
  ][k];
  return {
    text,
    format: "short",
    expected: ecritures(n, 100),
    comparator: "fraction_decimal_equivalent",
    canvas,
    explanation: exp(
      DEF_INTER,
      "Dans un tableau en pourcentages du total, la case du croisement donne directement $P(A \\cap B)$ : il suffit de la convertir en décimal.",
      `La case « ${X[0]} » × « ${Y[0]} » vaut ${n} %, soit $${fr(n / 100)}$.`,
      `La probabilité vaut $${fr(n / 100)}$.`,
    ),
  };
};

const interAffirmation = (): Q => {
  const t = tableau();
  const { s } = t;
  const r = ri(0, 1);
  const c = ri(0, 1);
  const X = rowA(s, r);
  const Y = colA(s, c);
  const n = t.cell[r][c];
  const den = pick([t.total, t.total, t.R[r], t.C[c]]);
  const ok = den === t.total;
  const q = pick(PRENOMS);
  const k = ri(0, 2);
  const text = `${intro(t)} ${choix(t)} ` + [
    `${q.nom} affirme : « la probabilité de l'évènement “${s.ch} ${X[1]} et ${Y[1]}” vaut ${tf(n, den)} ». A-t-${ilElle(q)} raison ?`,
    `${notations(s)} ${q.nom} écrit $P(${rowL(r)} \\cap ${colL(c)}) =$ ${tf(n, den)}. Est-ce juste ?`,
    `Pour la probabilité de choisir ${s.un} ${s.ind} qui ${X[1]} et ${Y[1]}, ${q.nom} trouve ${tf(n, den)}. Est-ce correct ?`,
  ][k];
  return {
    text,
    format: "qcm",
    choices: [...OUI_NON],
    expected: [ok ? "oui" : "non"],
    comparator: "mcq_exact",
    canvas: canvasTab(t),
    explanation: exp(
      DEF_INTER,
      "On vérifie le numérateur (la case du croisement) et surtout le dénominateur (le total général).",
      ok
        ? `Case : $${n}$, total : $${t.total}$. C'est bien ${tf(n, t.total)}.`
        : `Case : $${n}$, mais ${q.nom} divise par $${den}$ (${den === t.R[r] ? "le total de la ligne" : "le total de la colonne"}) au lieu du total $${t.total}$ : c'est une probabilité conditionnelle.`,
      ok ? "Oui, c'est juste." : `Non : la bonne valeur est ${tf(n, t.total)}.`,
    ),
  };
};

const interEffectif = (): Q => {
  const s = pick(SITS);
  const r = ri(0, 1);
  const c = ri(0, 1);
  const X = rowA(s, r);
  const Y = colA(s, c);
  const [a, b] = pick([[1, 10], [1, 5], [1, 4], [3, 10], [2, 5], [1, 2], [3, 20], [1, 20], [7, 20], [3, 5]] as const);
  const N = b * pick([2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25]);
  const n = (N * a) / b;
  const affs = [tf(a, b), `$${decimale(a, b)}$`, pourcent(a, b) as string];
  const aff = pick(affs);
  const k = ri(0, 2);
  const text = `${s.intro} Il y a $${N}$ ${s.inds}. ${choix({ s } as Tab)} ` + [
    `La probabilité de l'évènement « ${s.ch} ${X[1]} et ${Y[1]} » vaut ${aff}. Combien ${deN(s.inds)} ${X[2]} et ${Y[2]} ?`,
    `${notations(s)} On sait que $P(${rowL(r)} \\cap ${colL(c)}) =$ ${aff}. Quel effectif faut-il écrire dans la case « ${X[0]} » × « ${Y[0]} » ?`,
    `On sait que la probabilité de tomber sur ${s.un} ${s.ind} qui ${X[1]} et ${Y[1]} est ${aff}. Combien sont dans ce cas ?`,
  ][k];
  return {
    text,
    format: "short",
    expected: [String(n)],
    comparator: "number_equal",
    explanation: exp(
      DEF_INTER,
      "$P(A \\cap B) = \\dfrac{\\text{effectif de la case}}{\\text{total}}$, donc effectif de la case $=$ $P(A \\cap B) \\times$ total.",
      `${tf(a, b)} de $${N}$ : $${N} \\div ${b} \\times ${a} = ${n}$.`,
      `La case « ${X[0]} » × « ${Y[0]} » contient $${n}$ ${s.inds}.`,
    ),
  };
};

/* ═══════════════ auto_proba_conditionnelle_lecture ═══════════════ */

const DEF_COND = "Une probabilité conditionnelle se calcule dans la population RÉDUITE à ceux qui vérifient la condition : la case au numérateur, le total de la ligne (ou de la colonne) de la condition au dénominateur.";

/** La condition porte sur une ligne (parLigne) ou sur une colonne. */
function condition(t: Tab, parLigne: boolean) {
  const { s } = t;
  const r = ri(0, 1);
  const c = ri(0, 1);
  const cond = parLigne ? rowA(s, r) : colA(s, c);
  const cible = parLigne ? colA(s, c) : rowA(s, r);
  const Lc = parLigne ? rowL(r) : colL(c);
  const Lk = parLigne ? colL(c) : rowL(r);
  const n = t.cell[r][c];
  const den = parLigne ? t.R[r] : t.C[c];
  const autreMarge = parLigne ? t.C[c] : t.R[r];
  const autreCase = parLigne ? t.cell[r][1 - c] : t.cell[1 - r][c];
  return { r, c, cond, cible, Lc, Lk, n, den, autreMarge, autreCase };
}
const condTexte = (t: Tab, x: ReturnType<typeof condition>, k: number) => {
  const { s } = t;
  return [
    `On choisit au hasard ${s.un} ${s.ind} parmi ${s.ceux} qui ${x.cond[2]}. Quelle est la probabilité de l'évènement « ${s.il} ${x.cible[1]} » ?`,
    `Parmi les ${s.inds} qui ${x.cond[2]}, quelle proportion ${x.cible[2]} ? (Réponds par une fraction.)`,
    `${choix(t)} Sachant que ${s.ch} ${x.cond[1]}, quelle est la probabilité de l'évènement « ${s.il} ${x.cible[1]} » ?`,
    `${choix(t)} On note $A$ : « ${s.ch} ${s.A[1]} » et $B$ : « ${s.ch} ${s.B[1]} ». Calcule $P_{${x.Lc}}(${x.Lk})$.`,
  ][k];
};
const condExplication = (t: Tab, x: ReturnType<typeof condition>) =>
  exp(
    DEF_COND,
    `La condition « ${x.cond[0]} » réduit la population à $${x.den}$ ${t.s.inds}.`,
    `Parmi eux, $${x.n}$ sont dans la case « ${x.cible[0]} » : ${egalites(x.n, x.den)}.`,
    `La probabilité vaut ${tf(x.n, x.den)}. ⚠️ Diviser par le total $${t.total}$ donnerait l'intersection, pas la conditionnelle.`,
  );

const condLigne = (): Q => {
  const t = tableau();
  const x = condition(t, true);
  return {
    text: `${intro(t)} ${condTexte(t, x, ri(0, 3))}`,
    format: "short",
    expected: ecritures(x.n, x.den),
    comparator: "fraction_decimal_equivalent",
    canvas: canvasTab(t),
    explanation: condExplication(t, x),
  };
};
const condColonne = (): Q => {
  const t = tableau();
  const x = condition(t, false);
  return {
    text: `${intro(t)} ${condTexte(t, x, ri(0, 3))}`,
    format: "short",
    expected: ecritures(x.n, x.den),
    comparator: "fraction_decimal_equivalent",
    canvas: canvasTab(t),
    explanation: condExplication(t, x),
  };
};
const condQcm = (): Q => {
  const t = tableau();
  const x = condition(t, Math.random() < 0.5);
  const { choices, expected } = qcmF([x.n, x.den], [[x.n, t.total], [x.n, x.autreMarge], [x.autreCase, x.den], [x.den, t.total]]);
  const k = pick([0, 2, 3]);
  return {
    text: `${intro(t)} ${condTexte(t, x, k)} Choisis la bonne valeur.`,
    format: "qcm",
    choices,
    expected,
    comparator: "mcq_exact",
    canvas: canvasTab(t),
    explanation: condExplication(t, x),
  };
};
const condAffirmation = (): Q => {
  const t = tableau();
  const x = condition(t, Math.random() < 0.5);
  const den = pick([x.den, x.den, t.total, x.autreMarge]);
  const ok = den === x.den;
  const q = pick(PRENOMS);
  const { s } = t;
  const k = ri(0, 2);
  const text = `${intro(t)} ` + [
    `${q.nom} affirme : « parmi les ${s.inds} qui ${x.cond[2]}, la proportion de ${s.ceux} qui ${x.cible[2]} est ${tf(x.n, den)} ». A-t-${ilElle(q)} raison ?`,
    `${choix(t)} ${notations(s)} ${q.nom} écrit $P_{${x.Lc}}(${x.Lk}) =$ ${tf(x.n, den)}. Est-ce juste ?`,
    `${choix(t)} Sachant que ${s.ch} ${x.cond[1]}, ${q.nom} trouve ${tf(x.n, den)} pour la probabilité de l'évènement « ${s.il} ${x.cible[1]} ». Est-ce correct ?`,
  ][k];
  return {
    text,
    format: "qcm",
    choices: [...OUI_NON],
    expected: [ok ? "oui" : "non"],
    comparator: "mcq_exact",
    canvas: canvasTab(t),
    explanation: exp(
      DEF_COND,
      `La condition « ${x.cond[0]} » réduit la population à $${x.den}$ ${s.inds} : c'est le seul bon dénominateur.`,
      ok
        ? `Case : $${x.n}$, population réduite : $${x.den}$. C'est bien ${tf(x.n, x.den)}.`
        : `${q.nom} divise par $${den}$ (${den === t.total ? "le total général : c'est l'intersection" : "la marge de l'autre caractère : la condition est inversée"}) au lieu de $${x.den}$.`,
      ok ? "Oui, c'est juste." : `Non : la bonne valeur est ${tf(x.n, x.den)}.`,
    ),
  };
};

type CleBranche = "pA" | "pNonA" | "pBA" | "pNonBA" | "pBNonA" | "pNonBNonA";
const condArbre = (): Q => {
  const s = pick(SITS);
  const pA = pick([20, 25, 30, 35, 40, 45, 55, 60, 65, 70, 75, 80]);
  const pBA = pick([10, 15, 20, 30, 35, 40, 60, 65, 70, 80, 85, 90]);
  const pBNonA = pick([5, 10, 25, 45, 50, 55, 75, 95].filter((v) => v !== pBA));
  const v: Record<CleBranche, number> = { pA, pNonA: 100 - pA, pBA, pNonBA: 100 - pBA, pBNonA, pNonBNonA: 100 - pBNonA };
  const cas = pick([
    { cache: "pNonBA" as CleBranche, voisin: "pBA" as CleBranche, nota: "P_A(\\overline{B})", mots: `sachant qu'${s.il} ${s.A[1]}, la probabilité de l'évènement « ${s.il} ${s.nB[1]} »` },
    { cache: "pBA" as CleBranche, voisin: "pNonBA" as CleBranche, nota: "P_A(B)", mots: `sachant qu'${s.il} ${s.A[1]}, la probabilité de l'évènement « ${s.il} ${s.B[1]} »` },
    { cache: "pNonBNonA" as CleBranche, voisin: "pBNonA" as CleBranche, nota: "P_{\\overline{A}}(\\overline{B})", mots: `sachant qu'${s.il} ${s.nA[1]}, la probabilité de l'évènement « ${s.il} ${s.nB[1]} »` },
    { cache: "pBNonA" as CleBranche, voisin: "pNonBNonA" as CleBranche, nota: "P_{\\overline{A}}(B)", mots: `sachant qu'${s.il} ${s.nA[1]}, la probabilité de l'évènement « ${s.il} ${s.B[1]} »` },
  ]);
  const val = (k: CleBranche) => (k === cas.cache ? "?" : fr(v[k] / 100));
  const canvas = {
    kind: "arbre_proba",
    titre: `A : ${s.A[0]} — B : ${s.B[0]}`,
    racineEnfants: [
      { label: "A", proba: val("pA"), enfants: [{ label: "B", proba: val("pBA") }, { label: "B̄", proba: val("pNonBA") }] },
      { label: "Ā", proba: val("pNonA"), enfants: [{ label: "B", proba: val("pBNonA") }, { label: "B̄", proba: val("pNonBNonA") }] },
    ],
  } as unknown as CanvasFigure;
  const k = ri(0, 2);
  const text = `${s.intro} ${maj(s.un)} ${s.ind} est choisi${s.un === "une" ? "e" : ""} au hasard. ${notations(s)} ` + [
    `L'arbre pondéré résume la situation. Que vaut $${cas.nota}$ ?`,
    `Lis l'arbre : quelle est, ${cas.mots} ?`,
    `Une branche de l'arbre a été effacée. Quelle valeur faut-il y écrire pour $${cas.nota}$ ?`,
  ][k];
  return {
    text,
    format: "short",
    expected: ecritures(v[cas.cache], 100),
    comparator: "fraction_decimal_equivalent",
    canvas,
    explanation: exp(
      "Sur un arbre pondéré, les branches du second niveau portent des probabilités CONDITIONNELLES, et les branches issues d'un même nœud ont une somme égale à $1$.",
      "On repère le nœud de la condition, puis on complète à $1$ avec la branche voisine.",
      `La branche voisine porte $${fr(v[cas.voisin] / 100)}$ : $1 - ${fr(v[cas.voisin] / 100)} = ${fr(v[cas.cache] / 100)}$.`,
      `$${cas.nota} = ${fr(v[cas.cache] / 100)}$.`,
    ),
  };
};

/* ═══════════════ auto_proba_distinguer ═══════════════ */

const DEF_DIST = "$P(A \\cap B)$, $P_A(B)$ et $P_B(A)$ ont le même numérateur (la case) mais trois dénominateurs : le total, l'effectif de $A$, l'effectif de $B$.";

const distPhrase = (): Q => {
  const t = tableau();
  const { s } = t;
  const xEstA = Math.random() < 0.5;
  const X = xEstA ? s.A : s.B;
  const Y = xEstA ? s.B : s.A;
  const genre = pick(["parmi", "chez", "inter", "sachant"] as const);
  const phrase =
    genre === "parmi"
      ? `parmi les ${s.inds} qui ${X[2]}, la proportion de ${s.ceux} qui ${Y[2]}`
      : genre === "chez"
        ? `la proportion de ${s.inds} qui ${Y[2]}, chez ${s.ceux} qui ${X[2]}`
        : genre === "inter"
          ? `la proportion, sur l'ensemble des ${s.inds}, de ${s.ceux} qui ${X[2]} et ${Y[2]}`
          : `la probabilité de l'évènement “${s.ch} ${Y[1]}” quand on sait déjà qu'${s.il} ${X[1]}`;
  const bon = genre === "inter" ? "$P(A \\cap B)$" : xEstA ? "$P_A(B)$" : "$P_B(A)$";
  const k = ri(0, 1);
  const text = `${intro(t)} ${choix(t)} ${notations(s)} ` + [
    `Quelle écriture correspond à « ${phrase} » ?`,
    `Comment note-t-on « ${phrase} » ?`,
  ][k];
  return {
    text,
    format: "qcm",
    choices: qcm(bon, ["$P_A(B)$", "$P_B(A)$", "$P(A \\cap B)$", xEstA ? "$P(B)$" : "$P(A)$"]),
    expected: [bon],
    comparator: "mcq_exact",
    canvas: canvasTab(t),
    explanation: exp(
      DEF_DIST,
      "On repère ce qui est SU (après « parmi », « chez », « sachant ») : c'est l'indice. Sans condition, avec « et », c'est l'intersection.",
      genre === "inter"
        ? "On compte sur l'ensemble des individus ceux qui vérifient les deux caractères : aucune condition."
        : `La condition est « ${X[0]} », donc ${xEstA ? "$A$" : "$B$"} en indice.`,
      `C'est ${bon}.`,
    ),
  };
};

/** Une des trois quantités, sur la case (A, B). */
function quantite(t: Tab) {
  const g = pick(["inter", "AB", "BA"] as const);
  const n = t.cell[0][0];
  if (g === "inter") return { g, nota: "P(A \\cap B)", n, den: t.total, quoi: "le total général" };
  if (g === "AB") return { g, nota: "P_A(B)", n, den: t.R[0], quoi: `l'effectif de $A$ (« ${t.s.A[0]} »)` };
  return { g, nota: "P_B(A)", n, den: t.C[0], quoi: `l'effectif de $B$ (« ${t.s.B[0]} »)` };
}

const distDenominateur = (): Q => {
  const t = tableau();
  const x = quantite(t);
  const k = ri(0, 2);
  const text = `${intro(t)} ${choix(t)} ${notations(t.s)} ` + [
    `Pour calculer $${x.nota}$, par quel nombre faut-il diviser ?`,
    `Quel est le dénominateur de $${x.nota}$ ?`,
    `On veut $${x.nota}$. Quel effectif met-on au dénominateur ?`,
  ][k];
  const bon = `$${x.den}$`;
  return {
    text,
    format: "qcm",
    choices: qcm(bon, [`$${t.total}$`, `$${t.R[0]}$`, `$${t.C[0]}$`, `$${t.cell[0][0]}$`]),
    expected: [bon],
    comparator: "mcq_exact",
    canvas: canvasTab(t),
    explanation: exp(
      DEF_DIST,
      "L'indice dit la population de référence ; sans indice, c'est la population entière.",
      `Pour $${x.nota}$, on divise par ${x.quoi} : $${x.den}$.`,
      `$${x.nota} = ${tf(x.n, x.den).slice(1, -1)}$.`,
    ),
  };
};

const distCalcul = (): Q => {
  const t = tableau();
  const x = quantite(t);
  const k = ri(0, 2);
  const text = `${intro(t)} ${choix(t)} ${notations(t.s)} ` + [
    `Calcule $${x.nota}$.`,
    `Que vaut $${x.nota}$ ? (Réponds par une fraction.)`,
    `Attention aux dénominateurs : donne $${x.nota}$.`,
  ][k];
  return {
    text,
    format: "short",
    expected: ecritures(x.n, x.den),
    comparator: "fraction_decimal_equivalent",
    canvas: canvasTab(t),
    explanation: exp(
      DEF_DIST,
      "Même numérateur pour les trois : la case « A et B ». Seul le dénominateur change.",
      `$${x.nota}$ se divise par ${x.quoi} : ${egalites(x.n, x.den)}.`,
      `$${x.nota} =$ ${tf(x.n, x.den)}.`,
    ),
  };
};

const distParQuoi = (): Q => {
  const t = tableau();
  const g = pick(["total", "A", "B"] as const);
  const N = g === "total" ? t.total : g === "A" ? t.R[0] : t.C[0];
  const bon = g === "total" ? "$P(A \\cap B)$" : g === "A" ? "$P_A(B)$" : "$P_B(A)$";
  const k = ri(0, 1);
  const text = `${intro(t)} ${choix(t)} ${notations(t.s)} ` + [
    `Laquelle de ces quantités se calcule en divisant par $${N}$ ?`,
    `Pour laquelle de ces probabilités le dénominateur est-il $${N}$ ?`,
  ][k];
  return {
    text,
    format: "qcm",
    choices: qcm(bon, ["$P(A \\cap B)$", "$P_A(B)$", "$P_B(A)$", "$P(A) \\times P(B)$"]),
    expected: [bon],
    comparator: "mcq_exact",
    canvas: canvasTab(t),
    explanation: exp(
      DEF_DIST,
      "On identifie à quoi correspond ce nombre dans le tableau : total général, total de la ligne $A$, total de la colonne $B$.",
      `$${N}$ est ${g === "total" ? "le total général" : g === "A" ? `le total de la ligne « ${t.s.A[0]} »` : `le total de la colonne « ${t.s.B[0]} »`}. ` +
        `$P(A \\cap B) = ${tf(t.cell[0][0], t.total).slice(1, -1)}$, $P_A(B) = ${tf(t.cell[0][0], t.R[0]).slice(1, -1)}$, $P_B(A) = ${tf(t.cell[0][0], t.C[0]).slice(1, -1)}$.`,
      `C'est ${bon}.`,
    ),
  };
};

const distPourcentage = (): Q => {
  const s = pick(SITS);
  const p = pick([10, 15, 20, 25, 30, 35, 40, 45, 55, 60, 65, 70, 75, 80, 85]);
  const xEstA = Math.random() < 0.5;
  const X = xEstA ? s.A : s.B;
  const Y = xEstA ? s.B : s.A;
  const genre = pick(["parmi", "des", "inter", "simple"] as const);
  const info =
    genre === "parmi"
      ? `Parmi les ${s.inds} qui ${X[2]}, ${p} % ${Y[2]}.`
      : genre === "des"
        ? `${p} % des ${s.inds} qui ${X[2]} ${Y[2]}.`
        : genre === "inter"
          ? `${p} % des ${s.inds} ${X[2]} et ${Y[2]}.`
          : `${p} % des ${s.inds} ${Y[2]}.`;
  const v = fr(p / 100);
  const LX = xEstA ? "A" : "B";
  const LY = xEstA ? "B" : "A";
  const bon = genre === "inter" ? `$P(A \\cap B) = ${v}$` : genre === "simple" ? `$P(${LY}) = ${v}$` : `$P_${LX}(${LY}) = ${v}$`;
  const leurres = [`$P_${LX}(${LY}) = ${v}$`, `$P_${LY}(${LX}) = ${v}$`, `$P(A \\cap B) = ${v}$`, `$P(${LY}) = ${v}$`];
  const k = ri(0, 1);
  const text = `${s.intro} ${maj(s.un)} ${s.ind} est choisi${s.un === "une" ? "e" : ""} au hasard. ${notations(s)} On sait que : « ${info} » ` + [
    "Quelle égalité traduit cette information ?",
    "Comment s'écrit cette information avec les notations des probabilités ?",
  ][k];
  return {
    text,
    format: "qcm",
    choices: qcm(bon, leurres),
    expected: [bon],
    comparator: "mcq_exact",
    explanation: exp(
      DEF_DIST,
      "« Parmi les… », « des … qui … » : la population est réduite, c'est une conditionnelle. « … et … » sur tous les individus : l'intersection. Sans précision : la probabilité simple.",
      genre === "inter"
        ? "Le pourcentage porte sur TOUS les individus, et sur les deux caractères à la fois."
        : genre === "simple"
          ? "Le pourcentage porte sur tous les individus, et sur un seul caractère."
          : `Le pourcentage est pris parmi ceux qui ${X[2]} : c'est la condition, ${LX} en indice.`,
      `On écrit ${bon}.`,
    ),
  };
};

/* ═══════════════════════════ LA BANQUE ═══════════════════════════ */

const H_ENC = "Une probabilité est toujours comprise entre $0$ et $1$.";
const H_SOM = "La somme des probabilités de TOUTES les issues vaut exactement $1$.";
const H_CON = "$P(\\overline{A}) = 1 - P(A)$.";
const H_EQU = "En situation d'équiprobabilité, $P(A) = \\frac{\\text{nombre de cas favorables}}{\\text{nombre de cas possibles}}$.";
const H_INT = "L'intersection se lit dans UNE case, et se divise par l'effectif TOTAL.";
const H_CND = "« Parmi les… » : le dénominateur est le total de cette ligne (ou colonne), pas le total général.";
const H_DIS = "Trois quotients, trois dénominateurs différents : le total, la ligne, la colonne.";

const B = "auto_proba_base" as const;
const L = "auto_proba_lecture" as const;

export const automatismesProbabilitesBank: TutorBankItemV4[] = [
  /* auto_proba_encadrement */
  gab("premiere_auto_proba_encadrement_tpl_1", B, "auto_proba_encadrement", 2, H_ENC, ["qcm"], encadrementQcm),
  gab("premiere_auto_proba_encadrement_tpl_2", B, "auto_proba_encadrement", 1, H_ENC, ["vrai-faux"], encadrementOuiNon),
  gab("premiere_auto_proba_encadrement_tpl_3", B, "auto_proba_encadrement", 3, "Sur l'échelle des probabilités : $0$ impossible, $\\frac{1}{2}$ une chance sur deux, $1$ certain.", ["qcm"], encadrementSens),

  /* auto_proba_somme_issues */
  gab("premiere_auto_proba_somme_tpl_1", B, "auto_proba_somme_issues", 3, H_SOM, ["short"], sommeManquante),
  gab("premiere_auto_proba_somme_tpl_2", B, "auto_proba_somme_issues", 2, H_SOM, ["vrai-faux"], sommeValide),
  gab("premiere_auto_proba_somme_tpl_3", B, "auto_proba_somme_issues", 4, "Appelle $p$ la probabilité inconnue et écris que la somme vaut $1$.", ["short"], sommeDeuxInconnues),

  /* auto_proba_contraire */
  gab("premiere_auto_proba_contraire_tpl_1", B, "auto_proba_contraire", 2, H_CON, ["short"], contraireCalcul),
  gab("premiere_auto_proba_contraire_tpl_2", B, "auto_proba_contraire", 3, "Le contraire de « aucun » est « au moins un ».", ["short"], contraireAuMoins),
  gab("premiere_auto_proba_contraire_tpl_3", B, "auto_proba_contraire", 3, "Le contraire contient toutes les issues qui ne réalisent PAS l'évènement, et seulement elles.", ["qcm"], contraireQcm),

  /* auto_proba_equiprobabilite */
  gab("premiere_auto_proba_equiprobabilite_tpl_1", B, "auto_proba_equiprobabilite", 3, H_EQU, ["short"], equiUrne),
  gab("premiere_auto_proba_equiprobabilite_tpl_2", B, "auto_proba_equiprobabilite", 2, H_EQU, ["short"], equiDe),
  gab("premiere_auto_proba_equiprobabilite_tpl_3", B, "auto_proba_equiprobabilite", 4, "Favorables $=$ probabilité $\\times$ total.", ["short"], equiInverse),

  /* auto_proba_intersection_tableau — à l'étoile 2, avec le gabarit historique
     premiere_auto_proba_intersection_tpl_1 (probabilites-conditionnelles.bank.ts). */
  gab("premiere_auto_proba_intersection_tpl_2", L, "auto_proba_intersection_tableau", 2, H_INT, ["tableau", "short"], interCase),
  gab("premiere_auto_proba_intersection_tpl_3", L, "auto_proba_intersection_tableau", 2, H_INT, ["tableau", "qcm"], interQcm),
  gab("premiere_auto_proba_intersection_tpl_4", L, "auto_proba_intersection_tableau", 2, "Dans un tableau en pourcentages du total, la case donne directement la probabilité.", ["tableau", "short"], interPourcent),
  gab("premiere_auto_proba_intersection_tpl_5", L, "auto_proba_intersection_tableau", 2, H_INT, ["tableau", "vrai-faux"], interAffirmation),
  gab("premiere_auto_proba_intersection_tpl_6", L, "auto_proba_intersection_tableau", 2, "Effectif de la case $=$ probabilité $\\times$ total.", ["short"], interEffectif),

  /* auto_proba_conditionnelle_lecture — à l'étoile 3, avec le gabarit historique
     premiere_auto_proba_cond_lecture_tpl_1. */
  gab("premiere_auto_proba_cond_lecture_tpl_2", L, "auto_proba_conditionnelle_lecture", 3, H_CND, ["tableau", "short"], condLigne),
  gab("premiere_auto_proba_cond_lecture_tpl_3", L, "auto_proba_conditionnelle_lecture", 3, "« Parmi les… » d'une COLONNE : on divise par le total de cette colonne.", ["tableau", "short"], condColonne),
  gab("premiere_auto_proba_cond_lecture_tpl_4", L, "auto_proba_conditionnelle_lecture", 3, H_CND, ["tableau", "qcm"], condQcm),
  gab("premiere_auto_proba_cond_lecture_tpl_5", L, "auto_proba_conditionnelle_lecture", 3, H_CND, ["tableau", "vrai-faux"], condAffirmation),
  gab("premiere_auto_proba_cond_lecture_tpl_6", L, "auto_proba_conditionnelle_lecture", 3, "Les branches issues d'un même nœud ont une somme égale à $1$.", ["arbre", "short"], condArbre),

  /* auto_proba_distinguer — à l'étoile 4, avec le gabarit historique
     premiere_auto_proba_distinguer_tpl_1. */
  gab("premiere_auto_proba_distinguer_tpl_2", L, "auto_proba_distinguer", 4, H_DIS, ["tableau", "qcm"], distPhrase),
  gab("premiere_auto_proba_distinguer_tpl_3", L, "auto_proba_distinguer", 4, H_DIS, ["tableau", "qcm"], distDenominateur),
  gab("premiere_auto_proba_distinguer_tpl_4", L, "auto_proba_distinguer", 4, H_DIS, ["tableau", "short"], distCalcul),
  gab("premiere_auto_proba_distinguer_tpl_5", L, "auto_proba_distinguer", 4, H_DIS, ["tableau", "qcm"], distParQuoi),
  gab("premiere_auto_proba_distinguer_tpl_6", L, "auto_proba_distinguer", 4, "« Parmi les… » : conditionnelle ; « … et … » sur tous : intersection.", ["qcm"], distPourcentage),
];
