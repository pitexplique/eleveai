/**
 * Banque de questions Tutor V4 - Mathématiques 4e
 * Notion : Expressions littérales
 *
 * Objectifs :
 * - comprendre le rôle d’une lettre dans une expression ;
 * - identifier coefficient, variable et constante ;
 * - traduire une phrase en expression littérale ;
 * - substituer une valeur dans une expression ;
 * - réduire des termes semblables ;
 * - repérer les erreurs fréquentes de réduction.
 *
 * Organisation :
 * - fixed : ancrage des notions essentielles ;
 * - templates : variations de lettres, nombres et situations ;
 * - open : justification et verbalisation du raisonnement.
 *
 * ⭐ 03/10/2026 — les élèves reconnaissaient la PHRASE (mesuré : 13 à 28
 * squelettes par micro, jusqu’à 18 répétitions sur 20). Chaque gabarit compose
 * désormais une FORME d’expression (nombre de termes, ordre, signes, lettre)
 * × une CONSIGNE (« Calcule », « Que vaut… ? », « Réduis », « Écris en
 * fonction de… ») et, pour une partie des tirages, une SITUATION (taxi, location
 * de vélo, plante qui pousse, bougie, ressort, randonnée…).
 * ⛔ Corrections : plus de `contains_keyword` sur une réponse chiffrée ou une
 * expression (« 3x + 67 » passait pour 3x + 6) : `number_equal`,
 * `expression_developpee` (Réduis) ou `expression_equivalente` (Traduis).
 */
import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Un entier entre min et max, multiple de `pas` à partir de min. */
function randStep(min: number, max: number, pas: number) {
  return min + pas * randomInt(0, Math.floor((max - min) / pas));
}

function melange<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Bonne réponse + trois distracteurs DISTINCTS (entre eux et de la bonne réponse), mélangés. */
function choixQcm(correct: string, autres: string[]): string[] {
  const d = [...new Set(autres)].filter((x) => x !== correct && x !== "0").slice(0, 3);
  return melange([correct, ...d]);
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Le signe moins typographique, dans le texte affiché. */
const MOINS = "−";
/** -3 → « −3 » */
const nbT = (n: number) => (n < 0 ? `${MOINS}${-n}` : String(n));
/** -3 → « (−3) » ; 3 → « 3 » */
const parT = (n: number) => (n < 0 ? `(${MOINS}${-n})` : String(n));

/** Un terme : [coefficient, partie littérale] ; partie littérale "" pour un nombre seul. */
type Terme = [number, string];

/** Écrit une somme de termes : jamais « 1x », « 0x » ni « + −3 ». */
function ecrire(termes: Terme[]): string {
  const t = termes.filter(([c]) => c !== 0);
  if (!t.length) return "0";
  return t
    .map(([c, l], i) => {
      const abs = Math.abs(c);
      const corps = l ? (abs === 1 ? l : `${abs}${l}`) : String(abs);
      if (i === 0) return c < 0 ? `${MOINS}${corps}` : corps;
      return c < 0 ? ` ${MOINS} ${corps}` : ` + ${corps}`;
    })
    .join("");
}

/** Regroupe les termes semblables (ordre : parties littérales dans l’ordre d’apparition, nombre seul à la fin). */
function regrouper(termes: Terme[]): Terme[] {
  const ordre: string[] = [];
  const somme: Record<string, number> = {};
  for (const [c, l] of termes) {
    if (!(l in somme)) {
      somme[l] = 0;
      if (l) ordre.push(l);
    }
    somme[l] += c;
  }
  const res: Terme[] = ordre.map((l) => [somme[l], l]);
  if ("" in somme) res.push([somme[""], ""]);
  return res;
}

/** Valeur d’une partie littérale (« x », « x² », « xy ») pour des valeurs données. */
function valeurLitterale(l: string, v: Record<string, number>): number {
  let r = 1;
  for (let i = 0; i < l.length; i++) {
    const ch = l[i];
    if (ch === "²") r *= v[l[i - 1]];
    else r *= v[ch];
  }
  return r;
}

const valeurTermes = (termes: Terme[], v: Record<string, number>) =>
  termes.reduce((s, [c, l]) => s + c * (l ? valeurLitterale(l, v) : 1), 0);

/** Partie littérale remplacée : « x² » avec x = −2 → « (−2)² » ; « xy » → « 3 × (−2) ». */
function remplacerLitterale(l: string, v: Record<string, number>): string {
  const morceaux: string[] = [];
  for (let i = 0; i < l.length; i++) {
    const ch = l[i];
    if (ch === "²") morceaux[morceaux.length - 1] += "²";
    else morceaux.push(parT(v[ch]));
  }
  return morceaux.join(" × ");
}

/** « 3 × (−2) + 5 = −6 + 5 = −1 » : le calcul détaillé d’une substitution. */
function detailSubstitution(termes: Terme[], v: Record<string, number>): string {
  const t = termes.filter(([c]) => c !== 0);
  const etape1 = t
    .map(([c, l], i) => {
      const abs = Math.abs(c);
      const corps = l ? (abs === 1 ? remplacerLitterale(l, v) : `${abs} × ${remplacerLitterale(l, v)}`) : String(abs);
      if (i === 0) return c < 0 ? `${MOINS}${corps}` : corps;
      return c < 0 ? ` ${MOINS} ${corps}` : ` + ${corps}`;
    })
    .join("");
  const valeurs = t.map(([c, l]) => c * (l ? valeurLitterale(l, v) : 1));
  const etape2 = valeurs
    .map((x, i) => (i === 0 ? nbT(x) : x < 0 ? ` ${MOINS} ${-x}` : ` + ${x}`))
    .join("");
  const res = valeurs.reduce((s, x) => s + x, 0);
  if (t.length === 1 || etape1 === etape2) return `${etape1} = ${nbT(res)}`;
  return `${etape1} = ${etape2} = ${nbT(res)}`;
}

const LETTRES = ["x", "a", "n", "t", "y", "b", "k", "m"] as const;

const DEF_EXPR = "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n";
const DEF_SUBST = "Définition : substituer, c’est remplacer la lettre par sa valeur, puis calculer en respectant les priorités.\n\n";
const DEF_REDUIRE = "Définition : réduire, c’est regrouper les termes semblables (même partie littérale) en additionnant leurs coefficients.\n\n";
const DEF_TRADUIRE = "Définition : traduire une phrase, c’est l’écrire avec une lettre, des nombres et des opérations.\n\n";

// =========================================================
// SITUATIONS : une grandeur qui dépend d’une lettre, b + a × lettre
// (ou b − a × lettre). Nombres plausibles pour chaque contexte.
// =========================================================
type Situation = {
  l: string; // la lettre
  quoi: string; // ce que représente la lettre
  grandeur: string; // ce que donne l’expression
  g: "m" | "f"; // genre de la grandeur
  unite: string; // unité du résultat
  signe: 1 | -1; // 1 : a·l + b ; −1 : b − a·l
  tirer: () => [number, number]; // [a, b]
  decrire: (a: number, b: number) => string;
  valeur: (a: number, b: number) => number; // une valeur plausible de la lettre
  question: (v: number) => string;
};

const SITUATIONS: Situation[] = [
  {
    l: "k", quoi: "le nombre de kilomètres parcourus", grandeur: "le prix de la course (en €)", g: "m", unite: "€", signe: 1,
    tirer: () => [randomInt(1, 3), randomInt(3, 6)],
    decrire: (a, b) => `Un taxi facture ${b} € de prise en charge, puis ${a} € par kilomètre parcouru.`,
    valeur: () => randomInt(4, 20),
    question: (v) => `Combien coûte une course de ${v} km ?`,
  },
  {
    l: "h", quoi: "le nombre d’heures de location", grandeur: "le prix à payer (en €)", g: "m", unite: "€", signe: 1,
    tirer: () => [randomInt(3, 6), randomInt(2, 5)],
    decrire: (a, b) => `Une location de vélo coûte ${b} € pour le casque et l’antivol, puis ${a} € par heure.`,
    valeur: () => randomInt(2, 8),
    question: (v) => `Combien paie-t-on pour ${v} heures de location ?`,
  },
  {
    l: "m", quoi: "le nombre de mois d’abonnement", grandeur: "la dépense totale (en €)", g: "f", unite: "€", signe: 1,
    tirer: () => [randomInt(18, 30), randStep(20, 60, 5)],
    decrire: (a, b) => `Une salle de sport demande ${b} € d’inscription, puis ${a} € par mois.`,
    valeur: () => randomInt(3, 12),
    question: (v) => `Combien coûtent ${v} mois d’abonnement, inscription comprise ?`,
  },
  {
    l: "t", quoi: "la durée du travail, en heures", grandeur: "le montant de la facture (en €)", g: "m", unite: "€", signe: 1,
    tirer: () => [randStep(35, 55, 5), randStep(30, 60, 5)],
    decrire: (a, b) => `Un plombier facture ${b} € de déplacement, puis ${a} € par heure de travail.`,
    valeur: () => randomInt(2, 6),
    question: (v) => `Combien coûte une intervention de ${v} heures ?`,
  },
  {
    l: "s", quoi: "le nombre de semaines écoulées", grandeur: "la hauteur de la plante (en cm)", g: "f", unite: "cm", signe: 1,
    tirer: () => [randomInt(2, 6), randomInt(5, 20)],
    decrire: (a, b) => `Une plante de tomate mesure ${b} cm aujourd’hui et grandit de ${a} cm par semaine.`,
    valeur: () => randomInt(2, 10),
    question: (v) => `Quelle sera sa hauteur dans ${v} semaines ?`,
  },
  {
    l: "n", quoi: "le nombre de semaines écoulées", grandeur: "la somme dans la tirelire (en €)", g: "f", unite: "€", signe: 1,
    tirer: () => [randomInt(3, 15), randStep(10, 60, 5)],
    decrire: (a, b) => `Une tirelire contient ${b} € ; chaque semaine, on y ajoute ${a} €.`,
    valeur: () => randomInt(2, 12),
    question: (v) => `Combien contiendra-t-elle après ${v} semaines ?`,
  },
  {
    l: "t", quoi: "la durée de marche, en heures", grandeur: "l’altitude de la randonneuse (en m)", g: "f", unite: "m", signe: 1,
    tirer: () => [randStep(250, 450, 50), randStep(200, 900, 50)],
    decrire: (a, b) => `Une randonneuse part à ${b} m d’altitude et monte de ${a} m par heure.`,
    valeur: () => randomInt(2, 5),
    question: (v) => `À quelle altitude sera-t-elle après ${v} heures de marche ?`,
  },
  {
    l: "m", quoi: "le nombre de minutes écoulées", grandeur: "le volume d’eau dans la cuve (en L)", g: "m", unite: "L", signe: 1,
    tirer: () => [randStep(10, 40, 5), randStep(100, 500, 50)],
    decrire: (a, b) => `Une cuve de récupération d’eau de pluie contient ${b} L ; un robinet y verse ${a} L par minute.`,
    valeur: () => randomInt(2, 12),
    question: (v) => `Combien de litres contiendra-t-elle après ${v} minutes ?`,
  },
  {
    l: "c", quoi: "le nombre de cours suivis", grandeur: "le prix à payer (en €)", g: "m", unite: "€", signe: 1,
    tirer: () => [randomInt(12, 25), randStep(30, 80, 5)],
    decrire: (a, b) => `Une école de musique demande ${b} € d’inscription, puis ${a} € par cours de guitare.`,
    valeur: () => randomInt(2, 10),
    question: (v) => `Combien paie-t-on pour ${v} cours ?`,
  },
  {
    l: "p", quoi: "la masse accrochée, en kg", grandeur: "la longueur du ressort (en cm)", g: "f", unite: "cm", signe: 1,
    tirer: () => [randomInt(2, 5), randomInt(8, 15)],
    decrire: (a, b) => `Un ressort mesure ${b} cm à vide ; il s’allonge de ${a} cm pour chaque kilogramme accroché.`,
    valeur: () => randomInt(2, 6),
    question: (v) => `Quelle est sa longueur quand on accroche ${v} kg ?`,
  },
  {
    l: "n", quoi: "le nombre d’années écoulées", grandeur: "le nombre d’arbres du parc", g: "m", unite: "arbres", signe: 1,
    tirer: () => [randStep(40, 120, 10), randStep(300, 900, 50)],
    decrire: (a, b) => `Un parc compte ${b} arbres ; chaque année, on en plante ${a} de plus.`,
    valeur: () => randomInt(2, 8),
    question: (v) => `Combien d’arbres y aura-t-il dans ${v} ans ?`,
  },
  {
    l: "j", quoi: "le nombre de jours de location", grandeur: "le prix de la location (en €)", g: "m", unite: "€", signe: 1,
    tirer: () => [randomInt(8, 15), randomInt(10, 25)],
    decrire: (a, b) => `Un magasin de bricolage loue une ponceuse : ${b} € de frais de dossier, puis ${a} € par jour.`,
    valeur: () => randomInt(2, 7),
    question: (v) => `Combien coûte une location de ${v} jours ?`,
  },
  {
    l: "p", quoi: "le nombre de parts commandées", grandeur: "le prix de la commande (en €)", g: "m", unite: "€", signe: 1,
    tirer: () => [randomInt(3, 6), randomInt(10, 25)],
    decrire: (a, b) => `Un traiteur facture ${b} € de livraison, puis ${a} € par part de gâteau.`,
    valeur: () => randomInt(6, 20),
    question: (v) => `Combien coûtent ${v} parts, livraison comprise ?`,
  },
  {
    l: "t", quoi: "le nombre d’heures de course en plus", grandeur: "la distance totale parcourue (en km)", g: "f", unite: "km", signe: 1,
    tirer: () => [randomInt(8, 14), randomInt(2, 8)],
    decrire: (a, b) => `Une coureuse a déjà parcouru ${b} km ; elle continue à ${a} km par heure.`,
    valeur: () => randomInt(2, 3),
    question: (v) => `Quelle distance aura-t-elle parcourue en tout après ${v} heures de plus ?`,
  },
  {
    l: "d", quoi: "le nombre de jours de location", grandeur: "le prix de la location (en €)", g: "m", unite: "€", signe: 1,
    tirer: () => [randStep(25, 45, 5), randStep(30, 60, 5)],
    decrire: (a, b) => `Une agence loue une voiture ${b} € de forfait, plus ${a} € par jour.`,
    valeur: () => randomInt(2, 10),
    question: (v) => `Combien coûte une location de ${v} jours ?`,
  },
  {
    l: "h", quoi: "le nombre d’heures de location", grandeur: "le prix à payer (en €)", g: "m", unite: "€", signe: 1,
    tirer: () => [randomInt(8, 15), randomInt(3, 6)],
    decrire: (a, b) => `À Saint-Gilles, un club loue des kayaks : ${b} € pour le gilet, puis ${a} € par heure.`,
    valeur: () => randomInt(2, 5),
    question: (v) => `Combien paie-t-on pour ${v} heures de kayak ?`,
  },
  {
    l: "t", quoi: "le nombre d’heures écoulées", grandeur: "la hauteur de la bougie (en cm)", g: "f", unite: "cm", signe: -1,
    tirer: () => [randomInt(1, 3), randomInt(15, 30)],
    decrire: (a, b) => `Une bougie mesure ${b} cm ; en brûlant, elle raccourcit de ${a} cm par heure.`,
    valeur: (a, b) => randomInt(2, Math.min(8, Math.floor((b - 1) / a))),
    question: (v) => `Quelle est sa hauteur après ${v} heures ?`,
  },
  {
    l: "h", quoi: "le nombre d’heures écoulées", grandeur: "la charge de la batterie (en %)", g: "f", unite: "%", signe: -1,
    tirer: () => [randomInt(5, 12), randStep(80, 100, 5)],
    decrire: (a, b) => `La batterie d’un téléphone est chargée à ${b} % ; elle perd ${a} % par heure.`,
    valeur: (a, b) => randomInt(2, Math.min(6, Math.floor(b / a))),
    question: (v) => `Quelle est sa charge après ${v} heures ?`,
  },
];

/** Une situation tirée au hasard, avec son expression. */
function tirerSituation(filtre?: (s: Situation) => boolean) {
  const S = randomChoice(filtre ? SITUATIONS.filter(filtre) : SITUATIONS);
  const [a, b] = S.tirer();
  const termes: Terme[] = S.signe === 1 ? [[a, S.l], [b, ""]] : [[b, ""], [-a, S.l]];
  return { S, a, b, termes, expr: ecrire(termes) };
}

// =========================================================
// TRADUCTIONS : phrases à une étape (★1), à deux étapes (★2),
// avec parenthèses (★3).
// =========================================================
type Phrase = { p: (l: string, k: number, c: number) => string; t: (l: string, k: number, c: number) => Terme[]; lettreSeule?: boolean };

const PHRASES_1: Phrase[] = [
  { p: (l) => `le double de ${l}`, t: (l) => [[2, l]] },
  { p: (l) => `le triple de ${l}`, t: (l) => [[3, l]] },
  { p: (l) => `le quadruple de ${l}`, t: (l) => [[4, l]] },
  { p: (l, k) => `${k} fois ${l}`, t: (l, k) => [[k, l]] },
  { p: (l, k) => `le produit de ${k} par ${l}`, t: (l, k) => [[k, l]] },
  { p: (l, _k, c) => `${l} augmenté de ${c}`, t: (l, _k, c) => [[1, l], [c, ""]] },
  { p: (l, _k, c) => `${l} diminué de ${c}`, t: (l, _k, c) => [[1, l], [-c, ""]] },
  { p: (l, _k, c) => `la somme de ${l} et de ${c}`, t: (l, _k, c) => [[1, l], [c, ""]] },
  { p: (l, _k, c) => `la différence entre ${l} et ${c}`, t: (l, _k, c) => [[1, l], [-c, ""]] },
  { p: (l, _k, c) => `${c} de plus que ${l}`, t: (l, _k, c) => [[1, l], [c, ""]] },
  { p: (l, _k, c) => `${c} de moins que ${l}`, t: (l, _k, c) => [[1, l], [-c, ""]] },
  { p: (l) => `le carré de ${l}`, t: (l) => [[1, `${l}²`]] },
];

const TOURNURES_TRADUIRE: ((p: string, l: string) => string)[] = [
  (p) => `Traduis par une expression littérale : « ${p} ».`,
  (p, l) => `Écris en fonction de ${l} : « ${p} ».`,
  (p, l) => `Un nombre est noté ${l}. Écris l’expression qui correspond à « ${p} ».`,
  (p) => `Quelle expression littérale correspond à « ${p} » ?`,
  (p) => `Donne l’expression qui traduit la phrase « ${p} ».`,
];

const PHRASES_2: Phrase[] = [
  { p: (l, _k, c) => `le double de ${l} augmenté de ${c}`, t: (l, _k, c) => [[2, l], [c, ""]] },
  { p: (l, _k, c) => `le triple de ${l} diminué de ${c}`, t: (l, _k, c) => [[3, l], [-c, ""]] },
  { p: (l, k, c) => `${k} fois ${l} plus ${c}`, t: (l, k, c) => [[k, l], [c, ""]] },
  { p: (l, k, c) => `${k} fois ${l} moins ${c}`, t: (l, k, c) => [[k, l], [-c, ""]] },
  { p: (l, _k, c) => `${c} de plus que le triple de ${l}`, t: (l, _k, c) => [[3, l], [c, ""]] },
  { p: (l, _k, c) => `la somme du double de ${l} et de ${c}`, t: (l, _k, c) => [[2, l], [c, ""]] },
  { p: (l, _k, c) => `${c} moins le double de ${l}`, t: (l, _k, c) => [[c, ""], [-2, l]] },
  { p: (l, k, c) => `le produit de ${k} par ${l}, augmenté de ${c}`, t: (l, k, c) => [[k, l], [c, ""]] },
  { p: (l, k, c) => `${l} multiplié par ${k}, puis diminué de ${c}`, t: (l, k, c) => [[k, l], [-c, ""]] },
  { p: (l, _k, c) => `la différence entre le quadruple de ${l} et ${c}`, t: (l, _k, c) => [[4, l], [-c, ""]] },
  { p: (l, k, c) => `${c} de moins que ${k} fois ${l}`, t: (l, k, c) => [[k, l], [-c, ""]] },
  { p: (l, _k, c) => `le carré de ${l} augmenté de ${c}`, t: (l, _k, c) => [[1, `${l}²`], [c, ""]] },
];

/** Phrases avec parenthèses : k(l ± c). `mot` : « double », « triple », « quadruple ». */
type PhraseParenthese = { p: (l: string, k: number, c: number) => string; moins: boolean; motK: boolean };
const MOT_K: Record<number, string> = { 2: "double", 3: "triple", 4: "quadruple" };
const PHRASES_3: PhraseParenthese[] = [
  { p: (l, k, c) => `le ${MOT_K[k]} de la somme de ${l} et de ${c}`, moins: false, motK: true },
  { p: (l, k, c) => `le ${MOT_K[k]} de la différence entre ${l} et ${c}`, moins: true, motK: true },
  { p: (l, k, c) => `la somme de ${l} et de ${c}, multipliée par ${k}`, moins: false, motK: false },
  { p: (l, k, c) => `le produit de ${k} par la somme de ${l} et de ${c}`, moins: false, motK: false },
  { p: (l, k, c) => `la différence entre ${l} et ${c}, multipliée par ${k}`, moins: true, motK: false },
  { p: (l, k, c) => `${k} fois la somme de ${l} et de ${c}`, moins: false, motK: false },
  { p: (l, k, c) => `${k} fois la différence entre ${l} et ${c}`, moins: true, motK: false },
];

// =========================================================
// RÉDUCTION : des sommes de termes à regrouper.
// =========================================================
/** Tire des termes non réduits : `nl` termes en lettre, `nc` nombres seuls ; résultat sans coefficient nul. */
function tirerReduction(l: string, nl: number, nc: number, premierNegatifPossible: boolean): { termes: Terme[]; reduit: Terme[] } {
  for (let essai = 0; essai < 50; essai++) {
    const termes: Terme[] = [];
    for (let i = 0; i < nl; i++) termes.push([randomInt(1, 9) * (Math.random() < 0.35 ? -1 : 1), l]);
    for (let i = 0; i < nc; i++) termes.push([randomInt(1, 12) * (Math.random() < 0.4 ? -1 : 1), ""]);
    const ordre = melange(termes);
    if (!premierNegatifPossible && ordre[0][0] < 0) ordre[0] = [-ordre[0][0], ordre[0][1]];
    const reduit = regrouper(ordre);
    if (reduit.every(([c]) => c !== 0)) return { termes: ordre, reduit };
  }
  return { termes: [[3, l], [5, ""], [2, l]], reduit: [[5, l], [5, ""]] };
}

const CONSIGNES_REDUIRE: ((E: string) => string)[] = [
  (E) => `Réduis l’expression ${E}.`,
  (E) => `Réduis : ${E}`,
  (E) => `Écris plus simplement ${E}.`,
  (E) => `Donne la forme réduite de ${E}.`,
  (E) => `Simplifie l’écriture de ${E} en regroupant les termes semblables.`,
];

const CONSIGNES_SUBST: ((E: string, l: string, v: number) => string)[] = [
  (E, l, v) => `Calcule ${E} pour ${l} = ${nbT(v)}.`,
  (E, l, v) => `Que vaut ${E} lorsque ${l} = ${nbT(v)} ?`,
  (E, l, v) => `Donne la valeur de l’expression ${E} si ${l} = ${nbT(v)}.`,
  (E, l, v) => `On remplace ${l} par ${nbT(v)} dans ${E}. Quel nombre obtient-on ?`,
  (E, l, v) => `Si ${l} = ${nbT(v)}, combien vaut ${E} ?`,
  (E, l, v) => `Évalue l’expression ${E} pour ${l} = ${nbT(v)}.`,
];

export const expressionsLitteralesBank: TutorBankItemV4[] = [
  // =========================
  // EXPR_LITTERALE_COMPRENDRE
  // =========================
  {
    kind: "fixed",
    id: "litteral_expression_comprendre_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Dans l’expression 3x + 5, quelle est la lettre ?",
    format: "short",
    expected: ["x"],
    comparator: "exact_text",
    hint: "Cherche le symbole qui peut représenter un nombre variable.",
    explanation:
      "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("Dans 3x + 5, la lettre est x. Elle représente une valeur qui peut changer.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["expression", "lettre", "variable"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_comprendre_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Dans l’expression 7a - 2, quel est le coefficient de a ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Le coefficient est le nombre placé devant la lettre.",
    explanation:
      "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("Dans 7a - 2, le coefficient de a est 7, car 7a signifie 7 multiplié par a.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["expression", "coefficient"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_comprendre_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "L’expression 4x + 1 est-elle une expression littérale ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Une expression littérale contient au moins une lettre.",
    explanation:
      "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("Oui, 4x + 1 est une expression littérale, car elle contient la lettre x.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["expression", "reconnaitre"],
  },
    {
    kind: "fixed",
    id: "litteral_expression_comprendre_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_comprendre",
    difficulty: 2,
    theme: "neutral",
    // ⛔ 08/10/2026 : question ouverte à mots-clés → QCM sur les mêmes confusions.
    text: "Dans l’expression 3x + 5, que représente la lettre x ?",
    format: "qcm",
    choices: ["un nombre qui peut changer", "le signe de multiplication", "toujours le nombre 10", "une unité de mesure"],
    expected: ["un nombre qui peut changer"],
    comparator: "mcq_exact",
    hint: "La lettre peut représenter un nombre qui change.",
    explanation:
      "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("Dans une expression littérale, la lettre représente un nombre variable ou inconnu.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["expression", "variable", "open"],
  },
  {
    kind: "template",
    id: "litteral_expression_comprendre_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_comprendre",
    difficulty: 1,
    theme: "neutral",
    hint: "Repère la lettre dans l’expression : c’est elle qui représente un nombre.",
    tags: ["expression", "variable", "template"],
    generate: () => {
      if (Math.random() < 0.4) {
        const { S, a, b, expr } = tirerSituation();
        const t = randomChoice([
          `${S.decrire(a, b)} ${cap(S.grandeur)} s’écrit ${expr}. Quelle lettre désigne ${S.quoi} ?`,
          `${cap(S.grandeur)} est donné${S.g === "f" ? "e" : ""} par l’expression ${expr}. Quelle est la lettre de cette expression ?`,
          `Dans l’expression ${expr}, qui donne ${S.grandeur}, quelle lettre représente un nombre qui peut changer ?`,
        ]);
        return {
          text: t,
          format: "short",
          expected: [S.l],
          comparator: "exact_text",
          explanation:
            DEF_EXPR +
            "Méthode : on cherche le symbole qui n’est pas un nombre et qui peut prendre plusieurs valeurs.\n\n" +
            `Calcul : dans ${expr}, la lettre est ${S.l} ; elle représente ${S.quoi}.\n\n` +
            `Conclusion : la lettre est ${S.l}.`,
        };
      }
      const l = randomChoice(LETTRES);
      const a = randomInt(2, 9);
      const b = randomInt(1, 12);
      const E = randomChoice([
        ecrire([[a, l], [b, ""]]),
        ecrire([[b, ""], [a, l]]),
        ecrire([[a, l], [-b, ""]]),
        ecrire([[b, ""], [-a, l]]),
        `${a} × ${l} + ${b}`,
        ecrire([[1, l], [b, ""]]),
        ecrire([[a, `${l}²`], [b, ""]]),
      ]);
      const consigne = randomChoice([
        `Quelle lettre apparaît dans l’expression ${E} ?`,
        `L’expression ${E} contient une seule lettre. Laquelle ?`,
        `Recopie la lettre de l’expression ${E}.`,
        `Dans ${E}, quelle lettre représente un nombre qui peut changer ?`,
        `Voici une expression littérale : ${E}. Quelle est sa lettre ?`,
      ]);
      return {
        text: consigne,
        format: "short",
        expected: [l],
        comparator: "exact_text",
        explanation:
          DEF_EXPR +
          "Méthode : on cherche le symbole qui n’est pas un nombre.\n\n" +
          `Calcul : dans ${E}, la lettre est ${l}.\n\n` +
          `Conclusion : la lettre est ${l} ; elle représente un nombre qui peut changer.`,
      };
    },
  },

  // =========================
  // EXPR_LITTERALE_TRADUIRE
  // =========================
  {
    kind: "fixed",
    id: "litteral_expression_traduire_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_traduire",
    difficulty: 1,
    theme: "neutral",
    text: "Traduire par une expression littérale : « un nombre x augmenté de 4 »",
    format: "short",
    expected: ["x + 4"],
    comparator: "expression_equivalente",
    hint: "« augmenté de 4 » signifie qu’on ajoute 4.",
    explanation: "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("« Un nombre x augmenté de 4 » se traduit par x + 4.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["traduction", "addition"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_traduire_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_traduire",
    difficulty: 1,
    theme: "neutral",
    text: "Traduire par une expression littérale : « le double de x »",
    format: "short",
    expected: ["2x"],
    comparator: "expression_equivalente",
    hint: "Le double signifie 2 fois.",
    explanation: "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("Le double de x se traduit par 2x.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["traduction", "multiplication"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_traduire_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_traduire",
    difficulty: 2,
    theme: "neutral",
    text: "Traduire par une expression littérale : « le triple de y diminué de 5 »",
    format: "short",
    expected: ["3y − 5"],
    comparator: "expression_equivalente",
    hint: "Le triple de y, puis on enlève 5.",
    explanation: "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("Le triple de y est 3y. Diminué de 5 donne 3y - 5.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["traduction", "soustraction"],
  },
    {
    kind: "fixed",
    id: "litteral_expression_traduire_qcm_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_traduire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle expression traduit : « le double de x augmenté de 5 » ?",
    format: "qcm",
    choices: ["2x + 5", "2(x + 5)", "x + 10", "5x + 2"],
    expected: ["2x + 5"],
    comparator: "mcq_exact",
    hint: "Le double de x est 2x, puis on ajoute 5.",
    explanation: "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("Le double de x augmenté de 5 se traduit par 2x + 5.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["expression", "traduction", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_expression_traduire_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_traduire",
    difficulty: 2,
    theme: "neutral",
    hint: "Traduis la phrase morceau par morceau, dans l’ordre des opérations.",
    tags: ["traduction", "template"],
    generate: () => {
      if (Math.random() < 0.4) {
        const S = randomChoice(SITUATIONS);
        const [a, b] = S.tirer();
        const termes: Terme[] = S.signe === 1 ? [[a, S.l], [b, ""]] : [[b, ""], [-a, S.l]];
        const E = ecrire(termes);
        const text = randomChoice([
          `${S.decrire(a, b)} On note ${S.l} ${S.quoi}. Écris ${S.grandeur} en fonction de ${S.l}.`,
          `${S.decrire(a, b)} Quelle expression donne ${S.grandeur}, si ${S.l} désigne ${S.quoi} ?`,
          `${S.decrire(a, b)} Exprime ${S.grandeur} à l’aide de la lettre ${S.l} (${S.quoi}).`,
        ]);
        return {
          text,
          format: "short",
          expected: [E],
          comparator: "expression_equivalente",
          explanation:
            DEF_TRADUIRE +
            `Méthode : ${S.signe === 1 ? "on ajoute la partie fixe à la partie qui dépend de " + S.l : "on part de la valeur de départ et on retire ce qui change avec " + S.l}.\n\n` +
            `Calcul : ${S.signe === 1 ? `${S.l} fois ${a}, c’est ${ecrire([[a, S.l]])} ; on ajoute ${b}` : `on retire ${a} fois ${S.l}, soit ${ecrire([[a, S.l]])}, à ${b}`}.\n\n` +
            `Conclusion : ${S.grandeur} s’écrit ${E}.`,
        };
      }
      const l = randomChoice(LETTRES);
      const k = randomInt(4, 9);
      const c = randomInt(1, 12);
      const P = randomChoice(PHRASES_2);
      const E = ecrire(P.t(l, k, c));
      return {
        text: randomChoice(TOURNURES_TRADUIRE)(P.p(l, k, c), l),
        format: "short",
        expected: [E],
        comparator: "expression_equivalente",
        explanation:
          DEF_TRADUIRE +
          "Méthode : on traduit chaque morceau de la phrase (double, triple, fois → multiplication ; augmenté, plus → addition ; diminué, moins → soustraction).\n\n" +
          `Calcul : « ${P.p(l, k, c)} » s’écrit ${E}.\n\n` +
          `Conclusion : l’expression est ${E}.`,
      };
    },
  },
    {
    kind: "fixed",
    id: "litteral_expression_traduire_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_traduire",
    difficulty: 2,
    theme: "neutral",
    // ⛔ 08/10/2026 : question ouverte à mots-clés → l’élève écrit l’expression.
    text: "Traduis par une expression littérale : « le triple de x diminué de 4 ».",
    format: "short",
    expected: ["3x - 4"],
    comparator: "expression_equivalente",
    hint: "Traduis séparément « triple » puis « diminué de 4 ».",
    explanation:
      "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("Le triple de x se traduit par 3x. Diminué de 4 signifie qu’on enlève 4, donc on obtient 3x - 4.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["expression", "traduction", "open"],
  },

  // =========================
  // EXPR_LITTERALE_SUBSTITUER
  // =========================
  {
    kind: "fixed",
    id: "litteral_expression_substituer_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_substituer",
    difficulty: 1,
    theme: "neutral",
    text: "Calculer 3x + 2 pour x = 4.",
    format: "short",
    expected: ["14"],
    comparator: "number_equal",
    hint: "Remplace x par 4, puis calcule.",
    explanation: "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("3x + 2 avec x = 4 donne 3 × 4 + 2 = 12 + 2 = 14.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["substitution", "calcul"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_substituer_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_substituer",
    difficulty: 1,
    theme: "neutral",
    text: "Calculer 5a - 1 pour a = 3.",
    format: "short",
    expected: ["14"],
    comparator: "number_equal",
    hint: "Remplace a par 3.",
    explanation: "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("5a - 1 avec a = 3 donne 5 × 3 - 1 = 15 - 1 = 14.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["substitution", "calcul"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_substituer_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_substituer",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer 2x + 3y pour x = 2 et y = 5.",
    format: "short",
    expected: ["19"],
    comparator: "number_equal",
    hint: "Remplace chaque lettre par sa valeur.",
    explanation:
      "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("2x + 3y avec x = 2 et y = 5 donne 2 × 2 + 3 × 5 = 4 + 15 = 19.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["substitution", "deux-lettres"],
  },
    {
    kind: "fixed",
    id: "litteral_expression_substituer_qcm_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_substituer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour calculer 4x + 1 avec x = 3, quel calcul faut-il faire ?",
    format: "qcm",
    choices: ["4 + 3 + 1", "4 × 3 + 1", "4 × 1 + 3", "4x + 3"],
    expected: ["4 × 3 + 1"],
    comparator: "mcq_exact",
    hint: "Remplace x par 3.",
    explanation: "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("On remplace x par 3 : 4x + 1 devient 4 × 3 + 1.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["expression", "substitution", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_expression_substituer_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_substituer",
    difficulty: 2,
    theme: "neutral",
    hint: "Remplace la lettre par sa valeur (entre parenthèses si elle est négative), puis respecte les priorités.",
    tags: ["substitution", "relatif", "template"],
    generate: () => {
      const l = randomChoice(LETTRES);
      const a = randomInt(2, 9);
      const b = randomInt(1, 12);
      const v = randomInt(2, 6) * (Math.random() < 0.6 ? -1 : 1);
      const formes: Terme[][] = [
        [[a, l], [b, ""]],
        [[a, l], [-b, ""]],
        [[b, ""], [-a, l]],
        [[-a, l], [b, ""]],
        [[1, `${l}²`], [b, ""]],
        [[1, `${l}²`], [-b, ""]],
        [[a, `${l}²`]],
        [[1, `${l}²`], [-a, l]],
        [[1, `${l}²`], [a, l], [-b, ""]],
        [[a, l], [b, ""], [-1, `${l}²`]],
      ];
      const termes = randomChoice(formes);
      const E = ecrire(termes);
      const res = valeurTermes(termes, { [l]: v });
      return {
        text: randomChoice(CONSIGNES_SUBST)(E, l, v),
        format: "short",
        expected: [String(res)],
        comparator: "number_equal",
        explanation:
          DEF_SUBST +
          `Méthode : on remplace ${l} par ${parT(v)} ; la puissance d’abord, puis la multiplication, puis l’addition.\n\n` +
          `Calcul : ${detailSubstitution(termes, { [l]: v })}.\n\n` +
          `Conclusion : pour ${l} = ${nbT(v)}, l’expression vaut ${nbT(res)}.`,
      };
    },
  },
    {
    kind: "fixed",
    id: "litteral_expression_substituer_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_substituer",
    difficulty: 3,
    theme: "neutral",
    // ⛔ 08/10/2026 : mots-clés numériques (« 4 », « 3 ») → réponse chiffrée.
    text: "Remplace x par 4 dans 3x + 2. Quel nombre obtient-on ?",
    format: "short",
    expected: ["14"],
    comparator: "number_equal",
    hint: "Remplace x par 4 puis effectue le calcul.",
    explanation:
      "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("On remplace x par 4 : 3x + 2 = 3 × 4 + 2 = 12 + 2 = 14.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["expression", "substitution", "open"],
  },

  // =========================
  // EXPR_LITTERALE_REDUIRE
  // =========================
  {
    kind: "fixed",
    id: "litteral_expression_reduire_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_reduire",
    difficulty: 1,
    theme: "neutral",
    text: "Réduire : 3x + 2x",
    format: "short",
    expected: ["5x"],
    comparator: "expression_developpee",
    hint: "3x et 2x sont des termes de même nature.",
    explanation:
      "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("3x + 2x = 5x, car on additionne les coefficients : 3 + 2 = 5.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["reduction", "termes-semblables"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_reduire_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_reduire",
    difficulty: 1,
    theme: "neutral",
    text: "Réduire : 4a - a",
    format: "short",
    expected: ["3a"],
    comparator: "expression_developpee",
    hint: "Soustraire a revient à soustraire 1a.",
    explanation: "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("4a - a = 4a - 1a = 3a.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["reduction"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_reduire_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_reduire",
    difficulty: 2,
    theme: "neutral",
    text: "Réduire : 2x + 5 + 3x",
    format: "short",
    expected: ["5x + 5"],
    comparator: "expression_developpee",
    hint: "Réunis les termes en x, puis garde le nombre seul.",
    explanation: "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("2x + 5 + 3x = 5x + 5, car 2x + 3x = 5x.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["reduction", "ordre"],
  },
    {
    kind: "fixed",
    id: "litteral_expression_reduire_qcm_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_reduire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle réduction est correcte ?",
    format: "qcm",
    choices: ["2x + 3 = 5x", "2x + 3x = 5x", "2x + 3x = 6x", "2x + 3 = 5"],
    expected: ["2x + 3x = 5x"],
    comparator: "mcq_exact",
    hint: "On peut additionner seulement les termes semblables.",
    explanation:
      "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("2x et 3x sont des termes semblables, donc 2x + 3x = 5x.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["expression", "reduction", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_expression_reduire_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_reduire",
    difficulty: 2,
    theme: "neutral",
    hint: "Regroupe les termes en lettre d’un côté, les nombres seuls de l’autre, en gardant chaque signe avec son terme.",
    tags: ["reduction", "template"],
    generate: () => {
      const l = randomChoice(LETTRES);
      const nl = randomChoice([2, 2, 3]);
      const nc = nl === 3 ? 1 : randomChoice([1, 2]);
      const { termes, reduit } = tirerReduction(l, nl, nc, true);
      const E = ecrire(termes);
      const R = ecrire(reduit);
      const lettres = termes.filter(([, x]) => x);
      const nombres = termes.filter(([, x]) => !x);
      return {
        text: randomChoice(CONSIGNES_REDUIRE)(E),
        format: "short",
        expected: [R],
        comparator: "expression_developpee",
        explanation:
          DEF_REDUIRE +
          `Méthode : on regroupe les termes en ${l}, puis les nombres seuls, chacun avec son signe.\n\n` +
          `Calcul : ${ecrire(lettres)} = ${ecrire(regrouper(lettres))} et ${ecrire(nombres)} = ${ecrire(regrouper(nombres))}.\n\n` +
          `Conclusion : ${E} = ${R}.`,
      };
    },
  },
    {
    kind: "fixed",
    id: "litteral_expression_reduire_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_reduire",
    difficulty: 3,
    theme: "neutral",
    // ⛔ 08/10/2026 : question ouverte à mots-clés → QCM sur le même piège.
    text: "Peut-on réduire 2x + 3 en 5x ?",
    format: "qcm",
    choices: ["non : 2x et 3 ne sont pas des termes semblables", "oui : 2 + 3 = 5", "oui : on ajoute 3 au coefficient de x"],
    expected: ["non : 2x et 3 ne sont pas des termes semblables"],
    comparator: "mcq_exact",
    hint: "Compare 2x et 3 : sont-ils de même nature ?",
    explanation:
      "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("2x contient une lettre, alors que 3 est un nombre seul. Ce ne sont pas des termes semblables, donc on ne peut pas écrire 5x.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["expression", "reduction", "erreur", "open"],
  },

  // =========================
  // EXPR_LITTERALE_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "litteral_expression_defi_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_defi",
    difficulty: 3,
    theme: "neutral",
    // ⛔ 08/10/2026 : question ouverte à mots-clés (« 5x » suffisait) → QCM.
    text: "Pourquoi 3x + 2x peut-il s’écrire 5x ?",
    format: "qcm",
    choices: [
      "3x et 2x sont des termes semblables : 3 fois x plus 2 fois x, c’est 5 fois x",
      "on multiplie 3x par 2x",
      "on additionne toujours les coefficients, même devant des lettres différentes",
    ],
    expected: ["3x et 2x sont des termes semblables : 3 fois x plus 2 fois x, c’est 5 fois x"],
    comparator: "mcq_exact",
    hint: "3x et 2x représentent des quantités de même nature.",
    explanation:
      "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("3x et 2x sont des termes semblables : ils contiennent la même lettre x. On peut donc additionner leurs coefficients : 3 + 2 = 5, donc 3x + 2x = 5x.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["defi", "justification", "reduction"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_defi_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Léa dit que 2x + 3 = 5x. A-t-elle raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Peut-on additionner 2x et 3 ?",
    explanation:
      "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("Non. 2x et 3 ne sont pas des termes semblables. 2x contient une lettre, 3 est un nombre seul. On ne peut pas les additionner en 5x.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["defi", "erreur-frequente"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_defi_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Un vendeur propose x stylos à 2 euros chacun et ajoute 3 euros de frais fixes. Quelle expression donne le prix total ?",
    format: "short",
    expected: ["2x + 3"],
    comparator: "expression_equivalente",
    hint: "Prix des stylos + frais fixes.",
    explanation:
      "Définition : une expression littérale contient des lettres qui représentent des nombres.\n\n" +
          "Méthode : on identifie les termes semblables et on respecte les priorités de calcul.\n\nCalcul : " +
          ("x stylos à 2 euros chacun coûtent 2x euros. Avec 3 euros de frais fixes, le total est 2x + 3.") +
          "\n\nConclusion : l’expression finale respecte les règles du calcul littéral.",
    tags: ["defi", "situation"],
  },
    {
    kind: "template",
    id: "litteral_expression_defi_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Sépare ce qui est fixe de ce qui dépend de la lettre.",
    tags: ["expression", "defi", "qcm", "situation"],
    // ⛔ 08/10/2026 : c’était une question ouverte à mots-clés (« 10 », « 90 », « h ») —
    // toute réponse contenant ces nombres passait. Devenue un QCM sur le même piège :
    // confondre la partie fixe et ce qui change avec la lettre.
    generate: () => {
      const S = randomChoice(SITUATIONS);
      let [a, b] = S.tirer();
      if (a === b) b += S.signe === 1 ? 1 : 5;
      const termes: Terme[] = S.signe === 1 ? [[a, S.l], [b, ""]] : [[b, ""], [-a, S.l]];
      const E = ecrire(termes);
      const surLePas = Math.random() < 0.5;
      const X = surLePas ? a : b;
      const text = randomChoice([
        `${S.decrire(a, b)} On note ${S.l} ${S.quoi} ; ${S.grandeur} s’écrit ${E}. Que représente le nombre ${X} dans cette expression ?`,
        `${S.decrire(a, b)} Lina affirme que ${S.grandeur} vaut ${E}, où ${S.l} est ${S.quoi}. D’où vient le ${X} de son expression ?`,
        `${S.decrire(a, b)} D’où vient le nombre ${X} dans l’expression ${E} ? (${S.l} désigne ${S.quoi}.)`,
      ]);
      const pas = `ce qui ${S.signe === 1 ? "s’ajoute" : "se retire"} chaque fois que ${S.l} augmente de 1`;
      const depart = `la valeur de départ, quand ${S.l} vaut 0`;
      const bon = surLePas ? pas : depart;
      return {
        text,
        format: "qcm",
        choices: melange([pas, depart, `la valeur de ${S.l}`, `le résultat final`]),
        expected: [bon],
        comparator: "mcq_exact",
        explanation:
          DEF_TRADUIRE +
          `Méthode : on sépare la partie fixe (${b}) de la partie qui dépend de ${S.l} (${a} par unité).\n\n` +
          (S.signe === 1
            ? `Calcul : pour ${S.l} unités, la partie variable vaut ${a} × ${S.l} = ${ecrire([[a, S.l]])} ; on ajoute la partie fixe ${b}.\n\n`
            : `Calcul : au départ on a ${b} ; on retire ${a} pour chaque unité, soit ${a} × ${S.l} = ${ecrire([[a, S.l]])}.\n\n`) +
          `Conclusion : le ${X} est ${bon}.`,
      };
    },
  },

  /* =========================================================
     COMPLÉMENTS (top-up ~10 items / microSkill)
  ========================================================= */

  // ---------- LITTERAL_EXPRESSION_COMPRENDRE ----------
  {
    kind: "fixed",
    id: "litteral_expression_comprendre_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Dans l’expression $5x$, que représente le nombre 5 ?",
    format: "qcm",
    choices: ["le coefficient", "la variable", "une constante seule", "l’inconnue"],
    expected: ["le coefficient"],
    comparator: "mcq_exact",
    hint: "C’est le nombre placé devant la lettre.",
    explanation:
      "Définition : le coefficient est le nombre placé devant la lettre.\n\n" +
      "Méthode : on repère le nombre multiplié par la lettre.\n\n" +
      "Calcul : dans $5x$, 5 multiplie x.\n\n" +
      "Conclusion : 5 est le coefficient de x.",
    tags: ["expression", "coefficient", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_comprendre_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Dans l’expression $2x + 7$, quel est le terme constant (le nombre seul) ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "C’est le nombre qui n’est pas multiplié par une lettre.",
    explanation:
      "Définition : un terme constant est un nombre seul, sans lettre.\n\n" +
      "Méthode : on repère le terme sans lettre.\n\n" +
      "Calcul : dans $2x + 7$, le terme constant est 7.\n\n" +
      "Conclusion : le terme constant est 7.",
    tags: ["expression", "constante"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_comprendre_fixed_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Que peut représenter la lettre dans une expression littérale ?",
    format: "qcm",
    choices: [
      "un nombre qui peut changer",
      "toujours le nombre 0",
      "une opération",
      "un signe de calcul",
    ],
    expected: ["un nombre qui peut changer"],
    comparator: "mcq_exact",
    hint: "La lettre remplace un nombre variable ou inconnu.",
    explanation:
      "Définition : dans une expression littérale, la lettre représente un nombre.\n\n" +
      "Méthode : on rappelle le rôle de la variable.\n\n" +
      "Calcul : selon les cas, ce nombre peut prendre différentes valeurs.\n\n" +
      "Conclusion : la lettre représente un nombre qui peut changer.",
    tags: ["expression", "variable", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_expression_comprendre_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_comprendre",
    difficulty: 1,
    theme: "neutral",
    hint: "Le coefficient est le nombre qui multiplie la lettre.",
    tags: ["expression", "coefficient", "template"],
    generate: () => {
      if (Math.random() < 0.4) {
        const { S, a, expr } = tirerSituation((s) => s.signe === 1);
        const text = randomChoice([
          `${cap(S.grandeur)} s’écrit ${expr}, où ${S.l} désigne ${S.quoi}. Quel est le coefficient de ${S.l} ?`,
          `L’expression ${expr} donne ${S.grandeur}. Par quel nombre la lettre ${S.l} est-elle multipliée ?`,
          `Dans l’expression ${expr} (${S.grandeur}), quel nombre multiplie ${S.l} ?`,
        ]);
        return {
          text,
          format: "short",
          expected: [String(a)],
          comparator: "number_equal",
          explanation:
            "Définition : le coefficient est le nombre qui multiplie la lettre.\n\n" +
            `Méthode : on repère le nombre écrit juste devant ${S.l}.\n\n` +
            `Calcul : ${ecrire([[a, S.l]])} signifie ${a} × ${S.l}.\n\n` +
            `Conclusion : le coefficient de ${S.l} est ${a}.`,
        };
      }
      const l = randomChoice(LETTRES);
      const k = randomInt(2, 12);
      const c = randomInt(1, 12);
      const E = randomChoice([
        ecrire([[k, l], [c, ""]]),
        ecrire([[c, ""], [k, l]]),
        ecrire([[k, l], [-c, ""]]),
        `${l} × ${k} + ${c}`,
        `${c} + ${k} × ${l}`,
        ecrire([[k, l]]),
      ]);
      const text = randomChoice([
        `Dans l’expression ${E}, quel est le coefficient de ${l} ?`,
        `Quel nombre multiplie ${l} dans l’expression ${E} ?`,
        `Donne le coefficient de ${l} dans ${E}.`,
        `Par quel nombre ${l} est-il multiplié dans ${E} ?`,
        `Voici l’expression ${E}. Quel est le coefficient de la lettre ${l} ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(k)],
        comparator: "number_equal",
        explanation:
          "Définition : le coefficient est le nombre qui multiplie la lettre.\n\n" +
          `Méthode : on repère le nombre qui multiplie ${l} (${l} × ${k} et ${k}${l} veulent dire la même chose).\n\n` +
          `Calcul : dans ${E}, ${l} est multiplié par ${k}.\n\n` +
          `Conclusion : le coefficient de ${l} est ${k}.`,
      };
    },
  },
  {
    kind: "template",
    id: "litteral_expression_comprendre_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Une expression littérale contient au moins une lettre.",
    tags: ["expression", "reconnaitre", "template"],
    generate: () => {
      const avecLettre = Math.random() < 0.5;
      const l = randomChoice(LETTRES);
      const a = randomInt(2, 9);
      const b = randomInt(1, 12);
      const E = avecLettre
        ? randomChoice([
            ecrire([[a, l], [b, ""]]),
            ecrire([[b, ""], [-a, l]]),
            `${a}(${l} + ${b})`,
            ecrire([[1, `${l}²`], [b, ""]]),
            `${a} × ${l} ${MOINS} ${b}`,
            `(${l} + ${b}) × ${a}`,
            ecrire([[a, l]]),
          ])
        : randomChoice([
            `${a} + ${b}`,
            `${a} × ${b} + 1`,
            `${a + b} ${MOINS} ${a} × 2`,
            `(${a} + 1) × ${b}`,
            `${a}² + ${b}`,
            `${b} ${MOINS} ${a}`,
            `${a} × (${b} + 2)`,
          ]);
      if (Math.random() < 0.5) {
        const text = randomChoice([
          `L’expression ${E} est-elle une expression littérale ?`,
          `${E} : est-ce une expression littérale ?`,
          `Peut-on dire que ${E} est une expression littérale ?`,
        ]);
        return {
          text,
          format: "qcm",
          choices: ["oui", "non"],
          expected: [avecLettre ? "oui" : "non"],
          comparator: "mcq_exact",
          explanation:
            "Définition : une expression littérale contient au moins une lettre.\n\n" +
            "Méthode : on cherche la présence d’une lettre.\n\n" +
            `Calcul : ${E} ${avecLettre ? `contient la lettre ${l}` : "ne contient que des nombres"}.\n\n` +
            `Conclusion : ${avecLettre ? "oui, c’est une expression littérale" : "non, ce n’est qu’un calcul numérique"}.`,
        };
      }
      const text = randomChoice([
        `${E} : expression littérale ou calcul numérique ?`,
        `Comment appelle-t-on l’écriture ${E} ?`,
        `L’écriture ${E} est-elle une expression littérale ou un calcul numérique ?`,
      ]);
      const bon = avecLettre ? "une expression littérale" : "un calcul numérique";
      return {
        text,
        format: "qcm",
        choices: ["une expression littérale", "un calcul numérique"],
        expected: [bon],
        comparator: "mcq_exact",
        explanation:
          "Définition : une expression littérale contient au moins une lettre ; un calcul numérique ne contient que des nombres.\n\n" +
          "Méthode : on cherche la présence d’une lettre.\n\n" +
          `Calcul : ${E} ${avecLettre ? `contient la lettre ${l}` : "ne contient que des nombres"}.\n\n` +
          `Conclusion : c’est ${bon}.`,
      };
    },
  },
  {
    kind: "template",
    id: "litteral_expression_comprendre_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Le coefficient multiplie la lettre, avec son signe ; le terme constant est le nombre seul, avec son signe.",
    tags: ["expression", "coefficient", "constante", "template"],
    generate: () => {
      if (Math.random() < 0.35) {
        const { S, a, b, expr } = tirerSituation();
        const coef = S.signe * a;
        const demandeCoef = Math.random() < 0.5;
        const text = demandeCoef
          ? randomChoice([
              `${S.decrire(a, b)} ${cap(S.grandeur)} s’écrit ${expr}. Quel est le coefficient de ${S.l} ?`,
              `${S.decrire(a, b)} Dans l’expression ${expr}, quel nombre multiplie ${S.l} (avec son signe) ?`,
            ])
          : randomChoice([
              `${S.decrire(a, b)} ${cap(S.grandeur)} s’écrit ${expr}. Quel est le terme constant de cette expression ?`,
              `${S.decrire(a, b)} Dans l’expression ${expr}, quel nombre ne dépend pas de ${S.l} ?`,
            ]);
        return {
          text,
          format: "short",
          expected: [String(demandeCoef ? coef : b)],
          comparator: "number_equal",
          explanation:
            "Définition : le coefficient multiplie la lettre ; le terme constant est le nombre seul.\n\n" +
            `Méthode : on lit ${expr} terme par terme, chacun avec son signe.\n\n` +
            `Calcul : ${S.signe === 1 ? `${ecrire([[a, S.l]])} = ${a} × ${S.l}` : `${b} ${MOINS} ${ecrire([[a, S.l]])} = ${b} + (${MOINS}${a}) × ${S.l}`} ; le nombre seul est ${b}.\n\n` +
            `Conclusion : ${demandeCoef ? `le coefficient de ${S.l} est ${nbT(coef)}` : `le terme constant est ${b}`}.`,
        };
      }
      const l = randomChoice(LETTRES);
      const k = randomInt(2, 9) * (Math.random() < 0.5 ? -1 : 1);
      const c = randomInt(1, 12) * (Math.random() < 0.5 ? -1 : 1);
      const termes: Terme[] = Math.random() < 0.5 ? [[k, l], [c, ""]] : [[c, ""], [k, l]];
      const E = ecrire(termes);
      const demandeCoef = Math.random() < 0.5;
      const text = demandeCoef
        ? randomChoice([
            `Dans l’expression ${E}, quel est le coefficient de ${l} (avec son signe) ?`,
            `Quel est le coefficient de ${l} dans ${E} ?`,
            `Donne le nombre qui multiplie ${l} dans ${E}.`,
          ])
        : randomChoice([
            `Dans l’expression ${E}, quel est le terme constant (avec son signe) ?`,
            `Quel est le nombre seul, sans lettre, de l’expression ${E} ?`,
            `Donne le terme constant de ${E}.`,
          ]);
      return {
        text,
        format: "short",
        expected: [String(demandeCoef ? k : c)],
        comparator: "number_equal",
        explanation:
          "Définition : le coefficient multiplie la lettre ; le terme constant est le nombre seul. Chacun garde le signe écrit devant lui.\n\n" +
          `Méthode : on écrit ${E} comme une somme : ${termes.map(([cc, ll]) => (ll ? `(${nbT(cc)}) × ${ll}` : `(${nbT(cc)})`)).join(" + ")}.\n\n` +
          `Calcul : le coefficient de ${l} est ${nbT(k)} ; le terme constant est ${nbT(c)}.\n\n` +
          `Conclusion : la réponse est ${nbT(demandeCoef ? k : c)}.`,
      };
    },
  },

  // ---------- LITTERAL_EXPRESSION_TRADUIRE ----------
  {
    kind: "fixed",
    id: "litteral_expression_traduire_qcm_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_traduire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle expression traduit « la somme de x et de y » ?",
    format: "qcm",
    choices: ["$x + y$", "$x \\times y$", "$x - y$", "$xy + 2$"],
    expected: ["$x + y$"],
    comparator: "mcq_exact",
    hint: "« somme » signifie addition.",
    explanation:
      "Définition : traduire une phrase, c’est l’écrire avec des symboles mathématiques.\n\n" +
      "Méthode : « somme » correspond à l’addition.\n\n" +
      "Calcul : la somme de x et y est $x + y$.\n\n" +
      "Conclusion : l’expression est $x + y$.",
    tags: ["traduction", "addition", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_traduire_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_traduire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle expression traduit « le produit de 5 par n » ?",
    format: "qcm",
    choices: ["$5n$", "$5 + n$", "$n - 5$", "$n^5$"],
    expected: ["$5n$"],
    comparator: "mcq_exact",
    hint: "« produit » signifie multiplication.",
    explanation:
      "Définition : « produit » correspond à la multiplication.\n\n" +
      "Méthode : on multiplie 5 par n.\n\n" +
      "Calcul : $5 \\times n = 5n$.\n\n" +
      "Conclusion : l’expression est $5n$.",
    tags: ["traduction", "multiplication", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_expression_traduire_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_traduire",
    difficulty: 2,
    theme: "neutral",
    hint: "Traduis d’abord la multiplication (double, triple, fois), puis l’addition ou la soustraction.",
    tags: ["traduction", "qcm", "template"],
    generate: () => {
      const l = randomChoice(LETTRES);
      const k = randomInt(4, 9);
      const c = randomInt(1, 12);
      const P = randomChoice(PHRASES_2.filter((p) => !p.p("x", 4, 1).includes("carré")));
      const termes = P.t(l, k, c);
      const A = termes.find(([, x]) => x)![0];
      const C = termes.find(([, x]) => !x)![0];
      const correct = ecrire(termes);
      const absA = Math.abs(A);
      const absC = Math.abs(C);
      const choices = choixQcm(correct, [
        C > 0 ? `${absA}(${l} + ${absC})` : `${absA}(${l} ${MOINS} ${absC})`,
        // ⛔ 08/10 (correcteur) : coefficients échangés = la bonne réponse quand |A| = |C| (« 2 moins le double de t »).
        ...(absA === absC ? [] : [ecrire([[Math.sign(A) * absC, l], [Math.sign(C) * absA, ""]])]),
        ecrire([[1, l], [A + C, ""]]),
        ecrire([[A, l], [-C, ""]]),
        ecrire([[A + C, l]]),
        ecrire([[A + 1, l], [C, ""]]),
      ]);
      const text = randomChoice([
        `Quelle expression traduit « ${P.p(l, k, c)} » ?`,
        `Parmi ces expressions, laquelle correspond à « ${P.p(l, k, c)} » ?`,
        `« ${P.p(l, k, c)} » : quelle est la bonne traduction ?`,
        `On note ${l} un nombre. Quelle écriture correspond à « ${P.p(l, k, c)} » ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          DEF_TRADUIRE +
          "Méthode : on traduit d’abord la multiplication, puis on ajoute ou on retire le nombre.\n\n" +
          `Calcul : « ${P.p(l, k, c)} » s’écrit ${correct}.\n\n` +
          `Conclusion : l’expression est ${correct}.`,
      };
    },
  },
  {
    kind: "template",
    id: "litteral_expression_traduire_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_traduire",
    difficulty: 3,
    theme: "neutral",
    hint: "« le … de la somme (ou de la différence) » : la somme se met entre parenthèses.",
    tags: ["traduction", "parentheses", "qcm", "template"],
    generate: () => {
      const l = randomChoice(LETTRES);
      const P = randomChoice(PHRASES_3);
      const k = P.motK ? randomInt(2, 4) : randomInt(3, 9);
      const c = randomInt(1, 9);
      const op = P.moins ? MOINS : "+";
      const correct = `${k}(${l} ${op} ${c})`;
      const phrase = P.p(l, k, c);
      const choices = choixQcm(correct, [
        `${k}${l} ${op} ${c}`,
        `${l} ${op} ${k} × ${c}`,
        `${k} + ${l} ${op} ${c}`,
        `${l}(${k} ${op} ${c})`,
      ]);
      const text = randomChoice([
        `Quelle expression traduit « ${phrase} » ?`,
        `Parmi ces écritures, laquelle correspond à « ${phrase} » ?`,
        `« ${phrase} » : quelle est la bonne traduction ?`,
        `La lettre ${l} désigne un nombre. Quelle expression correspond à « ${phrase} » ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : quand on multiplie une somme (ou une différence), on la met entre parenthèses.\n\n" +
          `Méthode : on écrit d’abord ${l} ${op} ${c} entre parenthèses, puis on multiplie par ${k}.\n\n` +
          `Calcul : on obtient ${correct} (sans parenthèses, ${k}${l} ${op} ${c} ne multiplierait que ${l}).\n\n` +
          `Conclusion : l’expression est ${correct}.`,
      };
    },
  },

  // ---------- LITTERAL_EXPRESSION_SUBSTITUER ----------
  {
    kind: "fixed",
    id: "litteral_expression_substituer_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_substituer",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer $2x + 5$ pour $x = -3$.",
    format: "short",
    expected: ["-1"],
    comparator: "number_equal",
    hint: "Remplace x par -3, attention au signe.",
    explanation:
      "Définition : substituer, c’est remplacer la lettre par sa valeur.\n\n" +
      "Méthode : on remplace x par -3 puis on calcule.\n\n" +
      "Calcul : $2 \\times (-3) + 5 = -6 + 5 = -1$.\n\n" +
      "Conclusion : le résultat est -1.",
    tags: ["substitution", "relatif"],
  },
  {
    kind: "template",
    id: "litteral_expression_substituer_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_substituer",
    difficulty: 2,
    theme: "neutral",
    hint: "Remplace la lettre par la valeur donnée, puis calcule.",
    tags: ["substitution", "situation", "template"],
    generate: () => {
      const S = randomChoice(SITUATIONS);
      const [a, b] = S.tirer();
      const termes: Terme[] = S.signe === 1 ? [[a, S.l], [b, ""]] : [[b, ""], [-a, S.l]];
      const E = ecrire(termes);
      const v = S.valeur(a, b);
      const res = valeurTermes(termes, { [S.l]: v });
      const text = randomChoice([
        `${S.decrire(a, b)} On note ${S.l} ${S.quoi} ; ${S.grandeur} vaut alors ${E}. ${S.question(v)}`,
        `${S.decrire(a, b)} L’expression ${E} donne ${S.grandeur}, où ${S.l} est ${S.quoi}. ${S.question(v)}`,
        `${cap(S.grandeur)} est donné${S.g === "f" ? "e" : ""} par ${E}, où ${S.l} désigne ${S.quoi}. Calcule-${S.g === "f" ? "la" : "le"} pour ${S.l} = ${v}.`,
        `${S.decrire(a, b)} ${S.question(v)} Utilise l’expression ${E}, où ${S.l} est ${S.quoi}.`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(res)],
        comparator: "number_equal",
        explanation:
          DEF_SUBST +
          `Méthode : on remplace ${S.l} par ${v} dans ${E}.\n\n` +
          `Calcul : ${detailSubstitution(termes, { [S.l]: v })}.\n\n` +
          `Conclusion : ${S.grandeur} vaut ${res} ${S.unite}.`,
      };
    },
  },
  {
    kind: "template",
    id: "litteral_expression_substituer_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_substituer",
    difficulty: 3,
    theme: "neutral",
    hint: "Remplace chaque lettre par sa valeur (entre parenthèses si elle est négative).",
    tags: ["substitution", "deux_lettres", "template"],
    generate: () => {
      if (Math.random() < 0.3) {
        // deux lettres en situation
        const ctx = randomChoice([
          { l1: "a", l2: "e", d: (p: number, q: number) => `Au cinéma, une place adulte coûte ${p} € et une place enfant ${q} €. On note a le nombre d’adultes et e le nombre d’enfants.`, P: () => randomInt(9, 13), Q: () => randomInt(5, 8), v1: () => randomInt(1, 4), v2: () => randomInt(2, 5), quoi: "le prix total (en €)" },
          { l1: "c", l2: "s", d: (p: number, q: number) => `Une boulangerie vend des croissants à ${p} € et des sandwichs à ${q} €. On note c le nombre de croissants et s le nombre de sandwichs.`, P: () => randomInt(1, 2), Q: () => randomInt(4, 7), v1: () => randomInt(3, 10), v2: () => randomInt(2, 5), quoi: "le montant de la commande (en €)" },
          { l1: "p", l2: "d", d: (p: number, q: number) => `Au basket, un panier vaut ${p} points et un panier lointain ${q} points. On note p le nombre de paniers à ${p} points et d le nombre de paniers à ${q} points.`, P: () => 2, Q: () => 3, v1: () => randomInt(8, 20), v2: () => randomInt(2, 9), quoi: "le score de l’équipe" },
          { l1: "g", l2: "t", d: (p: number, q: number) => `Une jardinerie vend des sacs de terreau à ${p} € et des pots de fleurs à ${q} €. On note g le nombre de sacs et t le nombre de pots.`, P: () => randomInt(6, 12), Q: () => randomInt(2, 5), v1: () => randomInt(2, 6), v2: () => randomInt(3, 10), quoi: "le montant des achats (en €)" },
          { l1: "v", l2: "b", d: (p: number, q: number) => `Un magasin de sport loue des vélos à ${p} € la journée et des casques à ${q} €. On note v le nombre de vélos et b le nombre de casques.`, P: () => randomInt(12, 20), Q: () => randomInt(2, 4), v1: () => randomInt(2, 6), v2: () => randomInt(1, 6), quoi: "le prix de la location (en €)" },
        ]);
        const p = ctx.P(), q = ctx.Q(), v1 = ctx.v1(), v2 = ctx.v2();
        const termes: Terme[] = [[p, ctx.l1], [q, ctx.l2]];
        const E = ecrire(termes);
        const vals = { [ctx.l1]: v1, [ctx.l2]: v2 };
        const res = valeurTermes(termes, vals);
        return {
          text: `${ctx.d(p, q)} ${cap(ctx.quoi)} est ${E}. ${randomChoice([
            `Calcule-le pour ${ctx.l1} = ${v1} et ${ctx.l2} = ${v2}.`,
            `Que vaut-il pour ${ctx.l1} = ${v1} et ${ctx.l2} = ${v2} ?`,
            `Donne sa valeur pour ${ctx.l1} = ${v1} et ${ctx.l2} = ${v2}.`,
          ])}`,
          format: "short",
          expected: [String(res)],
          comparator: "number_equal",
          explanation:
            DEF_SUBST +
            `Méthode : on remplace ${ctx.l1} par ${v1} et ${ctx.l2} par ${v2}.\n\n` +
            `Calcul : ${detailSubstitution(termes, vals)}.\n\n` +
            `Conclusion : ${ctx.quoi} vaut ${res}.`,
        };
      }
      const [l1, l2] = randomChoice([["x", "y"], ["a", "b"], ["m", "n"], ["s", "t"], ["u", "v"]]);
      const a = randomInt(2, 7);
      const b = randomInt(2, 7);
      const x = randomInt(1, 6) * (Math.random() < 0.4 ? -1 : 1);
      const y = randomInt(1, 6) * (Math.random() < 0.4 ? -1 : 1);
      const c = randomInt(1, 9);
      const formes: Terme[][] = [
        [[a, l1], [b, l2]],
        [[a, l1], [-b, l2]],
        [[1, `${l1}${l2}`], [c, ""]],
        [[1, `${l1}²`], [b, l2]],
        [[a, l1], [-1, `${l1}${l2}`]],
        [[-a, l1], [b, l2], [c, ""]],
        [[a, `${l1}${l2}`]],
        [[1, `${l1}²`], [-1, `${l2}²`]],
      ];
      const termes = randomChoice(formes);
      const E = ecrire(termes);
      const vals = { [l1]: x, [l2]: y };
      const res = valeurTermes(termes, vals);
      const text = randomChoice([
        `Calcule ${E} pour ${l1} = ${nbT(x)} et ${l2} = ${nbT(y)}.`,
        `Que vaut ${E} lorsque ${l1} = ${nbT(x)} et ${l2} = ${nbT(y)} ?`,
        `On donne ${l1} = ${nbT(x)} et ${l2} = ${nbT(y)}. Calcule la valeur de ${E}.`,
        `Si ${l1} = ${nbT(x)} et ${l2} = ${nbT(y)}, combien vaut ${E} ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(res)],
        comparator: "number_equal",
        explanation:
          DEF_SUBST +
          `Méthode : on remplace ${l1} par ${parT(x)} et ${l2} par ${parT(y)}, puis on respecte les priorités.\n\n` +
          `Calcul : ${detailSubstitution(termes, vals)}.\n\n` +
          `Conclusion : l’expression vaut ${nbT(res)}.`,
      };
    },
  },
  {
    kind: "template",
    id: "litteral_expression_substituer_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_substituer",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule d’abord ce qui est entre parenthèses, puis la multiplication.",
    tags: ["substitution", "parentheses", "template"],
    generate: () => {
      const l = randomChoice(LETTRES);
      const k = randomInt(2, 6);
      const c = randomInt(1, 7);
      const d = randomInt(1, 5);
      const v = randomInt(1, 6) * (Math.random() < 0.5 ? -1 : 1);
      const formes: { E: string; f: (x: number) => number; detail: (x: number) => string }[] = [
        { E: `${k}(${l} + ${c})`, f: (x) => k * (x + c), detail: (x) => `${k} × (${nbT(x)} + ${c}) = ${k} × ${parT(x + c)}` },
        { E: `${k}(${l} ${MOINS} ${c})`, f: (x) => k * (x - c), detail: (x) => `${k} × (${nbT(x)} ${MOINS} ${c}) = ${k} × ${parT(x - c)}` },
        { E: `${MOINS}${k}(${l} + ${c})`, f: (x) => -k * (x + c), detail: (x) => `${MOINS}${k} × (${nbT(x)} + ${c}) = ${MOINS}${k} × ${parT(x + c)}` },
        { E: `(${l} + ${c})(${l} ${MOINS} ${d})`, f: (x) => (x + c) * (x - d), detail: (x) => `(${nbT(x)} + ${c}) × (${nbT(x)} ${MOINS} ${d}) = ${parT(x + c)} × ${parT(x - d)}` },
        { E: `(${l} ${MOINS} ${c})²`, f: (x) => (x - c) ** 2, detail: (x) => `(${nbT(x)} ${MOINS} ${c})² = ${parT(x - c)}²` },
        { E: `${l}(${l} + ${c})`, f: (x) => x * (x + c), detail: (x) => `${parT(x)} × (${nbT(x)} + ${c}) = ${parT(x)} × ${parT(x + c)}` },
        { E: `${k * c + d} ${MOINS} ${k}(${l} + ${d})`, f: (x) => k * c + d - k * (x + d), detail: (x) => `${k * c + d} ${MOINS} ${k} × (${nbT(x)} + ${d}) = ${k * c + d} ${MOINS} ${k} × ${parT(x + d)}` },
        { E: `${k}(${c} ${MOINS} ${l}) + ${d}`, f: (x) => k * (c - x) + d, detail: (x) => `${k} × (${c} ${MOINS} ${parT(x)}) + ${d} = ${k} × ${parT(c - x)} + ${d}` },
      ];
      const F = randomChoice(formes);
      const res = F.f(v);
      return {
        text: randomChoice(CONSIGNES_SUBST)(F.E, l, v),
        format: "short",
        expected: [String(res)],
        comparator: "number_equal",
        explanation:
          DEF_SUBST +
          `Méthode : on remplace ${l} par ${parT(v)}, on calcule d’abord les parenthèses, puis la puissance ou la multiplication.\n\n` +
          `Calcul : ${F.detail(v)} = ${nbT(res)}.\n\n` +
          `Conclusion : pour ${l} = ${nbT(v)}, ${F.E} vaut ${nbT(res)}.`,
      };
    },
  },

  // ---------- LITTERAL_EXPRESSION_REDUIRE ----------
  {
    kind: "fixed",
    id: "litteral_expression_reduire_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_reduire",
    difficulty: 2,
    theme: "neutral",
    text: "Réduire $5x - 2x$.",
    format: "qcm",
    choices: ["$3x$", "$7x$", "$3$", "$10x$"],
    expected: ["$3x$"],
    comparator: "mcq_exact",
    hint: "On soustrait les coefficients.",
    explanation:
      "Définition : on réduit en additionnant ou soustrayant les coefficients des termes semblables.\n\n" +
      "Méthode : $5x$ et $2x$ sont semblables.\n\n" +
      "Calcul : $5 - 2 = 3$, donc $5x - 2x = 3x$.\n\n" +
      "Conclusion : la forme réduite est $3x$.",
    tags: ["reduction", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_reduire_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_reduire",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle expression ne peut PAS être réduite davantage ?",
    format: "qcm",
    choices: ["$3x + 2$", "$3x + 2x$", "$x + 4x$", "$2a + 3a$"],
    expected: ["$3x + 2$"],
    comparator: "mcq_exact",
    hint: "On ne peut réduire que des termes semblables.",
    explanation:
      "Définition : on ne réduit que des termes semblables (même lettre).\n\n" +
      "Méthode : on cherche l’expression dont les termes ne sont pas semblables.\n\n" +
      "Calcul : $3x$ et $2$ ne sont pas semblables ; les autres se réduisent.\n\n" +
      "Conclusion : $3x + 2$ ne peut pas être réduite.",
    tags: ["reduction", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_expression_reduire_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_reduire",
    difficulty: 2,
    theme: "neutral",
    hint: "Regroupe les termes en lettre, puis les nombres seuls : on n’ajoute jamais un nombre seul à un terme en lettre.",
    tags: ["reduction", "qcm", "template"],
    generate: () => {
      const l = randomChoice(LETTRES);
      const { termes, reduit } = tirerReduction(l, randomChoice([2, 3]), 1, true);
      const E = ecrire(termes);
      const correct = ecrire(reduit);
      const A = reduit[0][0];
      const C = reduit[1][0];
      const sommeAbs = termes.filter(([, x]) => x).reduce((s, [c]) => s + Math.abs(c), 0);
      const choices = choixQcm(correct, [
        ecrire([[A + C, l]]),
        ecrire([[sommeAbs, l], [C, ""]]),
        ecrire([[A, l], [-C, ""]]),
        ecrire([[-A, l], [C, ""]]),
        ecrire([[A + 1, l], [C, ""]]),
      ]);
      const text = randomChoice([
        `Quelle est la forme réduite de ${E} ?`,
        `On réduit ${E}. Quel résultat obtient-on ?`,
        `Parmi ces expressions, laquelle est égale à ${E} et réduite ?`,
        `${E} = ?  Choisis la bonne réduction.`,
      ]);
      const lettres = termes.filter(([, x]) => x);
      return {
        text,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          DEF_REDUIRE +
          `Méthode : on regroupe les termes en ${l}, chacun avec son signe ; le nombre seul reste à part.\n\n` +
          `Calcul : ${ecrire(lettres)} = ${ecrire([[A, l]])}, donc ${E} = ${correct}.\n\n` +
          `Conclusion : la forme réduite est ${correct}.`,
      };
    },
  },
  {
    kind: "template",
    id: "litteral_expression_reduire_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_reduire",
    difficulty: 3,
    theme: "neutral",
    hint: "On regroupe séparément chaque partie littérale : les x ensemble, les y ensemble (ou les x² ensemble).",
    tags: ["reduction", "deux_lettres", "qcm", "template"],
    generate: () => {
      const [p1, p2] = randomChoice([["x", "y"], ["a", "b"], ["m", "n"], ["x", "x²"], ["a", "a²"], ["t", "t²"], ["s", "t"]]);
      const a = randomInt(2, 8);
      const b = randomInt(1, 6) * (Math.random() < 0.4 ? -1 : 1);
      const c = randomInt(2, 7);
      const d = randomInt(1, 6) * (Math.random() < 0.4 ? -1 : 1);
      let termes: Terme[] = melange<Terme>([[a, p1], [b, p1], [c, p2], [d, p2]]);
      if (termes[0][0] < 0) termes = [termes[1], termes[0], termes[2], termes[3]];
      let reduit = regrouper(termes);
      if (reduit.some(([k]) => k === 0)) {
        termes = [[a, p1], [c, p2], [Math.abs(b), p1]];
        reduit = regrouper(termes);
      }
      const ordre: Terme[] = [reduit.find(([, x]) => x === p1)!, reduit.find(([, x]) => x === p2)!];
      const correct = ecrire(ordre);
      const A = ordre[0][0];
      const B = ordre[1][0];
      const choices = choixQcm(correct, [
        p2.endsWith("²") ? ecrire([[A + B, `${p1}³`]]) : ecrire([[A + B, `${p1}${p2}`]]),
        ecrire([[A + B, p1]]),
        ecrire([[A, p1], [-B, p2]]),
        ecrire([[B, p1], [A, p2]]),
        ecrire([[A + 1, p1], [B, p2]]),
      ]);
      const E = ecrire(termes);
      return {
        text: randomChoice([
          `Réduis ${E}.`,
          `Quelle est la forme réduite de ${E} ?`,
          `On regroupe les termes semblables de ${E}. Que trouve-t-on ?`,
          `${E} est égale à :`,
        ]),
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          DEF_REDUIRE +
          `Méthode : ${p1} et ${p2} ne sont pas semblables : on regroupe les termes en ${p1}, puis ceux en ${p2}.\n\n` +
          `Calcul : ${ecrire(termes.filter(([, x]) => x === p1))} = ${ecrire([[A, p1]])} et ${ecrire(termes.filter(([, x]) => x === p2))} = ${ecrire([[B, p2]])}.\n\n` +
          `Conclusion : la forme réduite est ${correct}.`,
      };
    },
  },

  // ---------- LITTERAL_EXPRESSION_DEFIS ----------
  {
    kind: "fixed",
    id: "litteral_expression_defi_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un carré a un côté de longueur $c$. Quelle expression donne son périmètre ?",
    format: "qcm",
    choices: ["$4c$", "$c^2$", "$2c$", "$c + 4$"],
    expected: ["$4c$"],
    comparator: "mcq_exact",
    hint: "Le périmètre est la somme des quatre côtés.",
    explanation:
      "Définition : le périmètre d’un carré est la somme de ses quatre côtés égaux.\n\n" +
      "Méthode : on additionne quatre fois le côté.\n\n" +
      "Calcul : $c + c + c + c = 4c$.\n\n" +
      "Conclusion : le périmètre est $4c$.",
    tags: ["defi", "perimetre", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_defi_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un rectangle a une longueur $L$ et une largeur $\\ell$. Quelle expression donne son périmètre ?",
    format: "qcm",
    choices: ["$2(L + \\ell)$", "$L \\times \\ell$", "$L + \\ell$", "$2L \\times 2\\ell$"],
    expected: ["$2(L + \\ell)$"],
    comparator: "mcq_exact",
    hint: "On additionne deux longueurs et deux largeurs.",
    explanation:
      "Définition : le périmètre d’un rectangle est la somme de ses quatre côtés.\n\n" +
      "Méthode : il y a deux longueurs et deux largeurs.\n\n" +
      "Calcul : $L + \\ell + L + \\ell = 2L + 2\\ell = 2(L + \\ell)$.\n\n" +
      "Conclusion : le périmètre est $2(L + \\ell)$.",
    tags: ["defi", "perimetre", "qcm"],
  },
  {
    kind: "fixed",
    id: "litteral_expression_defi_fixed_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève écrit $3x \\times 2 = 5x$. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Multiplier par 2, ce n’est pas additionner.",
    explanation:
      "Définition : multiplier $3x$ par 2 multiplie le coefficient.\n\n" +
      "Méthode : $3x \\times 2 = (3 \\times 2)x$.\n\n" +
      "Calcul : $3x \\times 2 = 6x$, pas $5x$.\n\n" +
      "Conclusion : non, le résultat correct est $6x$.",
    tags: ["defi", "erreur", "qcm"],
  },
  {
    kind: "template",
    id: "litteral_expression_defi_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Écris d’abord l’expression (partie fixe + partie qui dépend de la lettre), puis remplace la lettre.",
    tags: ["defi", "situation", "substitution", "template"],
    generate: () => {
      const S = randomChoice(SITUATIONS);
      const [a, b] = S.tirer();
      const termes: Terme[] = S.signe === 1 ? [[a, S.l], [b, ""]] : [[b, ""], [-a, S.l]];
      const E = ecrire(termes);
      const v = S.valeur(a, b);
      const res = valeurTermes(termes, { [S.l]: v });
      const text = randomChoice([
        `${S.decrire(a, b)} On note ${S.l} ${S.quoi}. Écris ${S.grandeur} en fonction de ${S.l}, puis donne sa valeur pour ${S.l} = ${v}.`,
        `${S.decrire(a, b)} Sans aide, écris l’expression qui donne ${S.grandeur} en fonction de ${S.l} (${S.quoi}). ${S.question(v)}`,
        `${S.decrire(a, b)} ${S.question(v)} Pour t’aider, exprime d’abord ${S.grandeur} à l’aide de ${S.l}, ${S.quoi}.`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(res)],
        comparator: "number_equal",
        explanation:
          DEF_SUBST +
          `Méthode : ${S.grandeur} s’écrit ${E} ; on remplace ${S.l} par ${v}.\n\n` +
          `Calcul : ${detailSubstitution(termes, { [S.l]: v })}.\n\n` +
          `Conclusion : ${S.grandeur} vaut ${res} ${S.unite}.`,
      };
    },
  },
  {
    kind: "template",
    id: "litteral_expression_defi_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Traduis la relation par une expression, puis remplace la lettre par sa valeur.",
    tags: ["defi", "situation", "substitution", "template"],
    generate: () => {
      const ctx = randomChoice([
        { p1: "Marie", p2: "Son frère", verbe: "a", u: "ans", mult: false, v: () => randomInt(8, 16) },
        { p1: "Hugo", p2: "Lina", verbe: "a", u: "billes", mult: true, v: () => randomInt(10, 40) },
        { p1: "Inès", p2: "Sa cousine", verbe: "possède", u: "timbres", mult: true, v: () => randomInt(15, 60) },
        { p1: "Jade", p2: "Malo", verbe: "a lu", u: "livres", mult: true, v: () => randomInt(4, 15) },
        { p1: "L’équipe de Yanis", p2: "L’équipe adverse", verbe: "a marqué", u: "points", mult: true, v: () => randomInt(20, 45) },
        { p1: "Léon", p2: "Emma", verbe: "a parcouru à vélo", u: "kilomètres", mult: true, v: () => randomInt(5, 25) },
        { p1: "Chloé", p2: "Adam", verbe: "a économisé", u: "euros", mult: true, v: () => randomInt(12, 50) },
        { p1: "Nathan", p2: "Sofia", verbe: "a", u: "cartes", mult: true, v: () => randomInt(10, 40) },
      ]);
      // ⛔ 08/10 (relecture) : pas la lettre « a » — « Marie a a ans » se lit mal.
      const l = randomChoice(["x", "n", "p", "k"]);
      const c = randomInt(2, 9);
      const v = ctx.v() + c;
      const relations = [
        { r: `${c} ${ctx.u} de plus que ${ctx.p1.replace(/^L’/, "l’")}`, t: [[1, l], [c, ""]] as Terme[] },
        { r: `${c} ${ctx.u} de moins que ${ctx.p1.replace(/^L’/, "l’")}`, t: [[1, l], [-c, ""]] as Terme[] },
        ...(ctx.mult
          ? [
              { r: `le double de ce nombre, augmenté de ${c}`, t: [[2, l], [c, ""]] as Terme[] },
              { r: `le triple de ce nombre, diminué de ${c}`, t: [[3, l], [-c, ""]] as Terme[] },
              { r: `${c} ${ctx.u} de moins que le double de ce nombre`, t: [[2, l], [-c, ""]] as Terme[] },
              { r: `le double de ce nombre`, t: [[2, l]] as Terme[] },
            ]
          : []),
      ];
      const R = randomChoice(relations);
      const E = ecrire(R.t);
      const res = valeurTermes(R.t, { [l]: v });
      const unite = ctx.u;
      const debut = `${ctx.p1} ${ctx.verbe} ${l} ${ctx.u}. ${ctx.p2} ${ctx.verbe} ${R.r}, soit ${E} ${unite}.`;
      const text = randomChoice([
        `${debut} Si ${l} = ${v}, combien de ${unite} cela fait-il pour ${/^(Son|Sa|L’)/.test(ctx.p2) ? ctx.p2.charAt(0).toLowerCase() + ctx.p2.slice(1) : ctx.p2} ?`,
        `${debut} Calcule ce nombre lorsque ${l} = ${v}.`,
        `${debut} Que vaut ${E} quand ${l} = ${v} ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(res)],
        comparator: "number_equal",
        explanation:
          DEF_SUBST +
          `Méthode : la relation s’écrit ${E} ; on remplace ${l} par ${v}.\n\n` +
          `Calcul : ${detailSubstitution(R.t, { [l]: v })}.\n\n` +
          `Conclusion : cela fait ${res} ${unite}.`,
      };
    },
  },
  {
    kind: "fixed",
    id: "litteral_expression_defi_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_defi",
    difficulty: 5,
    theme: "neutral",
    // ⛔ 08/10/2026 : mots-clés numériques (« 4 », « 7 ») → QCM sur la même confusion.
    text: "Dans l’expression $4x + 7$, quel est le rôle de 4 et de 7 ?",
    format: "qcm",
    choices: [
      "4 est le coefficient de x ; 7 est le terme constant",
      "7 est le coefficient de x ; 4 est le terme constant",
      "4 et 7 sont tous les deux des coefficients de x",
      "4 + 7 = 11 est le coefficient de x",
    ],
    expected: ["4 est le coefficient de x ; 7 est le terme constant"],
    comparator: "mcq_exact",
    hint: "L’un est devant la lettre, l’autre est un nombre seul.",
    explanation:
      "Définition : le coefficient est le nombre devant la lettre ; le terme constant est un nombre seul.\n\n" +
      "Méthode : on repère chaque rôle dans $4x + 7$.\n\n" +
      "Calcul : 4 est le coefficient de x, 7 est le terme constant.\n\n" +
      "Conclusion : 4 multiplie x, tandis que 7 ne dépend pas de x.",
    tags: ["defi", "open"],
  },

  /* =========================================================
     GABARITS AJOUTÉS LE 03/10/2026 — une étoile servie = au moins
     un générateur riche (forme × consigne × situation).
  ========================================================= */

  // ---------- TRADUIRE ★1 : phrases à une étape ----------
  {
    kind: "template",
    id: "litteral_expression_traduire_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_traduire",
    difficulty: 1,
    theme: "neutral",
    hint: "Double → 2 fois ; augmenté de → + ; diminué de → − ; produit → ×.",
    tags: ["traduction", "template"],
    generate: () => {
      const l = randomChoice(LETTRES);
      const k = randomInt(5, 9);
      const c = randomInt(1, 15);
      const P = randomChoice(PHRASES_1);
      const E = ecrire(P.t(l, k, c));
      const phrase = P.p(l, k, c);
      return {
        text: randomChoice(TOURNURES_TRADUIRE)(phrase, l),
        format: "short",
        expected: [E],
        comparator: "expression_equivalente",
        explanation:
          DEF_TRADUIRE +
          "Méthode : on repère le mot de l’opération (double, triple, fois, produit, carré → multiplication ; augmenté, somme, de plus → addition ; diminué, différence, de moins → soustraction).\n\n" +
          `Calcul : « ${phrase} » s’écrit ${E}.\n\n` +
          `Conclusion : l’expression est ${E}.`,
      };
    },
  },

  // ---------- TRADUIRE ★3 : avec parenthèses, réponse à écrire ----------
  {
    kind: "template",
    id: "litteral_expression_traduire_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_traduire",
    difficulty: 3,
    theme: "neutral",
    hint: "Quand on multiplie une somme ou une différence, on la met entre parenthèses.",
    tags: ["traduction", "parentheses", "template"],
    generate: () => {
      const l = randomChoice(LETTRES);
      if (Math.random() < 0.45) {
        const k = randomInt(2, 6);
        const c = randomInt(1, 9);
        const ctx = randomChoice([
          { t: `Un rectangle a pour longueur ${l} + ${c} (en cm) et pour largeur ${k} cm. Écris son aire en fonction de ${l}.`, E: `${k}(${l} + ${c})`, m: `l’aire est longueur × largeur = (${l} + ${c}) × ${k}` },
          { t: `Un carré a pour côté ${l} + ${c} (en cm). Écris son périmètre en fonction de ${l}.`, E: `4(${l} + ${c})`, m: `le périmètre est 4 × côté = 4 × (${l} + ${c})` },
          { t: `On achète ${k} paquets ; chacun contient ${l} biscuits et ${c} bonbons. Écris le nombre total de friandises en fonction de ${l}.`, E: `${k}(${l} + ${c})`, m: `un paquet contient ${l} + ${c} friandises, et il y a ${k} paquets` },
          { t: `${k} amis partent en week-end ; chacun paie ${l} € de repas et ${c} € de transport. Écris la dépense totale du groupe en fonction de ${l}.`, E: `${k}(${l} + ${c})`, m: `chacun dépense ${l} + ${c} €, et ils sont ${k}` },
          { t: `Une étagère porte ${k} rangées ; chaque rangée contient ${l} livres, dont on retire ${c} livres abîmés par rangée. Écris le nombre de livres restants en fonction de ${l}.`, E: `${k}(${l} ${MOINS} ${c})`, m: `il reste ${l} ${MOINS} ${c} livres par rangée, et il y a ${k} rangées` },
          { t: `Un jardinier plante ${k} rangs de salades ; chaque rang compte ${l} salades, mais ${c} plants par rang n’ont pas poussé. Écris le nombre de salades réussies en fonction de ${l}.`, E: `${k}(${l} ${MOINS} ${c})`, m: `chaque rang compte ${l} ${MOINS} ${c} salades réussies, et il y a ${k} rangs` },
          { t: `Un triangle équilatéral a pour côté ${l} + ${c} (en cm). Écris son périmètre en fonction de ${l}.`, E: `3(${l} + ${c})`, m: `le périmètre est 3 × côté = 3 × (${l} + ${c})` },
        ]);
        return {
          text: ctx.t,
          format: "short",
          expected: [ctx.E],
          comparator: "expression_equivalente",
          explanation:
            "Définition : quand on multiplie une somme ou une différence, on la met entre parenthèses.\n\n" +
            `Méthode : ${ctx.m}.\n\n` +
            `Calcul : on obtient ${ctx.E}.\n\n` +
            `Conclusion : l’expression est ${ctx.E} (une forme développée égale est aussi juste).`,
        };
      }
      const P = randomChoice(PHRASES_3);
      const k = P.motK ? randomInt(2, 4) : randomInt(3, 9);
      const c = randomInt(1, 9);
      const op = P.moins ? MOINS : "+";
      const E = `${k}(${l} ${op} ${c})`;
      const phrase = P.p(l, k, c);
      return {
        text: randomChoice(TOURNURES_TRADUIRE)(phrase, l),
        format: "short",
        expected: [E],
        comparator: "expression_equivalente",
        explanation:
          "Définition : quand on multiplie une somme ou une différence, on la met entre parenthèses.\n\n" +
          `Méthode : on écrit d’abord (${l} ${op} ${c}), puis on multiplie par ${k}.\n\n` +
          `Calcul : « ${phrase} » s’écrit ${E}.\n\n` +
          `Conclusion : l’expression est ${E}.`,
      };
    },
  },

  // ---------- SUBSTITUER ★1 : formes simples, valeurs positives ----------
  {
    kind: "template",
    id: "litteral_expression_substituer_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_substituer",
    difficulty: 1,
    theme: "neutral",
    hint: "Remplace la lettre par le nombre : 3x devient 3 × (le nombre). Puis la multiplication d’abord.",
    tags: ["substitution", "template"],
    generate: () => {
      if (Math.random() < 0.35) {
        const S = randomChoice(SITUATIONS.filter((s) => s.signe === 1));
        const [a, b] = S.tirer();
        const termes: Terme[] = [[a, S.l], [b, ""]];
        const E = ecrire(termes);
        const v = S.valeur(a, b);
        const res = a * v + b;
        return {
          text: randomChoice([
            `${S.decrire(a, b)} L’expression ${E} donne ${S.grandeur}, où ${S.l} est ${S.quoi}. ${S.question(v)}`,
            `${cap(S.grandeur)} s’écrit ${E}, où ${S.l} désigne ${S.quoi}. ${S.question(v)}`,
          ]),
          format: "short",
          expected: [String(res)],
          comparator: "number_equal",
          explanation:
            DEF_SUBST +
            `Méthode : on remplace ${S.l} par ${v} dans ${E}.\n\n` +
            `Calcul : ${detailSubstitution(termes, { [S.l]: v })}.\n\n` +
            `Conclusion : ${S.grandeur} vaut ${res} ${S.unite}.`,
        };
      }
      const l = randomChoice(LETTRES);
      const a = randomInt(2, 9);
      const v = randomInt(2, 9);
      const b = randomInt(1, 12);
      const formes: Terme[][] = [
        [[a, l], [b, ""]],
        [[b, ""], [a, l]],
        [[a, l], [-Math.min(b, a * v - 1), ""]],
        [[1, l], [b, ""]],
        [[a, l]],
        [[a * v + b, ""], [-a, l]],
        [[1, `${l}²`], [b, ""]],
      ];
      const termes = randomChoice(formes);
      const E = ecrire(termes);
      const res = valeurTermes(termes, { [l]: v });
      return {
        text: randomChoice(CONSIGNES_SUBST)(E, l, v),
        format: "short",
        expected: [String(res)],
        comparator: "number_equal",
        explanation:
          DEF_SUBST +
          `Méthode : on remplace ${l} par ${v} ; la multiplication passe avant l’addition.\n\n` +
          `Calcul : ${detailSubstitution(termes, { [l]: v })}.\n\n` +
          `Conclusion : pour ${l} = ${v}, l’expression vaut ${res}.`,
      };
    },
  },

  // ---------- RÉDUIRE ★1 : deux termes semblables ----------
  {
    kind: "template",
    id: "litteral_expression_reduire_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_reduire",
    difficulty: 1,
    theme: "neutral",
    hint: "Les termes ont la même lettre : on additionne (ou on soustrait) leurs coefficients. x, c’est 1x.",
    tags: ["reduction", "termes-semblables", "template"],
    generate: () => {
      const l = randomChoice(LETTRES);
      const a = randomInt(2, 12);
      const b0 = randomInt(1, 9);
      const b = b0 === a ? 1 : b0; // jamais deux coefficients égaux (un « rectangle » 4y sur 4y serait un carré)
      const c3 = randomInt(Math.abs(a - b) + 1, a + b - 1); // troisième côté d’un triangle qui existe
      if (Math.random() < 0.3) {
        const ctx = randomChoice([
          // ⛔ 08/10 (relecture) : la longueur est la plus grande des deux dimensions.
          { t: `Un rectangle a pour longueur ${Math.max(a, b)}${l} et pour largeur ${Math.min(a, b) === 1 ? l : `${Math.min(a, b)}${l}`}. Son périmètre s’écrit ${ecrire([[Math.max(a, b), l], [Math.min(a, b), l], [Math.max(a, b), l], [Math.min(a, b), l]])}. Réduis cette expression.`, T: [[a, l], [b, l], [a, l], [b, l]] as Terme[] },
          // ⛔ 08/10 (correcteur) : « 5x, 3x et x » n'existe pas (5x > 3x + x) ; le troisième côté respecte l'inégalité triangulaire.
          { t: `Un triangle a des côtés de longueurs ${a}${l}, ${b === 1 ? l : `${b}${l}`} et ${c3 === 1 ? l : `${c3}${l}`}. Écris son périmètre sous forme réduite.`, T: [[a, l], [b, l], [c3, l]] as Terme[] },
          { t: `Un sac contient ${a}${l} billes rouges et ${b === 1 ? l : `${b}${l}`} billes bleues. Écris le nombre total de billes sous forme réduite.`, T: [[a, l], [b, l]] as Terme[] },
          { t: `Une ficelle mesure ${a + b}${l} cm ; on en coupe ${b === 1 ? l : `${b}${l}`} cm. Écris la longueur restante sous forme réduite.`, T: [[a + b, l], [-b, l]] as Terme[] },
        ]);
        const R = ecrire(regrouper(ctx.T));
        return {
          text: ctx.t,
          format: "short",
          expected: [R],
          comparator: "expression_developpee",
          explanation:
            DEF_REDUIRE +
            `Méthode : tous les termes contiennent ${l} : on additionne ou soustrait les coefficients.\n\n` +
            `Calcul : ${ecrire(ctx.T)} = ${R}.\n\n` +
            `Conclusion : la forme réduite est ${R}.`,
        };
      }
      const formes: Terme[][] = [
        [[a, l], [b, l]],
        [[a + b, l], [-b, l]],
        [[1, l], [a, l]],
        [[a, l], [1, l]],
        [[a, l], [-1, l]],
        [[a, l], [b, l], [1, l]],
        [[b, l], [a, l]],
      ];
      const termes = randomChoice(formes);
      const E = ecrire(termes);
      const R = ecrire(regrouper(termes));
      const coefs = termes.map(([c]) => c);
      return {
        text: randomChoice(CONSIGNES_REDUIRE)(E),
        format: "short",
        expected: [R],
        comparator: "expression_developpee",
        explanation:
          DEF_REDUIRE +
          `Méthode : les termes contiennent tous ${l} ; on calcule avec leurs coefficients (${l} = 1${l}).\n\n` +
          `Calcul : ${coefs.map((c, i) => (i === 0 ? nbT(c) : c < 0 ? `${MOINS} ${-c}` : `+ ${c}`)).join(" ")} = ${coefs.reduce((s, c) => s + c, 0)}, donc ${E} = ${R}.\n\n` +
          `Conclusion : la forme réduite est ${R}.`,
      };
    },
  },

  // ---------- RÉDUIRE ★3 : deux parties littérales, réponse à écrire ----------
  {
    kind: "template",
    id: "litteral_expression_reduire_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_reduire",
    difficulty: 3,
    theme: "neutral",
    hint: "Regroupe d’abord une partie littérale (les x), puis l’autre (les y ou les x²), puis les nombres seuls.",
    tags: ["reduction", "deux_lettres", "template"],
    generate: () => {
      const [p1, p2] = randomChoice([["x", "y"], ["a", "b"], ["m", "n"], ["x", "x²"], ["a", "a²"], ["n", "n²"], ["s", "t"], ["y", "y²"]]);
      for (let essai = 0; essai < 50; essai++) {
        const termes: Terme[] = [];
        const nb1 = randomChoice([1, 2, 2]);
        for (let i = 0; i < nb1; i++) termes.push([randomInt(1, 8) * (Math.random() < 0.35 ? -1 : 1), p1]);
        for (let i = 0; i < 2; i++) termes.push([randomInt(1, 8) * (Math.random() < 0.35 ? -1 : 1), p2]);
        if (Math.random() < 0.5) termes.push([randomInt(1, 10) * (Math.random() < 0.4 ? -1 : 1), ""]);
        if (nb1 === 1) termes.push([randomInt(1, 6) * (Math.random() < 0.4 ? -1 : 1), p1]);
        const ordre = melange(termes);
        const red = regrouper(ordre);
        if (red.some(([c]) => c === 0)) continue;
        // ordre de la forme réduite : x² avant x ; sinon x avant y ; le nombre seul à la fin
        const carre = p2.endsWith("²");
        const rang = (x: string) => (x === "" ? 2 : (x === p2) === carre ? 0 : 1);
        const reduit = [...red].sort((u, v) => rang(u[1]) - rang(v[1]));
        const E = ecrire(ordre);
        const R = ecrire(reduit);
        return {
          text: randomChoice(CONSIGNES_REDUIRE)(E),
          format: "short",
          expected: [R],
          comparator: "expression_developpee",
          explanation:
            DEF_REDUIRE +
            `Méthode : ${p1} et ${p2} ne sont pas semblables : on regroupe chaque partie littérale à part, puis les nombres seuls.\n\n` +
            `Calcul : ${reduit.map(([c, x]) => `${ecrire(ordre.filter(([, y]) => y === x))} = ${ecrire([[c, x]])}`).join(" ; ")}.\n\n` +
            `Conclusion : ${E} = ${R}.`,
        };
      }
      return {
        text: `Réduis l’expression 3${p1} + 2${p2} + 4${p1}.`,
        format: "short",
        expected: [ecrire([[7, p1], [2, p2]])],
        comparator: "expression_developpee",
        explanation: DEF_REDUIRE + `Méthode : on regroupe les ${p1}.\n\nCalcul : 3${p1} + 4${p1} = 7${p1}.\n\nConclusion : ${ecrire([[7, p1], [2, p2]])}.`,
      };
    },
  },

  // ---------- DÉFI ★3 : écrire l’expression d’une situation ----------
  {
    kind: "template",
    id: "litteral_expression_defi_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Ce qui change avec la lettre : nombre × lettre. Ce qui est fixe : un nombre seul.",
    tags: ["defi", "situation", "traduction", "template"],
    generate: () => {
      const S = randomChoice(SITUATIONS);
      const [a, b] = S.tirer();
      const termes: Terme[] = S.signe === 1 ? [[a, S.l], [b, ""]] : [[b, ""], [-a, S.l]];
      const E = ecrire(termes);
      return {
        text: randomChoice([
          `${S.decrire(a, b)} On appelle ${S.l} ${S.quoi}. Écris ${S.grandeur} en fonction de ${S.l}.`,
          `${S.decrire(a, b)} Quelle expression, avec la lettre ${S.l} pour ${S.quoi}, donne ${S.grandeur} ?`,
          `${S.decrire(a, b)} Exprime ${S.grandeur} à l’aide de ${S.l}, ${S.quoi}.`,
        ]),
        format: "short",
        expected: [E],
        comparator: "expression_equivalente",
        explanation:
          DEF_TRADUIRE +
          `Méthode : la partie qui dépend de ${S.l} vaut ${a} × ${S.l} = ${ecrire([[a, S.l]])} ; la partie fixe vaut ${b}.\n\n` +
          `Calcul : ${S.signe === 1 ? `on les ajoute : ${E}` : `on part de ${b} et on retire ${ecrire([[a, S.l]])} : ${E}`}.\n\n` +
          `Conclusion : ${S.grandeur} s’écrit ${E}.`,
      };
    },
  },

  // ---------- DÉFI ★3 : programme de calcul ----------
  {
    kind: "template",
    id: "litteral_expression_defi_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Suis le programme étape par étape en écrivant l’expression obtenue à chaque ligne ; mets des parenthèses quand tu multiplies un résultat.",
    tags: ["defi", "programme-de-calcul", "template"],
    generate: () => {
      const l = randomChoice(LETTRES);
      const k = randomInt(2, 6);
      const c = randomInt(1, 9);
      const k2 = randomInt(2, 4);
      const scenarios: { etapes: string[]; t: Terme[]; ecrit: string }[] = [
        { etapes: [`Multiplier ce nombre par ${k}.`, `Ajouter ${c} au résultat.`], t: [[k, l], [c, ""]], ecrit: `${k}${l} + ${c}` },
        { etapes: [`Ajouter ${c} à ce nombre.`, `Multiplier le résultat par ${k}.`], t: [[k, l], [k * c, ""]], ecrit: `${k}(${l} + ${c})` },
        { etapes: [`Multiplier ce nombre par ${k}.`, `Soustraire ${c} au résultat.`], t: [[k, l], [-c, ""]], ecrit: `${k}${l} ${MOINS} ${c}` },
        { etapes: [`Soustraire ${c} à ce nombre.`, `Multiplier le résultat par ${k}.`], t: [[k, l], [-k * c, ""]], ecrit: `${k}(${l} ${MOINS} ${c})` },
        { etapes: [`Multiplier ce nombre par ${k}.`, `Ajouter ${c}.`, `Multiplier le résultat par ${k2}.`], t: [[k * k2, l], [c * k2, ""]], ecrit: `${k2}(${k}${l} + ${c})` },
        { etapes: [`Ajouter ${c} à ce nombre.`, `Multiplier le résultat par ${k}.`, `Soustraire le nombre de départ.`], t: [[k - 1, l], [k * c, ""]], ecrit: `${k}(${l} + ${c}) ${MOINS} ${l}` },
        { etapes: [`Multiplier ce nombre par ${k}.`, `Ajouter le nombre de départ.`, `Soustraire ${c}.`], t: [[k + 1, l], [-c, ""]], ecrit: `${k}${l} + ${l} ${MOINS} ${c}` },
      ];
      const sc = randomChoice(scenarios);
      const E = ecrire(sc.t);
      const debut = randomChoice([`Choisir un nombre ${l}.`, `On choisit un nombre, noté ${l}.`, `Penser à un nombre ${l}.`]);
      const fin = randomChoice([
        `Écris le résultat en fonction de ${l}.`,
        `Quelle expression donne le résultat du programme ?`,
        `Exprime le résultat obtenu à l’aide de ${l}.`,
      ]);
      return {
        text: `Voici un programme de calcul. ${debut} ${sc.etapes.join(" ")} ${fin}`,
        format: "short",
        expected: [E],
        comparator: "expression_equivalente",
        explanation:
          "Définition : on suit le programme en écrivant l’expression à chaque étape.\n\n" +
          "Méthode : quand on multiplie un résultat, on le met entre parenthèses.\n\n" +
          `Calcul : on obtient ${sc.ecrit}${sc.ecrit !== E ? `, c’est-à-dire ${E}` : ""}.\n\n` +
          `Conclusion : le résultat est ${E}.`,
      };
    },
  },

  // ---------- DÉFI ★4 : périmètres de figures ----------
  {
    kind: "template",
    id: "litteral_expression_defi_tpl_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Le périmètre est la somme des longueurs de TOUS les côtés ; puis réduis.",
    tags: ["defi", "perimetre", "template"],
    generate: () => {
      const l = randomChoice(["x", "a", "n", "t", "y", "c"]);
      const c = randomInt(1, 9);
      const d = randomInt(2, 5);
      const figures: { t: string; somme: Terme[] }[] = [
        { t: `Un rectangle a pour longueur ${l} + ${c} et pour largeur ${l} (en cm).`, somme: [[1, l], [c, ""], [1, l], [1, l], [c, ""], [1, l]] },
        { t: `Un rectangle a pour longueur ${d}${l} et pour largeur ${l} + ${c} (en m).`, somme: [[d, l], [1, l], [c, ""], [d, l], [1, l], [c, ""]] },
        { t: `Un triangle a des côtés de longueurs ${l}, ${l} + ${c} et ${d}${l} (en cm).`, somme: [[1, l], [1, l], [c, ""], [d, l]] },
        { t: `Un triangle isocèle a deux côtés de longueur ${l} + ${c} et une base de longueur ${l} (en cm).`, somme: [[1, l], [c, ""], [1, l], [c, ""], [1, l]] },
        { t: `Un carré a pour côté ${d}${l} + ${c} (en cm).`, somme: [[d, l], [c, ""], [d, l], [c, ""], [d, l], [c, ""], [d, l], [c, ""]] },
        { t: `Un enclos rectangulaire pour des chèvres mesure ${l} + ${c} m de long et ${d} m de large.`, somme: [[1, l], [c, ""], [d, ""], [1, l], [c, ""], [d, ""]] },
        { t: `Un pentagone régulier a des côtés de longueur ${l} + ${c} (en cm).`, somme: [[1, l], [c, ""], [1, l], [c, ""], [1, l], [c, ""], [1, l], [c, ""], [1, l], [c, ""]] },
        { t: `Un terrain de jeu en forme de losange a pour côté ${d}${l} (en m).`, somme: [[d, l], [d, l], [d, l], [d, l]] },
      ];
      const F = randomChoice(figures);
      const R = ecrire(regrouper(F.somme));
      const fin = randomChoice([
        `Écris son périmètre en fonction de ${l}, sous forme réduite.`,
        `Quelle expression réduite donne son périmètre ?`,
        `Exprime son périmètre à l’aide de ${l}, puis réduis.`,
      ]);
      return {
        text: `${F.t} ${fin}`,
        format: "short",
        expected: [R],
        comparator: "expression_developpee",
        explanation:
          "Définition : le périmètre est la somme des longueurs de tous les côtés.\n\n" +
          `Méthode : on additionne les côtés, puis on regroupe les termes en ${l} et les nombres.\n\n` +
          `Calcul : ${ecrire(F.somme)} = ${R}.\n\n` +
          `Conclusion : le périmètre est ${R}.`,
      };
    },
  },

  // ---------- DÉFI ★5 : comparer deux formules ----------
  {
    kind: "template",
    id: "litteral_expression_defi_tpl_7",
    niveau: "4e",
    matiere: "maths",
    notionId: "litteral_expression",
    microId: "litteral_expression_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Écris le prix de chaque formule en fonction de n, puis remplace n par la valeur donnée et compare.",
    tags: ["defi", "situation", "comparaison", "template"],
    generate: () => {
      const act = randomChoice([
        { lieu: "la piscine municipale", u: "entrées", par: "l’entrée" },
        { lieu: "le cinéma du quartier", u: "séances", par: "la séance" },
        { lieu: "la salle d’escalade", u: "séances", par: "la séance" },
        { lieu: "la patinoire", u: "entrées", par: "l’entrée" },
        { lieu: "le musée d’histoire naturelle", u: "visites", par: "la visite" },
        { lieu: "le réseau de bus", u: "trajets", par: "le trajet" },
        { lieu: "les vélos en libre-service", u: "locations", par: "la location" },
        { lieu: "le club de danse", u: "cours", par: "le cours" },
        { lieu: "le téléphérique de la station", u: "montées", par: "la montée" },
        { lieu: "le bowling", u: "parties", par: "la partie" },
      ]);
      const p = randomInt(5, 10);
      const a = randomInt(2, p - 2);
      const b = randStep(15, 60, 5);
      const n = randomInt(3, 25);
      const prixA = p * n;
      const prixB = b + a * n;
      const bon = prixA < prixB ? "la formule sans abonnement" : prixA > prixB ? "la formule avec abonnement" : "les deux coûtent autant";
      const intro = randomChoice([
        `Pour ${act.lieu}, deux formules : sans abonnement, ${p} € ${act.par} ; avec abonnement, ${b} € par an puis ${a} € ${act.par}.`,
        `Deux formules existent pour ${act.lieu} : sans abonnement, ${p} € ${act.par}, ou un abonnement annuel de ${b} € puis ${a} € ${act.par}.`,
      ]);
      const deU = /^[aeiouéè]/.test(act.u) ? `d’${act.u}` : `de ${act.u}`;
      const question = randomChoice([
        `On note n le nombre ${deU} dans l’année. Pour n = ${n}, quelle formule est la moins chère ?`,
        `Les prix s’écrivent ${p}n et ${b} + ${a}n, où n est le nombre ${deU}. Pour ${n} ${act.u}, quelle formule choisir pour payer le moins ?`,
        `Quelqu’un prévoit ${n} ${act.u} dans l’année. Quelle formule lui coûte le moins ?`,
      ]);
      return {
        text: `${intro} ${question}`,
        format: "qcm",
        choices: ["la formule sans abonnement", "la formule avec abonnement", "les deux coûtent autant"],
        expected: [bon],
        comparator: "mcq_exact",
        explanation:
          "Définition : chaque formule se traduit par une expression en fonction de n.\n\n" +
          `Méthode : sans abonnement, le prix est ${p}n ; avec abonnement, ${b} + ${a}n. On remplace n par ${n}.\n\n` +
          `Calcul : ${p} × ${n} = ${prixA} € ; ${b} + ${a} × ${n} = ${b} + ${a * n} = ${prixB} €.\n\n` +
          `Conclusion : ${bon === "les deux coûtent autant" ? "les deux formules coûtent autant" : `${bon} est la moins chère`} pour ${n} ${act.u}.`,
      };
    },
  },
];
