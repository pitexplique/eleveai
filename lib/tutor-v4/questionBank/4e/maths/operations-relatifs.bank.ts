// lib/tutor-v4/questionBank/4e/maths/operations-relatifs.bank.ts

/**
 * Banque de questions Tutor V4 - Mathématiques 4e
 * Notion : Opérations sur les nombres relatifs
 *
 * Objectifs :
 * - additionner et soustraire des nombres relatifs ;
 * - multiplier et diviser des nombres relatifs ;
 * - utiliser correctement les règles de signes ;
 * - effectuer des calculs avec plusieurs opérations ;
 * - résoudre des problèmes simples avec des températures, gains/pertes, altitudes ;
 * - éviter les erreurs fréquentes : signe oublié, confusion soustraction/opposé, produit de deux négatifs.
 *
 * Organisation :
 * - fixed : ancrage des règles essentielles ;
 * - templates : variation des nombres et des situations ;
 * - open : justification des règles de signes et verbalisation du raisonnement.
 */

import type { TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

// ⛔⛔ 30/09/2026 — « DES QUESTIONS REVIENNENT SOUVENT ». Mesuré avant : 11 à 37
// squelettes d'énoncé par micro, 11 à 18 répétitions sur une série de 20. Les
// gabarits changeaient les nombres, jamais la phrase ni la FORME du calcul.
// Chaque générateur compose désormais :
//   · pour un calcul pur, une FORME (signes, place des parenthèses, premier
//     terme écrit « -7 » ou « (-7) », nombre de termes) × une CONSIGNE
//     (« Calcule », « Que vaut… ? », « On pose A = … », « Complète… ») ;
//   · pour une partie des tirages, une SITUATION (tables ci-dessous :
//     températures, altitudes, argent, scores…) × une TOURNURE.
// La Réunion reste un contexte parmi une vingtaine (gabarit `reunion` à part).
// Mesure : npx --yes tsx@4 scripts/mesurer-squelettes-coach.ts 4e relatif_operation

type Q = TutorGeneratedQuestionV4;

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: readonly T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

const abs = Math.abs;
/** Un relatif non nul dont la distance à zéro est entre min et max. */
const nz = (min: number, max: number) => randomChoice([-1, 1]) * randomInt(min, max);
/** Un relatif dans un calcul : entre parenthèses s'il est négatif. */
const p = (n: number) => (n < 0 ? `(${n})` : `${n}`);
/** Le premier terme : un négatif s'écrit parfois sans parenthèses (« -7 + 4 »), comme au tableau. */
const t0 = (n: number) => (n < 0 && Math.random() < 0.5 ? `${n}` : p(n));
/** 2400 → « 2 400 ». */
const fr = (n: number) =>
  `${n < 0 ? "-" : ""}${String(abs(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`;
/** Une valeur et son unité, accordée : « 1 point », « -1 point », « 5 points ». */
const u = (n: number, unite: string) =>
  `${fr(n)}${abs(n) < 2 && unite.endsWith("s") ? unite.slice(0, -1) : unite}`;
const lc = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
const signe = (n: number) => (n > 0 ? "positif" : "négatif");

const expl = (def: string, meth: string, calc: string, concl: string) =>
  `Définition : ${def}\n\nMéthode : ${meth}\n\nCalcul : ${calc}\n\nConclusion : ${concl}`;

const court = (text: string, r: number, explanation: string): Q => ({
  text,
  format: "short",
  expected: [String(r)],
  comparator: "number_equal",
  explanation,
});

/* ---------------------------------------------------------------------------
   Les CONSIGNES d'un calcul pur. Deux d'entre elles nomment l'expression
   d'une lettre (A, B, C…), comme sur une copie.
--------------------------------------------------------------------------- */
const LETTRES = ["A", "B", "C", "D", "E", "M"];
const CONSIGNES: ((e: string) => string)[] = [
  (e) => `Calculer : ${e}`,
  (e) => `Calcule ${e}.`,
  (e) => `Donne la valeur de ${e}.`,
  (e) => `Que vaut ${e} ?`,
  (e) => `Effectue le calcul : ${e}`,
  (e) => `Quel est le résultat de ${e} ?`,
  (e) => `Sans calculatrice, calcule ${e}.`,
  (e) => `Complète l’égalité : ${e} = …`,
  (e) => {
    const L = randomChoice(LETTRES);
    return `On pose ${L} = ${e}. Calcule ${L}.`;
  },
  (e) => {
    const L = randomChoice(LETTRES);
    return `Calcule l’expression ${L} = ${e}.`;
  },
];
const poser = (e: string) => randomChoice(CONSIGNES)(e);

const REGLE_SOMME = (a: number, b: number) =>
  a * b > 0
    ? "deux relatifs de même signe s’additionnent en additionnant leurs distances à zéro ; le résultat garde leur signe."
    : "deux relatifs de signes contraires s’additionnent en soustrayant leurs distances à zéro ; le résultat prend le signe du plus éloigné de zéro.";
const REGLE_PRODUIT =
  "le produit (ou le quotient) de deux relatifs de même signe est positif ; de signes contraires, il est négatif.";
const PRIO = "la multiplication et la division sont prioritaires sur l’addition et la soustraction.";
const PAR = "on calcule d’abord ce qui est entre parenthèses.";

/* ---------------------------------------------------------------------------
   LES SITUATIONS « une valeur de départ, une variation ». Les phrases de
   variation commencent par leur sujet (« La température monte… », « Il
   remonte… ») : on peut en enchaîner deux avec « Ensuite, … ».
--------------------------------------------------------------------------- */
type Sit = {
  s: [number, number];
  d: [number, number];
  pas?: number;
  u: string;
  min?: number;
  max?: number;
  depart: (v: string) => string;
  hausse: (d: string) => string;
  baisse: (d: string) => string;
  q: string[];
  apres: (v: string) => string;
  varie: string[];
  fin: string;
};

const SIT_TEMP: Sit[] = [
  {
    s: [-10, 6], d: [2, 12], u: " °C",
    depart: (v) => `Au lever du jour, le thermomètre du jardin indique ${v}.`,
    hausse: (d) => `La température monte de ${d}.`,
    baisse: (d) => `La température baisse de ${d}.`,
    q: ["Quelle température indique alors le thermomètre ?", "Quelle est la nouvelle température ?"],
    apres: (v) => `À midi, il indique ${v}.`,
    varie: ["De combien la température a-t-elle varié ?", "Quelle est la variation de la température ?"],
    fin: "le thermomètre indique alors",
  },
  {
    s: [-15, 3], d: [3, 12], u: " °C",
    depart: (v) => `Devant un refuge de montagne, il fait ${v} à 6 h.`,
    hausse: (d) => `La température gagne ${d}.`,
    baisse: (d) => `La température perd ${d}.`,
    q: ["Quelle température fait-il alors devant le refuge ?", "Combien de degrés affiche maintenant le thermomètre du refuge ?"],
    apres: (v) => `À 14 h, il fait ${v}.`,
    varie: ["De combien de degrés la température a-t-elle varié ?", "Quelle est la variation de température entre 6 h et 14 h ?"],
    fin: "il fait alors",
  },
  {
    s: [-20, -12], d: [4, 18], u: " °C", min: -30,
    depart: (v) => `Un sorbet sort du congélateur à ${v}.`,
    hausse: (d) => `Posé sur la table, il se réchauffe de ${d}.`,
    baisse: (d) => `Remis au congélateur, il se refroidit encore de ${d}.`,
    q: ["Quelle est maintenant sa température ?", "À quelle température est-il alors ?"],
    apres: (v) => `Un peu plus tard, sa température est de ${v}.`,
    varie: ["De combien sa température a-t-elle varié ?", "Quelle est la variation de sa température ?"],
    fin: "sa température est alors de",
  },
  {
    s: [-45, -20], d: [3, 15], u: " °C",
    depart: (v) => `Dans une base scientifique en Antarctique, on relève ${v} à 8 h.`,
    hausse: (d) => `La température gagne ${d}.`,
    baisse: (d) => `La température perd ${d}.`,
    q: ["Quelle température relève-t-on ensuite ?", "Quelle est la nouvelle mesure ?"],
    apres: (v) => `À 20 h, on relève ${v}.`,
    varie: ["De combien la température a-t-elle varié dans la journée ?", "Quelle est la variation de température entre les deux relevés ?"],
    fin: "on relève alors",
  },
  {
    s: [-15, -3], d: [2, 12], u: " °C",
    depart: (v) => `En sciences, la sonde plantée dans un glaçon indique ${v}.`,
    hausse: (d) => `On chauffe le glaçon : sa température augmente de ${d}.`,
    baisse: (d) => `On plonge le glaçon dans un mélange de glace et de sel : sa température diminue de ${d}.`,
    q: ["Quelle température indique alors la sonde ?", "Quelle est la température finale du glaçon ?"],
    apres: (v) => `Quelques minutes plus tard, la sonde indique ${v}.`,
    varie: ["De combien la température du glaçon a-t-elle varié ?", "Quelle est la variation de température mesurée par la sonde ?"],
    fin: "la sonde indique alors",
  },
  {
    s: [-20, -2], d: [2, 12], u: " °C",
    depart: (v) => `À Montréal, un matin de janvier, il fait ${v}.`,
    hausse: (d) => `Le thermomètre gagne ${d}.`,
    baisse: (d) => `Le thermomètre perd ${d}.`,
    q: ["Quelle température fait-il alors ?", "Que marque maintenant le thermomètre ?"],
    apres: (v) => `En fin de journée, il fait ${v}.`,
    varie: ["De combien la température a-t-elle varié dans la journée ?", "Quelle est la variation de température ?"],
    fin: "il fait alors",
  },
];

const SIT_ALT: Sit[] = [
  {
    s: [-30, -4], d: [2, 15], u: " m", max: -1,
    depart: (v) => `Une plongeuse se trouve à ${v} par rapport à la surface de la mer.`,
    hausse: (d) => `Elle remonte de ${d}.`,
    baisse: (d) => `Elle descend encore de ${d}.`,
    q: ["À quelle altitude, en nombre relatif, se trouve-t-elle alors ?", "Quelle est sa nouvelle position par rapport à la surface ?"],
    apres: (v) => `Un peu plus tard, elle est à ${v}.`,
    varie: ["De combien son altitude a-t-elle varié ?", "Quelle est la variation de son altitude ?"],
    fin: "elle se trouve alors à",
  },
  {
    s: [-250, -40], pas: 10, d: [20, 120], u: " m", max: -10,
    depart: (v) => `Un sous-marin navigue à l’altitude ${v}.`,
    hausse: (d) => `Il remonte de ${d}.`,
    baisse: (d) => `Il plonge encore de ${d}.`,
    q: ["Quelle est alors son altitude ?", "À quelle altitude se trouve-t-il ensuite ?"],
    apres: (v) => `Une heure plus tard, il est à ${v}.`,
    varie: ["De combien son altitude a-t-elle varié ?", "Quelle est la variation d’altitude du sous-marin ?"],
    fin: "il navigue alors à l’altitude",
  },
  {
    s: [-120, -20], pas: 5, d: [5, 40], u: " m", max: -5,
    depart: (v) => `Dans un gouffre, une spéléologue est à ${v} par rapport à l’entrée.`,
    hausse: (d) => `Elle remonte de ${d}.`,
    baisse: (d) => `Elle descend encore de ${d}.`,
    q: ["Où se trouve-t-elle alors par rapport à l’entrée ?", "Quel nombre relatif donne sa nouvelle position ?"],
    apres: (v) => `Plus tard, elle est à ${v}.`,
    varie: ["De combien sa position a-t-elle varié ?", "Quelle est la variation de sa position ?"],
    fin: "elle est alors à",
  },
  {
    s: [-400, -100], pas: 10, d: [30, 150], u: " m", max: -10,
    depart: (v) => `Dans une mine, la cabine de l’ascenseur est à ${v} par rapport au sol.`,
    hausse: (d) => `Elle remonte de ${d}.`,
    baisse: (d) => `Elle descend de ${d}.`,
    q: ["Où se trouve la cabine ensuite ?", "Quelle est sa nouvelle position par rapport au sol ?"],
    apres: (v) => `Un peu plus tard, elle est à ${v}.`,
    varie: ["De combien la position de la cabine a-t-elle varié ?", "Quelle est la variation de position de la cabine ?"],
    fin: "la cabine est alors à",
  },
  {
    s: [-4, 6], d: [2, 7], u: "", min: -5, max: 12,
    depart: (v) => `Dans un immeuble avec parking souterrain, un ascenseur est au niveau ${v}.`,
    hausse: (d) => `Il monte de ${d} étages.`,
    baisse: (d) => `Il descend de ${d} étages.`,
    q: ["À quel niveau s’arrête-t-il ?", "Quel niveau affiche l’écran de l’ascenseur ?"],
    apres: (v) => `Il s’arrête ensuite au niveau ${v}.`,
    varie: ["Quelle est la variation de niveau de l’ascenseur ?", "De combien d’étages s’est-il déplacé, en nombre relatif ?"],
    fin: "l’ascenseur s’arrête au niveau",
  },
  {
    s: [-60, 40], pas: 5, d: [5, 40], u: " cm",
    depart: (v) => `Le niveau d’un lac est à ${v} par rapport à son niveau habituel.`,
    hausse: (d) => `Après un orage, il monte de ${d}.`,
    baisse: (d) => `Après une semaine de sécheresse, il baisse de ${d}.`,
    q: ["Où se situe alors le niveau du lac par rapport à la normale ?", "Quel nombre relatif indique maintenant l’échelle du lac ?"],
    apres: (v) => `Un mois plus tard, il est à ${v}.`,
    varie: ["De combien le niveau du lac a-t-il varié ?", "Quelle est la variation du niveau du lac ?"],
    fin: "le niveau du lac est alors à",
  },
];

const SIT_ARGENT: Sit[] = [
  {
    s: [-80, 60], pas: 5, d: [15, 90], u: " €",
    depart: (v) => `Le compte bancaire de Karim affiche ${v}.`,
    hausse: (d) => `Un virement de ${d} arrive sur le compte.`,
    baisse: (d) => `Un achat de ${d} est débité.`,
    q: ["Quel est le nouveau solde du compte ?", "Combien le compte affiche-t-il maintenant ?"],
    apres: (v) => `En fin de mois, le compte affiche ${v}.`,
    varie: ["De combien le solde a-t-il varié ?", "Quelle est la variation du solde ?"],
    fin: "le compte affiche alors",
  },
  {
    s: [-5, 20], d: [3, 25], u: " €", min: -10,
    depart: (v) => `La carte de cantine de Maya affiche ${v}.`,
    hausse: (d) => `Ses parents la rechargent de ${d}.`,
    baisse: (d) => `Des repas pour ${d} sont débités.`,
    q: ["Combien affiche maintenant la carte ?", "Quel est le nouveau solde de la carte ?"],
    apres: (v) => `Vendredi, elle affiche ${v}.`,
    varie: ["De combien le solde de la carte a-t-il varié ?", "Quelle est la variation du solde de la carte ?"],
    fin: "la carte affiche alors",
  },
  {
    s: [-60, 40], pas: 5, d: [10, 80], u: " €",
    depart: (v) => `Ce matin, le bilan de la buvette du club de foot est de ${v}.`,
    hausse: (d) => `Les ventes du match rapportent ${d}.`,
    baisse: (d) => `Le club rachète des boissons pour ${d}.`,
    q: ["Quel est le bilan en fin de journée ?", "Où en est maintenant le bilan de la buvette ?"],
    apres: (v) => `Le soir, le bilan est de ${v}.`,
    varie: ["De combien le bilan a-t-il varié ?", "Quelle est la variation du bilan dans la journée ?"],
    fin: "le bilan est alors de",
  },
  {
    s: [-200, 300], pas: 10, d: [50, 250], u: " €",
    depart: (v) => `Le budget d’une association de protection des oiseaux est de ${v}.`,
    hausse: (d) => `L’association reçoit un don de ${d}.`,
    baisse: (d) => `L’association achète des nichoirs pour ${d}.`,
    q: ["Quel est alors son budget ?", "Quel est le nouveau budget de l’association ?"],
    apres: (v) => `À la fin de l’année, il est de ${v}.`,
    varie: ["De combien le budget a-t-il varié ?", "Quelle est la variation du budget ?"],
    fin: "le budget est alors de",
  },
];

const SIT_SCORE: Sit[] = [
  {
    s: [-20, 30], d: [5, 40], u: " points",
    depart: (v) => `Dans un jeu vidéo, le score d’Inès est de ${v}.`,
    hausse: (d) => `Elle attrape un bonus qui vaut ${d}.`,
    baisse: (d) => `Elle tombe dans un piège qui lui coûte ${d}.`,
    q: ["Quel est son nouveau score ?", "Combien de points a-t-elle maintenant ?"],
    apres: (v) => `À la fin du niveau, son score est de ${v}.`,
    varie: ["De combien son score a-t-il varié ?", "Quelle est la variation de son score ?"],
    fin: "son score est alors de",
  },
  {
    s: [-6, 10], d: [2, 8], u: " points",
    depart: (v) => `Au quiz de la classe, l’équipe des Bleus a ${v}.`,
    hausse: (d) => `Elle répond juste et gagne ${d}.`,
    baisse: (d) => `Elle se trompe et perd ${d}.`,
    q: ["Combien de points a maintenant l’équipe ?", "Quel est le nouveau total de l’équipe ?"],
    apres: (v) => `À la pause, elle a ${v}.`,
    varie: ["De combien le total de l’équipe a-t-il varié ?", "Quelle est la variation du total de l’équipe ?"],
    fin: "l’équipe a alors",
  },
  {
    s: [-5, 6], d: [2, 4], u: " coups",
    depart: (v) => `Au golf, le score d’une joueuse est de ${v} par rapport au par.`,
    hausse: (d) => `Sur le trou suivant, elle joue ${d} de plus que le par.`,
    baisse: (d) => `Sur le trou suivant, elle joue ${d} de moins que le par.`,
    q: ["Quel est maintenant son score par rapport au par ?", "Où en est son score par rapport au par ?"],
    apres: (v) => `Après le trou suivant, son score est de ${v}.`,
    varie: ["De combien son score a-t-il varié ?", "Quelle est la variation de son score sur ce trou ?"],
    fin: "son score est alors de",
  },
];

const SIT_REUNION: Sit[] = [
  {
    s: [-3, 6], d: [2, 8], u: " °C",
    depart: (v) => `Au sommet du Piton des Neiges, à La Réunion, il fait ${v} au lever du soleil.`,
    hausse: (d) => `La température monte de ${d}.`,
    baisse: (d) => `Un nuage arrive et la température baisse de ${d}.`,
    q: ["Quelle température fait-il alors au sommet ?", "Combien indique le thermomètre du randonneur ?"],
    apres: (v) => `Au moment de redescendre, il fait ${v}.`,
    varie: ["De combien la température a-t-elle varié ?", "Quelle est la variation de température au sommet ?"],
    fin: "il fait alors",
  },
  {
    s: [300, 2400], pas: 10, d: [100, 600], u: " m", min: 50,
    depart: (v) => `À La Réunion, une randonneuse est à ${v} d’altitude au départ du sentier.`,
    hausse: (d) => `Elle monte de ${d}.`,
    baisse: (d) => `Elle descend de ${d} vers le fond du cirque.`,
    q: ["À quelle altitude arrive-t-elle ?", "Quelle est sa nouvelle altitude ?"],
    apres: (v) => `Au pique-nique, elle est à ${v} d’altitude.`,
    varie: ["De combien son altitude a-t-elle varié ?", "Quelle est la variation de son altitude ?"],
    fin: "elle arrive à",
  },
  {
    s: [-12, -2], d: [1, 6], u: " m", max: -1,
    depart: (v) => `Dans le lagon de Saint-Gilles, un plongeur observe les coraux à ${v} par rapport à la surface.`,
    hausse: (d) => `Il remonte de ${d}.`,
    baisse: (d) => `Il descend encore de ${d}.`,
    q: ["Où se trouve-t-il alors par rapport à la surface ?", "Quelle est sa nouvelle altitude, en nombre relatif ?"],
    apres: (v) => `Un peu plus tard, il est à ${v}.`,
    varie: ["De combien son altitude a-t-elle varié ?", "Quelle est la variation de sa position ?"],
    fin: "il se trouve alors à",
  },
  {
    s: [1800, 2200], pas: 10, d: [150, 700], u: " m", min: 1000,
    depart: (v) => `Au Maïdo, à La Réunion, un groupe de marcheurs part de ${v} d’altitude.`,
    hausse: (d) => `Le groupe remonte de ${d}.`,
    baisse: (d) => `Le groupe descend de ${d} dans le sentier.`,
    q: ["À quelle altitude se trouve le groupe ?", "Quelle est alors l’altitude du groupe ?"],
    apres: (v) => `À la pause, le groupe est à ${v} d’altitude.`,
    varie: ["De combien l’altitude du groupe a-t-elle varié ?", "Quelle est la variation d’altitude du groupe ?"],
    fin: "le groupe se trouve à",
  },
];

// ⭐ Un seul contexte réunionnais dans la grande table (le Piton des Neiges).
const SIT_TOUTES: Sit[] = [...SIT_TEMP, ...SIT_ALT, ...SIT_ARGENT, ...SIT_SCORE, SIT_REUNION[0]];

const PREFIXES_SIT = ["", "Traduis la situation par un calcul de nombres relatifs. ", "Avec des nombres relatifs : "];
const SUFFIXES_VAR = [
  "Réponds par un nombre relatif (négatif s’il s’agit d’une baisse).",
  "Donne un nombre relatif : positif pour une hausse, négatif pour une baisse.",
];

function tirerDans(c: Sit, [lo, hi]: [number, number]) {
  const pas = c.pas ?? 1;
  return pas * randomInt(Math.ceil(lo / pas), Math.floor(hi / pas));
}

/** Tire un contexte, une valeur de départ et une (ou deux) variation(s) plausibles. */
function tirerSit(sits: Sit[], nbVar: 1 | 2 = 1, ok: (s: number, d: number) => boolean = () => true) {
  for (let k = 0; k < 300; k++) {
    const c = randomChoice(sits);
    const s = tirerSit0(c);
    const ds = Array.from({ length: nbVar }, () => randomChoice([-1, 1]) * tirerDans(c, c.d));
    let v = s;
    let bon = s !== 0 && ok(s, ds[0]);
    for (const d of ds) {
      v += d;
      if ((c.min !== undefined && v < c.min) || (c.max !== undefined && v > c.max)) bon = false;
    }
    if (bon) return { c, s, ds, f: v };
  }
  const c = SIT_TEMP[0];
  return { c, s: -3, ds: nbVar === 1 ? [7] : [7, -2], f: nbVar === 1 ? 4 : 2 };
}
const tirerSit0 = (c: Sit) => tirerDans(c, c.s);

const phraseVar = (c: Sit, d: number) => (d > 0 ? c.hausse(u(d, c.u)) : c.baisse(u(-d, c.u)));

/** « Il fait -3 °C. La température monte de 7 °C. Quelle est la nouvelle température ? » */
function situVariation(sits: Sit[], ok?: (s: number, d: number) => boolean): Q {
  const { c, s, ds, f } = tirerSit(sits, 1, ok);
  const d = ds[0];
  const text = `${randomChoice(PREFIXES_SIT)}${c.depart(u(s, c.u))} ${phraseVar(c, d)} ${randomChoice(c.q)}`;
  return court(
    text,
    f,
    expl(
      "une hausse se traduit par l’ajout d’un nombre positif, une baisse par l’ajout d’un nombre négatif.",
      `on part de ${fr(s)} et on ajoute ${fr(d)}.`,
      `${p(s)} + ${p(d)} = ${f}.`,
      `${c.fin} ${u(f, c.u)}.`
    )
  );
}

/** « Il fait -3 °C, puis 4 °C. De combien a-t-elle varié ? » : valeur finale − valeur initiale. */
function situVariationLue(sits: Sit[]): Q {
  const { c, s, ds, f } = tirerSit(sits, 1);
  const d = ds[0];
  const text = `${c.depart(u(s, c.u))} ${c.apres(u(f, c.u))} ${randomChoice(c.varie)} ${randomChoice(SUFFIXES_VAR)}`;
  return court(
    text,
    d,
    expl(
      "la variation est la valeur finale moins la valeur initiale.",
      `on calcule ${fr(f)} - ${p(s)}.`,
      `${p(f)} - ${p(s)} = ${p(f)} + ${p(-s)} = ${d}.`,
      `la variation est ${d > 0 ? "une hausse" : "une baisse"} : ${d}.`
    )
  );
}

/** Deux variations successives. */
function situDouble(sits: Sit[]): Q {
  const { c, s, ds, f } = tirerSit(sits, 2);
  const [d1, d2] = ds;
  const text = `${c.depart(u(s, c.u))} ${phraseVar(c, d1)} Ensuite, ${lc(phraseVar(c, d2))} ${randomChoice(c.q)}`;
  return court(
    text,
    f,
    expl(
      "chaque variation s’ajoute à la valeur : une hausse est positive, une baisse négative.",
      "on ajoute les deux variations à la valeur de départ.",
      `${p(s)} + ${p(d1)} = ${s + d1}, puis ${p(s + d1)} + ${p(d2)} = ${f}.`,
      `${c.fin} ${u(f, c.u)}.`
    )
  );
}

/* ---------------------------------------------------------------------------
   ÉCARTS entre deux valeurs (la plus haute moins la plus basse).
--------------------------------------------------------------------------- */
type Ecart = {
  h: [number, number];
  l: [number, number];
  pas?: number;
  u: string;
  t: (h: string, l: string) => string;
  q: string[];
  fin: string;
  /** Unité du résultat quand elle diffère de celle des données (dates → ans). */
  ur?: string;
  /** L'écart est tiré directement (une durée de vie, pas deux dates au hasard). */
  duree?: [number, number];
};

const ECARTS_TEMP: Ecart[] = [
  {
    h: [2, 15], l: [-15, -2], u: " °C",
    t: (h, l) => `Dans une ville du Canada, il fait ${h} le jour et ${l} la nuit.`,
    q: ["Quel est l’écart de température entre le jour et la nuit ?", "Combien de degrés séparent la température du jour de celle de la nuit ?"],
    fin: "l’écart est de",
  },
  {
    h: [-30, 5], l: [-95, -60], u: " °C",
    t: (h, l) => `Sur Mars, un robot mesure ${h} à midi et ${l} pendant la nuit.`,
    q: ["Quel est l’écart entre ces deux températures ?", "De combien de degrés la température chute-t-elle entre midi et la nuit ?"],
    fin: "l’écart est de",
  },
  {
    h: [3, 7], l: [-24, -16], u: " °C",
    t: (h, l) => `Dans une cuisine, le réfrigérateur est à ${h} et le congélateur à ${l}.`,
    q: ["Quel est l’écart de température entre les deux appareils ?", "De combien de degrés le réfrigérateur est-il plus chaud que le congélateur ?"],
    fin: "l’écart est de",
  },
  {
    h: [8, 25], l: [-20, -3], u: " °C",
    t: (h, l) => `Un désert de haute montagne connaît ${h} en plein jour et ${l} avant l’aube.`,
    q: ["Quelle est l’amplitude de température de la journée ?", "Combien de degrés séparent ces deux relevés ?"],
    fin: "l’amplitude est de",
  },
  {
    h: [20, 150], l: [-80, -10], pas: 5, u: " €",
    t: (h, l) => `Le compte de Lou affiche ${h} et celui de Tom ${l}.`,
    q: ["Combien Lou a-t-elle de plus que Tom sur son compte ?", "Quel est l’écart entre les deux soldes ?"],
    fin: "l’écart est de",
  },
  {
    h: [5, 40], l: [-30, -3], u: " points",
    t: (h, l) => `À la fin d’un jeu, Zoé a ${h} et Sami ${l}.`,
    q: ["Combien de points séparent Zoé et Sami ?", "Combien Zoé a-t-elle de points de plus que Sami ?"],
    fin: "l’écart est de",
  },
  {
    h: [-240, -40], l: [-500, -120], duree: [30, 85], u: "",
    t: (h, l) => `Un savant de l’Antiquité est né en l’an ${l} et mort en l’an ${h}.`,
    q: ["Combien d’années se sont écoulées entre sa naissance et sa mort ?", "Combien d’années séparent ces deux dates ?"],
    fin: "il s’est écoulé", ur: " ans",
  },
];

const ECARTS_ALT: Ecart[] = [
  {
    h: [5, 40], l: [-20, -2], u: " m",
    t: (h, l) => `Un goéland vole à ${h} au-dessus de la mer, juste au-dessus d’un poisson qui nage à ${l}.`,
    q: ["Quelle distance verticale sépare le goéland du poisson ?", "Quel est l’écart d’altitude entre les deux animaux ?"],
    fin: "la distance est de",
  },
  {
    h: [500, 3000], l: [-300, -50], pas: 10, u: " m",
    t: (h, l) => `Un avion survole la mer à ${h} d’altitude, au-dessus d’un sous-marin à ${l}.`,
    q: ["Quelle distance verticale les sépare ?", "Quel est l’écart d’altitude entre l’avion et le sous-marin ?"],
    fin: "la distance est de",
  },
  {
    h: [20, 90], l: [-30, -5], u: " m",
    t: (h, l) => `Du haut d’une falaise à ${h} d’altitude, on aperçoit une plongeuse à ${l}.`,
    q: ["Quelle différence d’altitude y a-t-il entre le haut de la falaise et la plongeuse ?", "De combien de mètres la plongeuse est-elle plus bas que le haut de la falaise ?"],
    fin: "la différence est de",
  },
  {
    h: [10, 60], l: [-60, -15], u: " m",
    t: (h, l) => `Un drone filme à ${h} au-dessus de l’eau un robot qui explore une épave à ${l}.`,
    q: ["Quelle distance verticale sépare le drone du robot ?", "Quel est l’écart d’altitude entre le drone et le robot ?"],
    fin: "la distance est de",
  },
  {
    h: [2, 12], l: [-4, -1], u: "",
    t: (h, l) => `Un ascenseur part du niveau ${l} d’un parking souterrain et s’arrête au niveau ${h}.`,
    q: ["De combien d’étages est-il monté ?", "Combien de niveaux a-t-il parcourus ?"],
    fin: "il est monté de", ur: " étages",
  },
  {
    h: [800, 2500], l: [-120, -20], pas: 10, u: " m",
    t: (h, l) => `Un alpiniste est au sommet d’une montagne à ${h} d’altitude ; au même moment, un spéléologue est à ${l} dans une grotte au pied de la montagne.`,
    q: ["Quelle différence d’altitude sépare les deux sportifs ?", "Quel est l’écart d’altitude entre l’alpiniste et le spéléologue ?"],
    fin: "la différence est de",
  },
];

function situEcart(table: Ecart[]): Q {
  const c = randomChoice(table);
  const pas = c.pas ?? 1;
  const tir = ([a, b]: [number, number]) => pas * randomInt(Math.ceil(a / pas), Math.floor(b / pas));
  const l = tir(c.l);
  const h = c.duree ? l + randomInt(c.duree[0], c.duree[1]) : tir(c.h);
  const e = h - l;
  const suffixe = randomChoice(["", " Écris le calcul avec des nombres relatifs.", " Pense à la soustraction « la plus haute moins la plus basse »."]);
  const text = `${c.t(u(h, c.u), u(l, c.u))} ${randomChoice(c.q)}${suffixe}`;
  return court(
    text,
    e,
    expl(
      "l’écart entre deux valeurs est la plus haute moins la plus basse.",
      `on calcule ${fr(h)} - ${p(l)}, ce qui revient à ajouter l’opposé de ${fr(l)}.`,
      `${p(h)} - ${p(l)} = ${p(h)} + ${p(-l)} = ${e}.`,
      `${c.fin} ${u(e, c.ur ?? c.u)}.`
    )
  );
}

/* ---------------------------------------------------------------------------
   Une variation RÉPÉTÉE : un produit de relatifs (avec ou sans départ).
--------------------------------------------------------------------------- */
type Repet = {
  k: [number, number];
  n: [number, number];
  sg: 1 | -1;
  u: string;
  t: (k: number, n: number) => string;
  q: string[];
  /** Avec un départ : bornes de la valeur de départ, phrase de départ, question finale. */
  s?: [number, number];
  depart?: (v: string) => string;
  qFin?: string[];
  /** La phrase de variation quand elle suit la phrase de départ (sujet repris par un pronom). */
  tSuite?: (k: number, n: number) => string;
};

const REPETS: Repet[] = [
  {
    k: [2, 5], n: [2, 8], sg: -1, u: " °C",
    t: (k, n) => `La température baisse de ${k} °C par heure pendant ${n} heures.`,
    q: ["De combien a-t-elle varié en tout ?", "Quelle est la variation totale de température ?"],
    s: [-5, 8], depart: (v) => `À 18 h, il fait ${v}.`,
    qFin: ["Quelle température fait-il à la fin ?", "Quelle température indique alors le thermomètre ?"],
  },
  {
    k: [2, 6], n: [2, 9], sg: -1, u: " m",
    t: (k, n) => `Un plongeur descend de ${k} m par minute pendant ${n} minutes.`,
    q: ["Quelle est la variation de son altitude ?", "De combien son altitude a-t-elle changé ?"],
    s: [-6, -2], depart: (v) => `Un plongeur est à ${v} par rapport à la surface.`,
    tSuite: (k, n) => `Il descend de ${k} m par minute pendant ${n} minutes.`,
    qFin: ["À quelle altitude se trouve-t-il à la fin ?", "Où est-il alors par rapport à la surface ?"],
  },
  {
    k: [2, 5], n: [2, 7], sg: -1, u: " points",
    t: (k, n) => `Au quiz, chaque mauvaise réponse vaut -${k} points. Nina donne ${n} mauvaises réponses.`,
    q: ["Combien de points ces erreurs lui rapportent-elles en tout ?", "Quel total ces mauvaises réponses donnent-elles ?"],
    s: [-4, 10], depart: (v) => `Au début de la manche, Nina a ${v}.`,
    qFin: ["Combien de points a-t-elle à la fin de la manche ?", "Quel est son score à la fin de la manche ?"],
  },
  {
    k: [5, 15], n: [2, 6], sg: -1, u: " €",
    t: (k, n) => `Un abonnement de ${k} € est prélevé chaque mois sur un compte, pendant ${n} mois.`,
    q: ["De combien le solde du compte varie-t-il en tout ?", "Quelle est la variation totale du solde ?"],
    s: [-40, 60], depart: (v) => `Le compte d’Emma affiche ${v}.`,
    tSuite: (k, n) => `Un abonnement de ${k} € y est ensuite prélevé chaque mois, pendant ${n} mois.`,
    qFin: ["Qu’affiche le compte à la fin ?", "Quel est le solde à la fin ?"],
  },
  {
    k: [2, 6], n: [2, 7], sg: -1, u: " cm",
    t: (k, n) => `Le niveau d’un étang baisse de ${k} cm par jour pendant ${n} jours de sécheresse.`,
    q: ["De combien son niveau a-t-il varié ?", "Quelle est la variation totale du niveau de l’étang ?"],
    s: [-20, 10], depart: (v) => `Le niveau d’un étang est à ${v} par rapport à la normale.`,
    tSuite: (k, n) => `Il baisse ensuite de ${k} cm par jour pendant ${n} jours de sécheresse.`,
    qFin: ["Où se situe son niveau à la fin, par rapport à la normale ?", "Quel nombre relatif indique alors l’échelle de l’étang ?"],
  },
  {
    k: [10, 40], n: [2, 9], sg: -1, u: " m",
    t: (k, n) => `Un glacier des Alpes recule de ${k} m par an depuis ${n} ans.`,
    q: ["Quelle est la variation de sa longueur sur cette période ?", "De combien sa longueur a-t-elle varié, en nombre relatif ?"],
  },
  {
    k: [3, 9], n: [2, 8], sg: -1, u: " %",
    t: (k, n) => `La batterie d’un téléphone perd ${k} % de charge par heure pendant ${n} heures.`,
    q: ["Quelle est la variation de la charge, en % ?", "De combien la charge a-t-elle varié ?"],
  },
  {
    k: [4, 8], n: [5, 9], sg: 1, u: " m",
    t: (k, n) => `Un ballon-sonde monte de ${k} m par seconde pendant ${n} secondes.`,
    q: ["De combien son altitude a-t-elle varié ?", "Quelle est la variation de son altitude ?"],
  },
  {
    k: [20, 60], n: [2, 8], sg: -1, u: " m",
    t: (k, n) => `Dans la descente d’un col, l’altitude d’une cycliste diminue de ${k} m par minute pendant ${n} minutes.`,
    q: ["Quelle est la variation de son altitude ?", "De combien son altitude a-t-elle changé ?"],
  },
  {
    k: [2, 4], n: [2, 6], sg: 1, u: " °C",
    t: (k, n) => `Un plat se réchauffe de ${k} °C par minute pendant ${n} minutes.`,
    q: ["De combien sa température a-t-elle varié ?", "Quelle est la variation de sa température ?"],
    s: [-20, -15], depart: (v) => `Un plat sort du congélateur à ${v}.`,
    tSuite: (k, n) => `Il se réchauffe de ${k} °C par minute pendant ${n} minutes.`,
    qFin: ["Quelle est sa température à la fin ?", "À quelle température est-il alors ?"],
  },
];

/** Variation répétée sans départ : (−k) × n. */
function situProduit(maxK?: number): Q {
  const c = randomChoice(REPETS);
  const k = randomInt(c.k[0], maxK ? Math.min(c.k[1], Math.max(c.k[0], maxK)) : c.k[1]);
  const n = randomInt(c.n[0], c.n[1]);
  const v = c.sg * k;
  const r = v * n;
  const text = `${c.t(k, n)} ${randomChoice(c.q)} ${randomChoice(["Donne un nombre relatif.", "Réponds par un nombre relatif.", ""])}`.trim();
  return court(
    text,
    r,
    expl(
      "une même variation répétée plusieurs fois se traduit par un produit.",
      `la variation ${fr(v)} est répétée ${n} fois : on calcule ${p(v)} × ${n}.`,
      `${p(v)} × ${n} = ${r}.`,
      `la variation totale est ${u(r, c.u)}.`
    )
  );
}

/** Variation répétée à partir d'une valeur de départ : s + n × (±k). */
function situRepetee(): Q {
  const avecDepart = REPETS.filter((c) => c.s && c.depart && c.qFin);
  const c = randomChoice(avecDepart);
  const s = randomInt(c.s![0], c.s![1]) || -1;
  const k = randomInt(c.k[0], c.k[1]);
  const n = randomInt(c.n[0], Math.min(c.n[1], 6));
  const v = c.sg * k;
  const f = s + v * n;
  const text = `${c.depart!(u(s, c.u))} ${(c.tSuite ?? c.t)(k, n)} ${randomChoice(c.qFin!)}`;
  return court(
    text,
    f,
    expl(
      "une variation répétée est un produit, qu’on ajoute ensuite à la valeur de départ ; " + PRIO,
      `on calcule ${p(s)} + ${n} × ${p(v)} en commençant par le produit.`,
      `${n} × ${p(v)} = ${v * n}, puis ${p(s)} + ${p(v * n)} = ${f}.`,
      `la valeur finale est ${u(f, c.u)}.`
    )
  );
}

const ELEVES: [string, "il" | "elle"][] = [
  ["Léo", "il"], ["Inès", "elle"], ["Samir", "il"], ["Chloé", "elle"], ["Noah", "il"], ["Maëlle", "elle"],
  ["Yanis", "il"], ["Jade", "elle"], ["Lucas", "il"], ["Aïcha", "elle"], ["Tom", "il"], ["Lina", "elle"],
];

/** Un score de jeu : n1 × g + n2 × (−m). */
function situBareme(): Q {
  const g = randomInt(2, 5);
  const m = randomInt(2, 4);
  const n1 = randomInt(2, 8);
  const n2 = randomInt(2, 7);
  const [nom, pr] = randomChoice(ELEVES);
  const r = n1 * g + n2 * -m;
  const intro = randomChoice([
    `À un quiz, une bonne réponse rapporte ${g} points et une mauvaise en retire ${m}. ${nom} a ${n1} bonnes réponses et ${n2} mauvaises.`,
    `Dans un jeu de cartes, une carte verte vaut ${g} points et une carte rouge vaut -${m} points. ${nom} tire ${n1} cartes vertes et ${n2} cartes rouges.`,
    `Au concours de calcul mental, chaque réponse juste vaut ${g} points et chaque erreur -${m} points. ${nom} a ${n1} réponses justes et ${n2} erreurs.`,
    `Dans un QCM, une réponse juste rapporte ${g} points, une réponse fausse coûte ${m} points. ${nom} répond juste ${n1} fois et faux ${n2} fois.`,
    `Au tir à l’arc, la zone jaune rapporte ${g} points et chaque flèche hors de la cible compte -${m} points. ${nom} tire ${n1} flèches dans le jaune et ${n2} hors de la cible.`,
  ]);
  const text = `${intro} ${randomChoice(["Quel est son score ?", `Combien de points obtient-${pr} au total ?`, "Calcule son total de points."])}`;
  return court(
    text,
    r,
    expl(
      PRIO,
      `le score vaut ${n1} × ${g} + ${n2} × ${p(-m)} : on calcule les produits d’abord.`,
      `${n1} × ${g} = ${n1 * g} et ${n2} × ${p(-m)} = ${-n2 * m}, puis ${n1 * g} + ${p(-n2 * m)} = ${r}.`,
      `le score est ${u(r, " points")}.`
    )
  );
}

/** Une moyenne de relevés relatifs qui tombe juste. */
function situMoyenne(): Q {
  const ctx = randomChoice([
    { lo: -12, hi: 6, u: " °C", t: (l: string, n: number) => `Les températures relevées à 6 h ${n === 3 ? "trois" : "quatre"} matins de suite sont : ${l}.`, q: "Quelle est la température moyenne ?" },
    { lo: -20, hi: -2, u: " °C", t: (l: string, n: number) => `Dans une station de ski, on relève ${n === 3 ? "trois" : "quatre"} nuits de suite : ${l}.`, q: "Quelle est la moyenne de ces relevés ?" },
    { lo: -30, hi: 30, u: " €", t: (l: string, n: number) => `Les bilans de la buvette d’un club sur ${n === 3 ? "trois" : "quatre"} matchs sont : ${l}.`, q: "Quel est le bilan moyen par match ?" },
    { lo: -8, hi: 10, u: " points", t: (l: string, n: number) => `Aux ${n === 3 ? "trois" : "quatre"} manches d’un jeu, Jade marque : ${l}.`, q: "Combien de points marque-t-elle en moyenne par manche ?" },
    { lo: -9, hi: -1, u: " cm", t: (l: string, n: number) => `L’écart du niveau d’une rivière à la normale, ${n === 3 ? "trois" : "quatre"} jours de suite, est : ${l}.`, q: "Quel est l’écart moyen ?" },
  ]);
  const n = randomChoice([3, 4]);
  for (let essai = 0; essai < 200; essai++) {
    const vals = Array.from({ length: n }, () => randomInt(ctx.lo, ctx.hi));
    const somme = vals.reduce((a, b) => a + b, 0);
    if (somme % n !== 0 || somme === 0 || vals.every((v) => v >= 0)) continue;
    const moy = somme / n;
    const liste = vals.map((v) => u(v, ctx.u)).join(" ; ");
    return court(
      `${ctx.t(liste, n)} ${ctx.q}`,
      moy,
      expl(
        "la moyenne est la somme des valeurs divisée par leur nombre.",
        `on additionne les ${n} valeurs, puis on divise par ${n}.`,
        `${vals.map(p).join(" + ")} = ${somme}, puis ${p(somme)} ÷ ${n} = ${moy}.`,
        `la moyenne est ${u(moy, ctx.u)}.`
      )
    );
  }
  return situBareme();
}

/* ---------------------------------------------------------------------------
   ADDITION
--------------------------------------------------------------------------- */
const PHRASES_SOMME: ((a: number, b: number) => string)[] = [
  (a, b) => `Quelle est la somme de ${a} et de ${b} ?`,
  (a, b) => `Ajoute ${b} à ${a}.`,
  (a, b) => `Additionne les nombres ${a} et ${b}.`,
  (a, b) => `Quel nombre obtient-on en ajoutant ${b} à ${a} ?`,
  (a, b) =>
    `Sur une droite graduée, on part du point d’abscisse ${a} et on ${b > 0 ? "avance" : "recule"} de ${u(abs(b), " unités")}. Quelle est l’abscisse du point d’arrivée ?`,
];

function genAddition(kind: "simple" | "libre" | "negatifs" | "contraires"): Q {
  let a = 0;
  let b = 0;
  const max = kind === "simple" ? 9 : 15;
  if (kind === "negatifs") {
    a = -randomInt(2, 12);
    b = -randomInt(2, 12);
  } else if (kind === "contraires") {
    const pos = randomInt(2, 12);
    const ng = -randomInt(2, 12);
    [a, b] = Math.random() < 0.5 ? [ng, pos] : [pos, ng];
  } else {
    do {
      a = nz(1, max);
      b = nz(1, max);
    } while (a > 0 && b > 0);
  }
  const r = a + b;
  const e = `${t0(a)} + ${p(b)}`;
  const meth =
    a * b > 0
      ? `${abs(a)} + ${abs(b)} = ${abs(r)} et le signe reste ${signe(a)}.`
      : `${Math.max(abs(a), abs(b))} - ${Math.min(abs(a), abs(b))} = ${abs(r)}${r === 0 ? " : les deux nombres sont opposés" : ` et on garde le signe de ${abs(a) > abs(b) ? a : b}`}.`;
  const explanation = expl(REGLE_SOMME(a, b), meth, `${e} = ${r}.`, `${e} = ${r}.`);
  const x = Math.random();
  if (x < 0.45) return court(poser(e), r, explanation);
  if (x < 0.7) return court(randomChoice(PHRASES_SOMME)(a, b), r, explanation);
  const ok =
    kind === "negatifs"
      ? (s: number, d: number) => s < 0 && d < 0
      : kind === "contraires"
        ? (s: number, d: number) => s * d < 0
        : undefined;
  return situVariation(SIT_TOUTES, ok);
}

function genAdditionTrois(): Q {
  const n = Math.random() < 0.75 ? 3 : 4;
  let vals: number[] = [];
  do {
    vals = Array.from({ length: n }, () => nz(1, 9));
  } while (vals.every((v) => v > 0));
  const r = vals.reduce((a, b) => a + b, 0);
  const e = vals.map((v, i) => (i === 0 ? t0(v) : p(v))).join(" + ");
  const partiels: string[] = [];
  let acc = vals[0];
  for (let i = 1; i < n; i++) {
    partiels.push(`${p(acc)} + ${p(vals[i])} = ${acc + vals[i]}`);
    acc += vals[i];
  }
  const explanation = expl(
    "on additionne plusieurs relatifs en tenant compte de leurs signes.",
    "on calcule de gauche à droite (on peut aussi regrouper les positifs et les négatifs).",
    `${partiels.join(", puis ")}.`,
    `${e} = ${r}.`
  );
  const x = Math.random();
  if (x < 0.5) return court(poser(e), r, explanation);
  if (x < 0.7) {
    const liste = `${vals.slice(0, -1).join(", ")} et ${vals[n - 1]}`;
    return court(
      randomChoice([
        `Calcule la somme des nombres ${liste}.`,
        `Quelle est la somme de ${liste} ?`,
        `Additionne les nombres relatifs ${liste}.`,
      ]),
      r,
      explanation
    );
  }
  return situDouble(SIT_TOUTES);
}

/* ---------------------------------------------------------------------------
   SOUSTRACTION
--------------------------------------------------------------------------- */
const PHRASES_DIFF: ((a: number, b: number, e: string) => string)[] = [
  (a, b) => `Calcule la différence de ${a} et de ${b}.`,
  (a, b) => `Au nombre ${a}, on soustrait ${b}. Quel nombre obtient-on ?`,
  (a, b) => `Quel nombre faut-il ajouter à ${b} pour obtenir ${a} ?`,
  (_a, _b, e) => `Écris ${e} sous la forme d’une addition, puis donne le résultat.`,
  (a, b) => `Soustrais ${b} de ${a}.`,
];

function genSoustraction(kind: "simple" | "libre" | "moinsNeg"): Q {
  let a = 0;
  let b = 0;
  do {
    if (kind === "simple") {
      a = nz(1, 9);
      b = nz(1, 9);
    } else if (kind === "libre") {
      a = nz(1, 12);
      b = nz(1, 12);
    } else {
      a = nz(1, 12);
      b = -randomInt(2, 10);
    }
  } while (a > 0 && b > 0 && a >= b);
  const r = a - b;
  const e = `${t0(a)} - ${p(b)}`;
  const explanation = expl(
    "soustraire un nombre revient à ajouter son opposé.",
    `l’opposé de ${b} est ${-b}, donc ${e} = ${p(a)} + ${p(-b)}.`,
    `${p(a)} + ${p(-b)} = ${r}.`,
    `${e} = ${r}.`
  );
  const x = Math.random();
  if (x < 0.45) return court(poser(e), r, explanation);
  if (x < 0.72) return court(randomChoice(PHRASES_DIFF)(a, b, e), r, explanation);
  return situVariationLue(SIT_TOUTES);
}

function genSoustractionChaine(): Q {
  const a = nz(1, 9);
  const b = nz(1, 9);
  const c = nz(1, 9);
  const forme = randomInt(0, 2);
  const ops: ("+" | "-")[] = forme === 0 ? ["-", "-"] : forme === 1 ? ["-", "+"] : ["+", "-"];
  const r = a + (ops[0] === "+" ? b : -b) + (ops[1] === "+" ? c : -c);
  const e = `${t0(a)} ${ops[0]} ${p(b)} ${ops[1]} ${p(c)}`;
  const enAdd = `${p(a)} + ${p(ops[0] === "+" ? b : -b)} + ${p(ops[1] === "+" ? c : -c)}`;
  const explanation = expl(
    "chaque soustraction se transforme en addition de l’opposé.",
    `${e} = ${enAdd}.`,
    `${enAdd} = ${r}.`,
    `le résultat est ${r}.`
  );
  if (Math.random() < 0.75) return court(poser(e), r, explanation);
  return court(
    randomChoice([
      `Transforme les soustractions en additions, puis calcule ${e}.`,
      `Réécris ${e} avec uniquement des additions, puis donne sa valeur.`,
      `En ajoutant les opposés, calcule ${e}.`,
    ]),
    r,
    explanation
  );
}

/* ---------------------------------------------------------------------------
   MULTIPLICATION ET DIVISION
--------------------------------------------------------------------------- */
const PHRASES_PRODUIT: ((a: number, b: number) => string)[] = [
  (a, b) => `Quel est le produit de ${a} par ${b} ?`,
  (a, b) => `Multiplie ${a} par ${b}.`,
  (a, b) => `Quel nombre obtient-on en multipliant ${a} par ${b} ?`,
  (a, b) =>
    b === 2 ? `Quel est le double de ${a} ?` : b === 3 ? `Quel est le triple de ${a} ?` : `Calcule le produit des nombres ${a} et ${b}.`,
];

function genMultiplication(kind: "simple" | "libre"): Q {
  const m = kind === "simple" ? 6 : 10;
  let a = 0;
  let b = 0;
  do {
    a = nz(2, m);
    b = nz(2, m);
  } while (a > 0 && b > 0);
  const r = a * b;
  const e = `${t0(a)} × ${p(b)}`;
  const explanation = expl(
    REGLE_PRODUIT,
    `les facteurs ont ${a * b > 0 ? "le même signe" : "des signes contraires"} : le produit est ${signe(r)}.`,
    `${abs(a)} × ${abs(b)} = ${abs(r)}, donc ${e} = ${r}.`,
    `${e} = ${r}.`
  );
  const x = Math.random();
  if (x < 0.45) return court(poser(e), r, explanation);
  if (x < 0.7) return court(randomChoice(PHRASES_PRODUIT)(a, b), r, explanation);
  return situProduit(kind === "simple" ? 6 : undefined);
}

function genMultiplicationTrois(): Q {
  const n = Math.random() < 0.75 ? 3 : 4;
  let f: number[] = [];
  do {
    f = Array.from({ length: n }, (_, i) => (n === 4 && i === 3 ? randomChoice([-1, 2, -2]) : nz(2, 5)));
  } while (f.every((v) => v > 0));
  f = shuffle(f);
  const r = f.reduce((a, b) => a * b, 1);
  const nbNeg = f.filter((v) => v < 0).length;
  const e = f.map((v, i) => (i === 0 ? t0(v) : p(v))).join(" × ");
  const explanation = expl(
    "le signe d’un produit dépend du nombre de facteurs négatifs : pair → positif, impair → négatif.",
    `il y a ${nbNeg} facteur${nbNeg > 1 ? "s" : ""} négatif${nbNeg > 1 ? "s" : ""} (${nbNeg % 2 === 0 ? "pair" : "impair"}) : le produit est ${signe(r)}.`,
    `${f.map(abs).join(" × ")} = ${abs(r)}, donc ${e} = ${r}.`,
    `le résultat est ${r}.`
  );
  if (Math.random() < 0.75) return court(poser(e), r, explanation);
  return court(
    randomChoice([
      `Calcule le produit des nombres ${f.slice(0, -1).join(", ")} et ${f[n - 1]}.`,
      `Trouve d’abord le signe, puis la valeur de ${e}.`,
      `Compte les facteurs négatifs, puis calcule ${e}.`,
    ]),
    r,
    explanation
  );
}

/** « (-4) × … = 20 » : le facteur manquant. */
function genFacteurManquant(): Q {
  const a = nz(2, 9);
  const x = nz(2, 9);
  const r = a * x;
  const forme = randomInt(0, 2);
  const e = forme === 0 ? `${t0(a)} × … = ${r}` : `… × ${p(a)} = ${r}`;
  const text =
    forme === 2
      ? randomChoice([`Par quel nombre faut-il multiplier ${a} pour obtenir ${r} ?`, `Quel nombre, multiplié par ${a}, donne ${r} ?`])
      : randomChoice([`Trouve le nombre manquant : ${e}`, `Complète : ${e}`, `Quel nombre faut-il écrire à la place des pointillés ? ${e}`]);
  return court(
    text,
    x,
    expl(
      REGLE_PRODUIT,
      `le nombre cherché est le quotient ${r} ÷ ${p(a)}.`,
      `${p(r)} ÷ ${p(a)} = ${x} ; vérification : ${p(a)} × ${p(x)} = ${r}.`,
      `le nombre manquant est ${x}.`
    )
  );
}

const SIGNE_Q: ((e: string) => string)[] = [
  (e) => `Sans calculer le résultat, quel est le signe de ${e} ?`,
  (e) => `Le nombre ${e} est-il positif ou négatif ?`,
  (e) => `Sans effectuer le calcul, dis si ${e} est positif ou négatif.`,
  (e) => `Quel sera le signe du résultat de ${e} ?`,
  (e) => `On ne demande pas la valeur : de quel signe est ${e} ?`,
];

function genSigne(op: "×" | "÷"): Q {
  let e = "";
  let positif = true;
  let facteurs: number[] = [];
  if (op === "×") {
    const n = Math.random() < 0.7 ? 2 : 3;
    do {
      facteurs = Array.from({ length: n }, () => nz(2, 9));
    } while (facteurs.every((v) => v > 0));
    e = facteurs.map((v, i) => (i === 0 ? t0(v) : p(v))).join(" × ");
    positif = facteurs.reduce((a, b) => a * b, 1) > 0;
  } else {
    let q = 0;
    let d = 0;
    do {
      q = nz(2, 8);
      d = nz(2, 8);
    } while (q * d > 0 && d > 0);
    facteurs = [q * d, d];
    e = `${t0(q * d)} ÷ ${p(d)}`;
    positif = q > 0;
  }
  const nbNeg = facteurs.filter((v) => v < 0).length;
  return {
    text: randomChoice(SIGNE_Q)(e),
    format: "qcm",
    choices: ["positif", "négatif"],
    expected: [positif ? "positif" : "négatif"],
    comparator: "mcq_exact",
    explanation: expl(
      op === "×"
        ? "le signe d’un produit dépend du nombre de facteurs négatifs : pair → positif, impair → négatif."
        : "le signe d’un quotient suit la règle des signes : même signe → positif, signes contraires → négatif.",
      "on regarde seulement les signes, sans calculer.",
      `${e} contient ${nbNeg} nombre${nbNeg > 1 ? "s" : ""} négatif${nbNeg > 1 ? "s" : ""}.`,
      `le résultat est ${positif ? "positif" : "négatif"}.`
    ),
  };
}

const PHRASES_QUOT: ((D: number, d: number) => string)[] = [
  (D, d) => `Quel est le quotient de ${D} par ${d} ?`,
  (D, d) => `Divise ${D} par ${d}.`,
  (D, d) => `Quel nombre, multiplié par ${d}, donne ${D} ?`,
  (D, d) => `Combien vaut ${D} divisé par ${d} ?`,
  (D, d) => `Quel nombre faut-il multiplier par ${d} pour obtenir ${D} ?`,
  (D, d) => `Trouve le nombre manquant : ${p(d)} × … = ${D}`,
  (D, d) =>
    d > 0 ? `On partage ${D} en ${d} parts égales. Que vaut chaque part ?` : `Calcule le quotient ${t0(D)} ÷ ${p(d)} en commençant par son signe.`,
  (D, d) => (d === 2 ? `Quelle est la moitié de ${D} ?` : `Donne le résultat de la division de ${D} par ${d}.`),
];

type Partage = { k: [number, number]; n: [number, number]; t: (T: number, n: number) => string; q: string[]; u: string };
const PARTAGES: Partage[] = [
  { k: [2, 5], n: [2, 6], u: " °C", t: (T, n) => `La température a baissé de ${T} °C en ${n} heures, de la même quantité chaque heure.`, q: ["Quelle est la variation de température par heure ?", "De combien varie-t-elle chaque heure, en nombre relatif ?"] },
  { k: [5, 20], n: [2, 5], u: " €", t: (T, n) => `Une dette de ${T} € est partagée à parts égales entre ${n} amis.`, q: ["Quelle part revient à chacun, écrite comme un nombre relatif ?", "Quel nombre relatif représente la part de chacun ?"] },
  { k: [2, 6], n: [2, 6], u: " m", t: (T, n) => `Un plongeur est descendu de ${T} m en ${n} paliers identiques.`, q: ["Quelle est la variation d’altitude à chaque palier ?", "De combien varie son altitude à chaque palier ?"] },
  { k: [2, 8], n: [2, 7], u: " cm", t: (T, n) => `Le niveau d’un lac a baissé de ${T} cm en ${n} jours, de la même quantité chaque jour.`, q: ["Quelle est la variation du niveau par jour ?", "De combien le niveau varie-t-il chaque jour ?"] },
  { k: [10, 30], n: [2, 6], u: " m", t: (T, n) => `Un glacier a perdu ${T} m de longueur en ${n} ans, régulièrement.`, q: ["Quelle est la variation de sa longueur par an ?", "De combien sa longueur varie-t-elle chaque année ?"] },
  { k: [2, 6], n: [2, 5], u: " points", t: (T, n) => `En ${n} manches, une équipe a perdu ${T} points, autant à chaque manche.`, q: ["Quelle est la variation de son score à chaque manche ?", "Combien de points, en nombre relatif, a-t-elle eus par manche ?"] },
  { k: [10, 40], n: [2, 6], u: " m", t: (T, n) => `Un sous-marin descend de ${T} m en ${n} minutes, à vitesse constante.`, q: ["Quelle est la variation de son altitude par minute ?", "De combien son altitude varie-t-elle chaque minute ?"] },
  { k: [10, 40], n: [2, 6], u: " €", t: (T, n) => `En ${n} mois, le solde d’un compte a baissé de ${T} €, de la même somme chaque mois.`, q: ["Quelle est la variation du solde par mois ?", "De combien le solde varie-t-il chaque mois ?"] },
  { k: [20, 50], n: [2, 5], u: " m", t: (T, n) => `Une montgolfière perd ${T} m d’altitude en ${n} minutes, régulièrement.`, q: ["Quelle est la variation de son altitude par minute ?", "De combien son altitude varie-t-elle chaque minute ?"] },
  { k: [2, 8], n: [2, 6], u: " %", t: (T, n) => `La batterie d’une tablette a perdu ${T} % de charge en ${n} heures, autant chaque heure.`, q: ["Quelle est la variation de la charge par heure, en % ?", "De combien la charge varie-t-elle chaque heure ?"] },
  { k: [2, 5], n: [2, 6], u: " °C", t: (T, n) => `Dans un congélateur, un plat a perdu ${T} °C en ${n} minutes, autant chaque minute.`, q: ["Quelle est la variation de sa température par minute ?", "De combien sa température varie-t-elle chaque minute ?"] },
];

function situPartage(maxK?: number): Q {
  const c = randomChoice(PARTAGES);
  const k = randomInt(c.k[0], maxK ? Math.max(c.k[0], Math.min(c.k[1], maxK)) : c.k[1]);
  const n = randomInt(c.n[0], c.n[1]);
  const T = k * n;
  const r = -k;
  const text = `${c.t(T, n)} ${randomChoice(c.q)}`;
  return court(
    text,
    r,
    expl(
      "partager une variation en parts égales, c’est diviser.",
      `une baisse de ${T} s’écrit ${-T} ; on la divise par ${n}.`,
      `${p(-T)} ÷ ${n} = ${r}.`,
      `la variation est ${u(r, c.u)} à chaque fois.`
    )
  );
}

function genDivision(kind: "simple" | "libre" | "negPos"): Q {
  let q = 0;
  let d = 0;
  if (kind === "negPos") {
    q = -randomInt(2, 10);
    d = randomInt(2, 8);
  } else {
    const m = kind === "simple" ? 6 : 10;
    do {
      q = nz(2, m);
      d = nz(2, kind === "simple" ? 6 : 9);
    } while (q > 0 && d > 0);
  }
  const D = q * d;
  const e = `${t0(D)} ÷ ${p(d)}`;
  const explanation = expl(
    REGLE_PRODUIT,
    `${D} et ${d} ont ${D * d > 0 ? "le même signe" : "des signes contraires"} : le quotient est ${signe(q)}.`,
    `${abs(D)} ÷ ${abs(d)} = ${abs(q)}, donc ${e} = ${q}.`,
    `${e} = ${q}.`
  );
  const x = Math.random();
  if (x < 0.45) return court(poser(e), q, explanation);
  if (x < 0.7) return court(randomChoice(PHRASES_QUOT)(D, d), q, explanation);
  return situPartage(kind === "simple" ? 6 : undefined);
}

/* ---------------------------------------------------------------------------
   CALCULS AVEC PRIORITÉS
--------------------------------------------------------------------------- */
type Forme = () => { e?: string; text?: string; r: number; def: string; meth: string; calc: string };
const LETTRES_VAR = ["x", "a", "t", "n", "y"];
/** 3x, x, -x, -4t : jamais « 1x ». */
const coef = (k: number, L: string) => (k === 1 ? L : k === -1 ? `-${L}` : `${k}${L}`);

const FORMES_3: Forme[] = [
  () => {
    const a = nz(2, 8), b = nz(2, 6), c = nz(1, 10);
    const r = a * b + c;
    return { e: `${t0(a)} × ${p(b)} + ${p(c)}`, r, def: PRIO, meth: "on calcule d’abord le produit.", calc: `${p(a)} × ${p(b)} = ${a * b}, puis ${p(a * b)} + ${p(c)} = ${r}` };
  },
  () => {
    const a = nz(2, 8), b = nz(2, 6), c = nz(1, 10);
    const r = c + a * b;
    return { e: `${t0(c)} + ${p(a)} × ${p(b)}`, r, def: PRIO, meth: "on calcule d’abord le produit.", calc: `${p(a)} × ${p(b)} = ${a * b}, puis ${p(c)} + ${p(a * b)} = ${r}` };
  },
  () => {
    const a = nz(2, 8), b = nz(2, 6), c = nz(1, 10);
    const r = a * b - c;
    return { e: `${t0(a)} × ${p(b)} - ${p(c)}`, r, def: PRIO, meth: "on calcule d’abord le produit, puis on ajoute l’opposé.", calc: `${p(a)} × ${p(b)} = ${a * b}, puis ${p(a * b)} - ${p(c)} = ${p(a * b)} + ${p(-c)} = ${r}` };
  },
  () => {
    const a = nz(2, 8), b = nz(2, 6), c = nz(1, 10);
    const r = c - a * b;
    return { e: `${t0(c)} - ${p(a)} × ${p(b)}`, r, def: PRIO, meth: "on calcule d’abord le produit, puis on ajoute l’opposé.", calc: `${p(a)} × ${p(b)} = ${a * b}, puis ${p(c)} - ${p(a * b)} = ${p(c)} + ${p(-a * b)} = ${r}` };
  },
  () => {
    const q = nz(2, 6), d = nz(2, 5), c = nz(1, 10);
    const D = q * d;
    const r = q + c;
    return { e: `${t0(D)} ÷ ${p(d)} + ${p(c)}`, r, def: PRIO, meth: "on calcule d’abord le quotient.", calc: `${p(D)} ÷ ${p(d)} = ${q}, puis ${p(q)} + ${p(c)} = ${r}` };
  },
  () => {
    const q = nz(2, 6), d = nz(2, 5), c = nz(1, 10);
    const D = q * d;
    const r = c - q;
    return { e: `${t0(c)} - ${p(D)} ÷ ${p(d)}`, r, def: PRIO, meth: "on calcule d’abord le quotient, puis on ajoute l’opposé.", calc: `${p(D)} ÷ ${p(d)} = ${q}, puis ${p(c)} - ${p(q)} = ${r}` };
  },
  () => {
    const L = randomChoice(LETTRES_VAR);
    const k = nz(1, 6), c = nz(1, 9), v = nz(1, 6);
    const ex = `${coef(k, L)} ${c < 0 ? "-" : "+"} ${abs(c)}`;
    const r = k * v + c;
    const text = randomChoice([
      `Calcule ${ex} pour ${L} = ${v}.`,
      `Quelle est la valeur de ${ex} lorsque ${L} = ${v} ?`,
      `On remplace ${L} par ${v} dans l’expression ${ex}. Quel résultat obtient-on ?`,
    ]);
    return { text, r, def: PRIO, meth: `on remplace ${L} par ${p(v)}, puis on calcule le produit d’abord.`, calc: `${k} × ${p(v)} ${c < 0 ? "-" : "+"} ${abs(c)} = ${p(k * v)} ${c < 0 ? "-" : "+"} ${abs(c)} = ${r}` };
  },
];

const FORMES_4: Forme[] = [
  () => {
    const a = nz(1, 8), b = nz(1, 8), k = nz(2, 5);
    const r = (a + b) * k;
    return { e: `(${a} + ${p(b)}) × ${p(k)}`, r, def: PAR, meth: "on calcule la parenthèse, puis on multiplie.", calc: `${a} + ${p(b)} = ${a + b}, puis ${p(a + b)} × ${p(k)} = ${r}` };
  },
  () => {
    const a = nz(1, 10), b = nz(2, 6), c = nz(2, 6);
    const r = a + b * c;
    return { e: `${t0(a)} + ${p(b)} × ${p(c)}`, r, def: PRIO, meth: "on calcule d’abord le produit.", calc: `${p(b)} × ${p(c)} = ${b * c}, puis ${p(a)} + ${p(b * c)} = ${r}` };
  },
  () => {
    const q = nz(2, 6), d = nz(2, 5);
    let b = nz(1, 8);
    if (q * d + b === 0) b = -b;
    const a = q * d + b;
    const r = q;
    return { e: `(${a} - ${p(b)}) ÷ ${p(d)}`, r, def: PAR, meth: "on calcule la parenthèse, puis on divise.", calc: `${a} - ${p(b)} = ${a - b}, puis ${p(a - b)} ÷ ${p(d)} = ${r}` };
  },
  () => {
    const a = nz(1, 8), b = nz(1, 8), k = nz(2, 5);
    const r = (a - b) * k;
    return { e: `${t0(k)} × (${a} - ${p(b)})`, r, def: PAR, meth: "on calcule la parenthèse, puis on multiplie.", calc: `${a} - ${p(b)} = ${a - b}, puis ${p(k)} × ${p(a - b)} = ${r}` };
  },
  () => {
    const a = nz(2, 6), b = nz(2, 6), c = nz(2, 6), d = nz(2, 6);
    const r = a * b + c * d;
    return { e: `${t0(a)} × ${p(b)} + ${p(c)} × ${p(d)}`, r, def: PRIO, meth: "on calcule les deux produits, puis on additionne.", calc: `${p(a)} × ${p(b)} = ${a * b} et ${p(c)} × ${p(d)} = ${c * d}, puis ${p(a * b)} + ${p(c * d)} = ${r}` };
  },
  () => {
    const a = nz(1, 12), b = nz(1, 8), c = nz(1, 8);
    const r = a - (b + c);
    return { e: `${t0(a)} - (${b} + ${p(c)})`, r, def: PAR, meth: "on calcule la parenthèse, puis on soustrait.", calc: `${b} + ${p(c)} = ${b + c}, puis ${p(a)} - ${p(b + c)} = ${r}` };
  },
  () => {
    let a = 0, s = 0, b = 0;
    do {
      s = nz(2, 5);
      a = nz(1, 8);
      b = s - a;
    } while (b === 0);
    const q = nz(2, 6);
    const D = q * s;
    return { e: `${t0(D)} ÷ (${a} + ${p(b)})`, r: q, def: PAR, meth: "on calcule la parenthèse, puis on divise.", calc: `${a} + ${p(b)} = ${s}, puis ${p(D)} ÷ ${p(s)} = ${q}` };
  },
  () => {
    const L = randomChoice(LETTRES_VAR);
    const k = nz(2, 5), c = nz(1, 6), v = nz(1, 6);
    const ex = `${k}(${L} ${c < 0 ? "-" : "+"} ${abs(c)})`;
    const r = k * (v + c);
    const text = randomChoice([
      `Calcule ${ex} pour ${L} = ${v}.`,
      `Quelle est la valeur de ${ex} lorsque ${L} = ${v} ?`,
      `On remplace ${L} par ${v} dans ${ex}. Quel nombre obtient-on ?`,
    ]);
    return { text, r, def: PAR, meth: `on remplace ${L} par ${p(v)}, on calcule la parenthèse, puis on multiplie.`, calc: `${p(v)} ${c < 0 ? "-" : "+"} ${abs(c)} = ${v + c}, puis ${k} × ${p(v + c)} = ${r}` };
  },
];

/** Un calcul de relatifs montre au moins un nombre négatif, et une parenthèse ne vaut pas 0. */
function avecNegatif(forme: Forme) {
  let o = forme();
  for (let k = 0; k < 30; k++) {
    const vu = o.text ?? o.e ?? "";
    // « = 0, puis » : une étape intermédiaire nulle, comme (4 - 4) × (-2).
    if (/-\d|\(-/.test(vu) && !/= 0(,| et)/.test(o.calc)) break;
    o = forme();
  }
  return o;
}

function genCalcul(etoile: 3 | 4, prefere: number): Q {
  const formes = etoile === 3 ? FORMES_3 : FORMES_4;
  const x = Math.random();
  if (x < 0.22) return etoile === 3 ? situRepetee() : randomChoice([situBareme, situMoyenne])();
  const forme = x < 0.5 ? formes[prefere] : randomChoice(formes);
  const o = avecNegatif(forme);
  const text = o.text ?? poser(o.e!);
  return court(text, o.r, expl(o.def, o.meth, `${o.calc}.`, `le résultat est ${o.r}.`));
}

const FORMES_5: Forme[] = [
  FORMES_4[4],
  () => {
    const a = nz(2, 6), b = nz(2, 6), c = nz(2, 6), d = nz(2, 6);
    const r = a * b - c * d;
    return { e: `${t0(a)} × ${p(b)} - ${p(c)} × ${p(d)}`, r, def: PRIO, meth: "on calcule les deux produits, puis on soustrait.", calc: `${p(a)} × ${p(b)} = ${a * b} et ${p(c)} × ${p(d)} = ${c * d}, puis ${p(a * b)} - ${p(c * d)} = ${r}` };
  },
  () => {
    const a = nz(1, 6), b = nz(1, 6), c = nz(1, 6), d = nz(1, 6);
    const r = (a - b) * (c + d);
    return { e: `(${a} - ${p(b)}) × (${c} + ${p(d)})`, r, def: PAR, meth: "on calcule les deux parenthèses, puis on multiplie.", calc: `${a} - ${p(b)} = ${a - b} et ${c} + ${p(d)} = ${c + d}, puis ${p(a - b)} × ${p(c + d)} = ${r}` };
  },
  () => {
    const q = nz(2, 6), d = nz(2, 5), c = nz(2, 5), f = nz(2, 5);
    const D = q * d;
    const r = q - c * f;
    return { e: `${t0(D)} ÷ ${p(d)} - ${p(c)} × ${p(f)}`, r, def: PRIO, meth: "on calcule le quotient et le produit, puis on soustrait.", calc: `${p(D)} ÷ ${p(d)} = ${q} et ${p(c)} × ${p(f)} = ${c * f}, puis ${p(q)} - ${p(c * f)} = ${r}` };
  },
  () => {
    const a = nz(1, 10), b = nz(2, 5), c = nz(1, 6), d = nz(1, 6);
    const r = a - b * (c - d);
    return { e: `${t0(a)} - ${p(b)} × (${c} - ${p(d)})`, r, def: `${PAR} Puis ${PRIO}`, meth: "parenthèse, puis produit, puis soustraction.", calc: `${c} - ${p(d)} = ${c - d}, puis ${p(b)} × ${p(c - d)} = ${b * (c - d)}, puis ${p(a)} - ${p(b * (c - d))} = ${r}` };
  },
  () => {
    const [L1, L2] = shuffle(LETTRES_VAR).slice(0, 2);
    const k1 = nz(2, 5), k2 = randomInt(2, 5), v1 = nz(1, 5), v2 = nz(1, 5);
    const ex = `${coef(k1, L1)} - ${coef(k2, L2)}`;
    const r = k1 * v1 - k2 * v2;
    const text = randomChoice([
      `Calcule ${ex} pour ${L1} = ${v1} et ${L2} = ${v2}.`,
      `Quelle est la valeur de ${ex} lorsque ${L1} = ${v1} et ${L2} = ${v2} ?`,
    ]);
    return { text, r, def: PRIO, meth: `on remplace ${L1} et ${L2}, puis on calcule les produits d’abord.`, calc: `${k1} × ${p(v1)} = ${k1 * v1} et ${k2} × ${p(v2)} = ${k2 * v2}, puis ${p(k1 * v1)} - ${p(k2 * v2)} = ${r}` };
  },
];

/* ---------------------------------------------------------------------------
   DÉFIS : erreurs typiques, expressions à comparer, nombres manquants.
--------------------------------------------------------------------------- */
type Erreur = { e: string; juste: number; faux: number; regle: string; mots: string[] };
const ERREURS: (() => Erreur)[] = [
  () => {
    const a = randomInt(2, 9), b = randomInt(2, 9);
    return { e: `${t0(-a)} × (${-b})`, juste: a * b, faux: -a * b, regle: "le produit de deux nombres négatifs est positif", mots: ["deux", "négatifs", "positif", "signe"] };
  },
  () => {
    const a = nz(2, 9), b = randomInt(2, 9);
    return { e: `${t0(a)} - (${-b})`, juste: a + b, faux: a - b, regle: "soustraire un nombre négatif revient à ajouter son opposé", mots: ["opposé", "ajouter", "additionner", "soustraire"] };
  },
  () => {
    const a = randomInt(2, 9), b = randomInt(2, 9);
    return { e: `${t0(-a)} + (${-b})`, juste: -(a + b), faux: a + b, regle: "la somme de deux nombres négatifs est négative", mots: ["négatif", "négative", "somme", "signe"] };
  },
  () => {
    let a = 0, b = 0, c = 0;
    do {
      a = nz(2, 9);
      b = randomInt(2, 6);
      c = nz(2, 6);
    } while ((a + b) * c === a + b * c);
    return { e: `${t0(a)} + ${b} × ${p(c)}`, juste: a + b * c, faux: (a + b) * c, regle: "la multiplication est prioritaire sur l’addition", mots: ["priorité", "prioritaire", "multiplication", "d’abord", "d'abord"] };
  },
  () => {
    const q = randomInt(2, 9), d = randomInt(2, 9);
    return { e: `${t0(-q * d)} ÷ ${d}`, juste: -q, faux: q, regle: "le quotient de deux nombres de signes contraires est négatif", mots: ["signes contraires", "négatif", "signe"] };
  },
  () => {
    const g = randomInt(5, 12), s = randomInt(2, g - 1);
    return { e: `${t0(-g)} + ${s}`, juste: s - g, faux: g - s, regle: "pour deux nombres de signes contraires, le résultat prend le signe du plus éloigné de zéro", mots: ["signe", "éloigné", "distance", "négatif"] };
  },
  () => {
    const a = randomInt(2, 8), b = randomInt(a + 2, 15);
    return { e: `${a} - ${b}`, juste: a - b, faux: b - a, regle: "quand on retire plus que ce qu’on a, le résultat est négatif", mots: ["négatif", "opposé", "ajouter", "signe"] };
  },
];

function genAffirmation(): Q {
  const er = randomChoice(ERREURS)();
  const vrai = Math.random() < 0.4;
  const v = vrai ? er.juste : er.faux;
  const [nom, pr] = randomChoice(ELEVES);
  const forme = randomInt(0, 3);
  const vf = forme === 2;
  const text = [
    `${nom} affirme que ${er.e} = ${v}. A-t-${pr} raison ?`,
    `${nom} écrit au tableau : ${er.e} = ${v}. Son calcul est-il juste ?`,
    `Vrai ou faux : ${er.e} = ${v}.`,
    `Dans sa copie, ${nom} a trouvé ${v} pour ${er.e}. Est-ce correct ?`,
  ][forme];
  const bonne = vf ? (vrai ? "vrai" : "faux") : vrai ? "oui" : "non";
  return {
    text,
    format: "qcm",
    choices: vf ? ["vrai", "faux"] : ["oui", "non"],
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: expl(
      `${er.regle}.`,
      `on refait le calcul ${er.e}.`,
      `${er.e} = ${er.juste}.`,
      vrai ? `${vf ? "vrai" : "oui"}, ${er.e} = ${er.juste}.` : `${vf ? "faux" : "non"}, le bon résultat est ${er.juste}, pas ${v}.`
    ),
  };
}

function genLaquelle(): Q {
  let a = 0, b = 0;
  do {
    a = -randomInt(2, 9);
    b = randomInt(2, 9);
  } while (abs(a) === b);
  const exprs: [string, number][] = [
    [`${p(a)} × ${p(-b)}`, a * -b],
    [`${p(-b)} × ${p(a)}`, -b * a],
    [`${b} - ${p(a)}`, b - a],
    [`${p(a)} × ${p(a)}`, a * a],
    [`${p(a)} × ${b}`, a * b],
    [`${p(a)} + ${p(-b)}`, a - b],
    [`${p(a)} - ${b}`, a - b],
    [`${p(-b)} + ${p(a)}`, -b + a],
    [`${b} × ${p(a)}`, b * a],
    [`${p(a)} + ${b}`, a + b],
    [`${p(a)} - ${p(-b)}`, a + b],
  ];
  const cherche = randomChoice(["positif", "négatif"] as const);
  const bons = exprs.filter(([, v]) => (cherche === "positif" ? v > 0 : v < 0));
  const autres = exprs.filter(([, v]) => (cherche === "positif" ? v < 0 : v > 0));
  const bon = randomChoice(bons);
  const leurres = shuffle(autres).slice(0, 3);
  const valeurs = [bon, ...leurres].map(([s, v]) => `${s} = ${v}`).join(" ; ");
  const text = randomChoice([
    `Laquelle de ces expressions est égale à un nombre ${cherche} ?`,
    `Parmi ces calculs, lequel donne un résultat ${cherche} ?`,
    `Sans tout calculer, repère l’expression dont le résultat est ${cherche}.`,
    `Une seule de ces expressions a un résultat ${cherche}. Laquelle ?`,
  ]);
  return {
    text,
    format: "qcm",
    choices: shuffle([bon[0], ...leurres.map(([s]) => s)]),
    expected: [bon[0]],
    comparator: "mcq_exact",
    explanation: expl(
      "on applique la règle des signes à chaque expression.",
      "produit ou quotient : même signe → positif ; somme : on regarde le plus éloigné de zéro.",
      `${valeurs}.`,
      `l’expression ${bon[0]} est la seule dont le résultat est ${cherche}.`
    ),
  };
}

function genManquant(): Q {
  // Un défi de relatifs : au moins un négatif dans l'égalité ou dans la réponse.
  for (let k = 0; k < 30; k++) {
    const q = genManquant0();
    if (/[\s(]-\d/.test(q.text) || /^-/.test(q.expected[0])) return q;
  }
  return genManquant0();
}

function genManquant0(): Q {
  const forme = randomInt(0, 5);
  let e = "";
  let x = 0;
  let verif = "";
  if (forme === 0) {
    const a = nz(2, 12);
    x = nz(2, 12);
    e = `${t0(a)} + … = ${a + x}`;
    verif = `${p(a + x)} - ${p(a)} = ${x}`;
  } else if (forme === 1) {
    const b = nz(2, 12);
    x = nz(2, 12);
    e = `… - ${p(b)} = ${x - b}`;
    verif = `${p(x - b)} + ${p(b)} = ${x}`;
  } else if (forme === 2) {
    const a = nz(2, 12);
    x = nz(2, 12);
    e = `${t0(a)} - … = ${a - x}`;
    verif = `${p(a)} - ${p(a - x)} = ${x}`;
  } else if (forme === 3) {
    const a = nz(2, 9);
    x = nz(2, 9);
    e = `${t0(a)} × … = ${a * x}`;
    verif = `${p(a * x)} ÷ ${p(a)} = ${x}`;
  } else if (forme === 4) {
    const d = nz(2, 9);
    const r = nz(2, 9);
    x = r * d;
    e = `… ÷ ${p(d)} = ${r}`;
    verif = `${p(r)} × ${p(d)} = ${x}`;
  } else {
    const b = nz(2, 9);
    x = nz(2, 9);
    e = `… × ${p(b)} = ${x * b}`;
    verif = `${p(x * b)} ÷ ${p(b)} = ${x}`;
  }
  const text = randomChoice([
    `Trouve le nombre manquant : ${e}`,
    `Quel nombre faut-il écrire à la place des pointillés ? ${e}`,
    `Complète l’égalité : ${e}`,
    `Par quel nombre remplacer « … » pour que l’égalité ${e} soit vraie ?`,
  ]);
  return court(
    text,
    x,
    expl(
      "on retrouve un terme ou un facteur manquant par l’opération inverse.",
      "addition ↔ soustraction, multiplication ↔ division, en respectant la règle des signes.",
      `${verif}.`,
      `le nombre manquant est ${x}.`
    )
  );
}

export const operationsRelatifsBank: TutorBankItemV4[] = [
  // =========================
  // RELATIF_ADDITION
  // =========================
  {
    kind: "fixed",
    id: "relatif_addition_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 1,
    theme: "neutral",
    text: "Calculer : (-3) + 7",
    format: "qcm",
    choices: ["4", "-4", "10", "-10"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "On part de -3 et on avance de 7.",
    explanation: "(-3) + 7 = 4.",
    tags: ["relatif", "addition", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_addition_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 1,
    theme: "neutral",
    text: "Calculer : (-5) + (-4)",
    format: "qcm",
    choices: ["-9", "9", "-1", "1"],
    expected: ["-9"],
    comparator: "mcq_exact",
    hint: "Deux pertes s’additionnent.",
    explanation: "(-5) + (-4) = -9.",
    tags: ["relatif", "addition", "signe"],
  },
  {
    kind: "template",
    id: "relatif_addition_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne en tenant compte des signes.",
    tags: ["relatif", "addition", "template"],
    generate: () => genAddition("libre"),
  },
  {
    kind: "fixed",
    id: "relatif_addition_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 2,
    theme: "neutral",
    text: "Explique pourquoi (-5) + (-4) = -9.",
    format: "open",
    expected: ["deux", "négatifs", "-9"],
    comparator: "contains_keyword",
    hint: "Deux nombres négatifs s’additionnent comme deux pertes.",
    explanation:
      "On additionne deux nombres négatifs : les distances à zéro s’additionnent et le résultat reste négatif. Donc (-5) + (-4) = -9.",
    tags: ["relatif", "addition", "open"],
  },

  // =========================
  // RELATIF_SOUSTRACTION
  // =========================
  {
    kind: "fixed",
    id: "relatif_soustraction_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 1,
    theme: "neutral",
    text: "Calculer : 6 - 9",
    format: "qcm",
    choices: ["-3", "3", "15", "-15"],
    expected: ["-3"],
    comparator: "mcq_exact",
    hint: "6 - 9 signifie qu’on recule de 9 à partir de 6.",
    explanation: "6 - 9 = -3.",
    tags: ["relatif", "soustraction"],
  },
  {
    kind: "fixed",
    id: "relatif_soustraction_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer : 5 - (-3)",
    format: "qcm",
    choices: ["2", "8", "-8", "-2"],
    expected: ["8"],
    comparator: "mcq_exact",
    hint: "Soustraire un nombre négatif revient à ajouter son opposé.",
    explanation: "5 - (-3) = 5 + 3 = 8.",
    tags: ["relatif", "soustraction", "opposé"],
  },
  {
    kind: "template",
    id: "relatif_soustraction_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 2,
    theme: "neutral",
    hint: "Soustraire un nombre revient à ajouter son opposé.",
    tags: ["relatif", "soustraction", "template"],
    generate: () => genSoustraction("libre"),
  },
  {
    kind: "fixed",
    id: "relatif_soustraction_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi 5 - (-3) = 8.",
    format: "open",
    expected: ["soustraire", "négatif", "ajouter", "opposé"],
    comparator: "contains_keyword",
    hint: "Transformer la soustraction en addition.",
    explanation:
      "Soustraire -3 revient à ajouter son opposé, donc 5 - (-3) = 5 + 3 = 8.",
    tags: ["relatif", "soustraction", "open"],
  },

  // =========================
  // RELATIF_MULTIPLICATION
  // =========================
  {
    kind: "fixed",
    id: "relatif_multiplication_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_multiplication",
    difficulty: 1,
    theme: "neutral",
    text: "Calculer : (-4) × 3",
    format: "qcm",
    choices: ["-12", "12", "-7", "7"],
    expected: ["-12"],
    comparator: "mcq_exact",
    hint: "Un négatif multiplié par un positif donne un négatif.",
    explanation: "(-4) × 3 = -12.",
    tags: ["relatif", "multiplication", "signe"],
  },
  {
    kind: "fixed",
    id: "relatif_multiplication_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_multiplication",
    difficulty: 1,
    theme: "neutral",
    text: "Calculer : (-5) × (-2)",
    format: "qcm",
    choices: ["10", "-10", "7", "-7"],
    expected: ["10"],
    comparator: "mcq_exact",
    hint: "Le produit de deux nombres négatifs est positif.",
    explanation: "(-5) × (-2) = 10.",
    tags: ["relatif", "multiplication", "deux_negatifs"],
  },
  {
    kind: "template",
    id: "relatif_multiplication_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_multiplication",
    difficulty: 2,
    theme: "neutral",
    hint: "Détermine d’abord le signe, puis multiplie les distances à zéro.",
    tags: ["relatif", "multiplication", "template"],
    generate: () => genMultiplication("libre"),
  },
  {
    kind: "fixed",
    id: "relatif_multiplication_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_multiplication",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi le produit de deux nombres négatifs est positif.",
    format: "open",
    expected: ["deux", "négatifs", "positif"],
    comparator: "contains_keyword",
    hint: "Pense à la règle des signes.",
    explanation:
      "D’après la règle des signes, le produit de deux nombres de même signe est positif. Deux nombres négatifs ont le même signe, donc leur produit est positif.",
    tags: ["relatif", "multiplication", "open"],
  },

  // =========================
  // RELATIF_DIVISION
  // =========================
  {
    kind: "fixed",
    id: "relatif_division_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_division",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer : (-12) ÷ 3",
    format: "qcm",
    choices: ["-4", "4", "-9", "9"],
    expected: ["-4"],
    comparator: "mcq_exact",
    hint: "Un négatif divisé par un positif donne un négatif.",
    explanation: "(-12) ÷ 3 = -4.",
    tags: ["relatif", "division", "signe"],
  },
  {
    kind: "fixed",
    id: "relatif_division_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_division",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer : (-20) ÷ (-5)",
    format: "qcm",
    choices: ["4", "-4", "15", "-15"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "Deux nombres négatifs donnent un quotient positif.",
    explanation: "(-20) ÷ (-5) = 4.",
    tags: ["relatif", "division", "deux_negatifs"],
  },
  {
    kind: "template",
    id: "relatif_division_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_division",
    difficulty: 3,
    theme: "neutral",
    hint: "Détermine le signe, puis divise les distances à zéro.",
    tags: ["relatif", "division", "template"],
    generate: () => genDivision("libre"),
  },
  {
    kind: "fixed",
    id: "relatif_division_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_division",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment déterminer le signe d’un quotient de deux nombres relatifs.",
    format: "open",
    expected: ["même signe", "positif", "signes différents", "négatif"],
    comparator: "contains_keyword",
    hint: "C’est la même règle que pour le produit.",
    explanation:
      "Si les deux nombres ont le même signe, le quotient est positif. S’ils ont des signes différents, le quotient est négatif.",
    tags: ["relatif", "division", "open"],
  },

  // =========================
  // RELATIF_CALCUL
  // =========================
  {
    kind: "fixed",
    id: "relatif_calcul_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_calcul",
    difficulty: 3,
    theme: "neutral",
    text: "Calculer : (-3) × 4 + 5",
    format: "qcm",
    choices: ["-7", "17", "-17", "7"],
    expected: ["-7"],
    comparator: "mcq_exact",
    hint: "Commence par la multiplication.",
    explanation: "(-3) × 4 + 5 = -12 + 5 = -7.",
    tags: ["relatif", "calcul", "priorites"],
  },
  {
    kind: "template",
    id: "relatif_calcul_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_calcul",
    difficulty: 3,
    theme: "neutral",
    hint: "Respecte les priorités opératoires.",
    tags: ["relatif", "calcul", "template"],
    generate: () => genCalcul(3, 0),
  },
  {
    kind: "template",
    id: "relatif_calcul_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_calcul",
    difficulty: 4,
    theme: "neutral",
    hint: "Commence par les parenthèses, puis multiplication ou division.",
    tags: ["relatif", "calcul", "priorites", "template"],
    generate: () => genCalcul(4, 0),
  },
  {
    kind: "fixed",
    id: "relatif_calcul_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_calcul",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi dans (-3) × 4 + 5, il faut commencer par la multiplication.",
    format: "open",
    expected: ["priorité", "multiplication", "addition"],
    comparator: "contains_keyword",
    hint: "Pense aux priorités opératoires.",
    explanation:
      "La multiplication est prioritaire sur l’addition. On calcule donc d’abord (-3) × 4 = -12, puis -12 + 5 = -7.",
    tags: ["relatif", "calcul", "open"],
  },

  // =========================
  // RELATIF_PROBLEME
  // =========================
  {
    kind: "fixed",
    id: "relatif_probleme_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_probleme",
    difficulty: 2,
    theme: "neutral",
    text: "Il fait -2 °C le matin. La température augmente de 7 °C. Quelle est la température finale ?",
    format: "qcm",
    choices: ["5", "-5", "9", "-9"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "Calcule -2 + 7.",
    explanation: "-2 + 7 = 5. La température finale est 5 °C.",
    tags: ["relatif", "probleme", "temperature"],
  },
  {
    kind: "template",
    id: "relatif_probleme_tpl_temperature_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Traduis la situation par une addition de nombres relatifs.",
    tags: ["relatif", "probleme", "temperature", "template"],
    generate: () => (Math.random() < 0.6 ? situVariation(SIT_TEMP) : situVariationLue(SIT_TEMP)),
  },
  {
    kind: "template",
    id: "relatif_probleme_tpl_reunion_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_probleme",
    difficulty: 3,
    theme: "reunion",
    hint: "Une montée est positive, une descente est négative.",
    tags: ["relatif", "probleme", "reunion", "altitude"],
    // ⭐ Le gabarit réunionnais : quatre lieux de l'île, trois façons de demander.
    generate: () => {
      const x = Math.random();
      if (x < 0.5) return situVariation(SIT_REUNION);
      if (x < 0.8) return situVariationLue(SIT_REUNION);
      return situDouble(SIT_REUNION);
    },
  },

  // =========================
  // RELATIF_DEFIS_OPS
  // =========================
  {
    kind: "fixed",
    id: "relatif_operation_defi_fixed_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_operation_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève affirme que (-4) × (-3) = -12. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Regarde la règle des signes pour deux nombres négatifs.",
    explanation:
      "Non. Le produit de deux nombres négatifs est positif : (-4) × (-3) = 12.",
    tags: ["relatif", "defi", "erreur"],
  },
  {
    kind: "template",
    id: "relatif_operation_defi_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_operation_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Corrige le signe et explique la règle.",
    tags: ["relatif", "defi", "open", "erreur"],
    generate: () => {
      const er = randomChoice(ERREURS)();
      const [nom, pr] = randomChoice(ELEVES);
      const text = randomChoice([
        `${nom} écrit : ${er.e} = ${er.faux}. Explique son erreur.`,
        `Dans la copie de ${nom}, on lit : ${er.e} = ${er.faux}. Quelle règle a-t-${pr} oubliée ? Donne le bon résultat.`,
        `${nom} pense que ${er.e} = ${er.faux}. Explique-lui pourquoi c’est faux.`,
        `Corrige le calcul de ${nom} : ${er.e} = ${er.faux}, et justifie ta correction.`,
      ]);
      return {
        text,
        format: "open",
        expected: [...er.mots, String(er.juste)],
        comparator: "contains_keyword",
        explanation: expl(
          `${er.regle}.`,
          `on refait le calcul ${er.e} en appliquant cette règle.`,
          `${er.e} = ${er.juste}, et non ${er.faux}.`,
          `l’erreur vient de la règle oubliée : ${er.regle}.`
        ),
      };
    },
  },

  /* =========================================================
     COMPLÉMENTS (top-up ~10 items / microSkill)
  ========================================================= */

  // ---------- RELATIF_ADDITION ----------
  {
    kind: "fixed",
    id: "relatif_addition_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 1,
    theme: "neutral",
    text: "Calculer : (-8) + (-2)",
    format: "qcm",
    choices: ["-10", "10", "-6", "6"],
    expected: ["-10"],
    comparator: "mcq_exact",
    hint: "Deux nombres négatifs s’additionnent comme deux pertes.",
    explanation:
      "Définition : additionner deux relatifs de même signe garde ce signe.\n\n" +
      "Méthode : les deux sont négatifs, on additionne les distances à zéro.\n\n" +
      "Calcul : 8 + 2 = 10, et le signe reste négatif.\n\n" +
      "Conclusion : (-8) + (-2) = -10.",
    tags: ["relatif", "addition", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_addition_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer : 9 + (-4)",
    format: "qcm",
    choices: ["5", "13", "-5", "-13"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "On part de 9 et on recule de 4.",
    explanation:
      "Définition : additionner un négatif revient à reculer sur la droite graduée.\n\n" +
      "Méthode : on retire 4 à 9.\n\n" +
      "Calcul : 9 - 4 = 5.\n\n" +
      "Conclusion : 9 + (-4) = 5.",
    tags: ["relatif", "addition", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_addition_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 1,
    theme: "neutral",
    text: "Calculer : (-6) + 6",
    format: "qcm",
    choices: ["0", "12", "-12", "6"],
    expected: ["0"],
    comparator: "mcq_exact",
    hint: "Deux nombres opposés s’annulent.",
    explanation:
      "Définition : deux nombres opposés ont une somme nulle.\n\n" +
      "Méthode : -6 et 6 sont opposés.\n\n" +
      "Calcul : (-6) + 6 = 0.\n\n" +
      "Conclusion : la somme vaut 0.",
    tags: ["relatif", "addition", "oppose", "qcm"],
  },
  {
    kind: "template",
    id: "relatif_addition_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 2,
    theme: "neutral",
    hint: "Deux nombres négatifs : on additionne et on garde le signe −.",
    tags: ["relatif", "addition", "template"],
    generate: () => genAddition("negatifs"),
  },
  {
    kind: "template",
    id: "relatif_addition_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne de gauche à droite.",
    tags: ["relatif", "addition", "trois_termes", "template"],
    generate: () => genAdditionTrois(),
  },
  {
    kind: "template",
    id: "relatif_addition_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 2,
    theme: "neutral",
    hint: "On compare les distances à zéro et on garde le signe du plus grand.",
    tags: ["relatif", "addition", "signes_contraires", "template"],
    generate: () => genAddition("contraires"),
  },

  // ---------- RELATIF_SOUSTRACTION ----------
  {
    kind: "fixed",
    id: "relatif_soustraction_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 1,
    theme: "neutral",
    text: "Calculer : (-4) - 3",
    format: "qcm",
    choices: ["-7", "-1", "1", "7"],
    expected: ["-7"],
    comparator: "mcq_exact",
    hint: "On recule encore de 3 à partir de -4.",
    explanation:
      "Définition : soustraire revient à ajouter l’opposé.\n\n" +
      "Méthode : (-4) - 3 = (-4) + (-3).\n\n" +
      "Calcul : (-4) + (-3) = -7.\n\n" +
      "Conclusion : (-4) - 3 = -7.",
    tags: ["relatif", "soustraction", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_soustraction_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer : (-2) - (-5)",
    format: "qcm",
    choices: ["3", "-7", "-3", "7"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Soustraire -5 revient à ajouter 5.",
    explanation:
      "Définition : soustraire un négatif revient à ajouter son opposé.\n\n" +
      "Méthode : (-2) - (-5) = (-2) + 5.\n\n" +
      "Calcul : (-2) + 5 = 3.\n\n" +
      "Conclusion : (-2) - (-5) = 3.",
    tags: ["relatif", "soustraction", "oppose", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_soustraction_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer 6 - (-4) revient à effectuer…",
    format: "qcm",
    choices: ["6 + 4", "6 - 4", "-6 - 4", "-6 + 4"],
    expected: ["6 + 4"],
    comparator: "mcq_exact",
    hint: "Soustraire un négatif, c’est ajouter son opposé.",
    explanation:
      "Définition : soustraire un nombre revient à ajouter son opposé.\n\n" +
      "Méthode : l’opposé de -4 est +4.\n\n" +
      "Calcul : 6 - (-4) = 6 + 4.\n\n" +
      "Conclusion : cela revient à calculer 6 + 4.",
    tags: ["relatif", "soustraction", "oppose", "qcm"],
  },
  {
    kind: "template",
    id: "relatif_soustraction_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 2,
    theme: "neutral",
    hint: "Transforme la soustraction en addition de l’opposé.",
    tags: ["relatif", "soustraction", "template"],
    generate: () => genSoustraction("libre"),
  },
  {
    kind: "template",
    id: "relatif_soustraction_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 3,
    theme: "neutral",
    hint: "Soustraire un négatif augmente le résultat.",
    tags: ["relatif", "soustraction", "oppose", "template"],
    generate: () => genSoustraction("moinsNeg"),
  },
  {
    kind: "template",
    id: "relatif_soustraction_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 3,
    theme: "neutral",
    hint: "Écris la chaîne comme des additions d’opposés.",
    tags: ["relatif", "soustraction", "chaine", "template"],
    generate: () => genSoustractionChaine(),
  },

  // ---------- RELATIF_MULTIPLICATION ----------
  {
    kind: "fixed",
    id: "relatif_multiplication_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_multiplication",
    difficulty: 1,
    theme: "neutral",
    text: "Calculer : 6 × (-3)",
    format: "qcm",
    choices: ["-18", "18", "-9", "9"],
    expected: ["-18"],
    comparator: "mcq_exact",
    hint: "Un positif par un négatif donne un négatif.",
    explanation:
      "Définition : le produit de deux nombres de signes contraires est négatif.\n\n" +
      "Méthode : on multiplie les distances à zéro puis on place le signe.\n\n" +
      "Calcul : 6 × 3 = 18, signe négatif.\n\n" +
      "Conclusion : 6 × (-3) = -18.",
    tags: ["relatif", "multiplication", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_multiplication_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_multiplication",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer : (-7) × (-1)",
    format: "qcm",
    choices: ["7", "-7", "1", "-1"],
    expected: ["7"],
    comparator: "mcq_exact",
    hint: "Deux négatifs donnent un positif ; multiplier par -1 change le signe.",
    explanation:
      "Définition : le produit de deux nombres négatifs est positif.\n\n" +
      "Méthode : multiplier par -1 change le signe.\n\n" +
      "Calcul : (-7) × (-1) = 7.\n\n" +
      "Conclusion : le résultat est 7.",
    tags: ["relatif", "multiplication", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_multiplication_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_multiplication",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer : (-1) × 9",
    format: "qcm",
    choices: ["-9", "9", "-1", "1"],
    expected: ["-9"],
    comparator: "mcq_exact",
    hint: "Multiplier par -1 change le signe.",
    explanation:
      "Définition : multiplier par -1 donne l’opposé.\n\n" +
      "Méthode : l’opposé de 9 est -9.\n\n" +
      "Calcul : (-1) × 9 = -9.\n\n" +
      "Conclusion : le résultat est -9.",
    tags: ["relatif", "multiplication", "qcm"],
  },
  {
    kind: "template",
    id: "relatif_multiplication_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_multiplication",
    difficulty: 2,
    theme: "neutral",
    hint: "Détermine le signe, puis multiplie les distances à zéro.",
    tags: ["relatif", "multiplication", "template"],
    generate: () => genMultiplication("libre"),
  },
  {
    kind: "template",
    id: "relatif_multiplication_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_multiplication",
    difficulty: 2,
    theme: "neutral",
    hint: "Même signe → positif ; signes contraires → négatif.",
    tags: ["relatif", "multiplication", "signe", "template"],
    generate: () => genSigne("×"),
  },
  {
    kind: "template",
    id: "relatif_multiplication_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_multiplication",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte le nombre de facteurs négatifs.",
    tags: ["relatif", "multiplication", "trois_facteurs", "template"],
    generate: () => genMultiplicationTrois(),
  },

  // ---------- RELATIF_DIVISION ----------
  {
    kind: "fixed",
    id: "relatif_division_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_division",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer : 15 ÷ (-3)",
    format: "qcm",
    choices: ["-5", "5", "-12", "12"],
    expected: ["-5"],
    comparator: "mcq_exact",
    hint: "Signes contraires → quotient négatif.",
    explanation:
      "Définition : le quotient de deux nombres de signes contraires est négatif.\n\n" +
      "Méthode : on divise les distances à zéro, puis on place le signe.\n\n" +
      "Calcul : 15 ÷ 3 = 5, signe négatif.\n\n" +
      "Conclusion : 15 ÷ (-3) = -5.",
    tags: ["relatif", "division", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_division_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_division",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer : (-18) ÷ (-6)",
    format: "qcm",
    choices: ["3", "-3", "12", "-12"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Deux négatifs → quotient positif.",
    explanation:
      "Définition : le quotient de deux nombres de même signe est positif.\n\n" +
      "Méthode : les deux sont négatifs, le quotient est positif.\n\n" +
      "Calcul : 18 ÷ 6 = 3.\n\n" +
      "Conclusion : (-18) ÷ (-6) = 3.",
    tags: ["relatif", "division", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_division_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_division",
    difficulty: 2,
    theme: "neutral",
    text: "Calculer : (-24) ÷ 6",
    format: "qcm",
    choices: ["-4", "4", "-18", "18"],
    expected: ["-4"],
    comparator: "mcq_exact",
    hint: "Signes contraires → quotient négatif.",
    explanation:
      "Définition : le quotient de deux nombres de signes contraires est négatif.\n\n" +
      "Méthode : on divise les distances à zéro, puis on place le signe.\n\n" +
      "Calcul : 24 ÷ 6 = 4, signe négatif.\n\n" +
      "Conclusion : (-24) ÷ 6 = -4.",
    tags: ["relatif", "division", "qcm"],
  },
  {
    kind: "template",
    id: "relatif_division_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_division",
    difficulty: 3,
    theme: "neutral",
    hint: "Détermine le signe, puis divise les distances à zéro.",
    tags: ["relatif", "division", "template"],
    generate: () => genDivision("libre"),
  },
  {
    kind: "template",
    id: "relatif_division_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_division",
    difficulty: 3,
    theme: "neutral",
    hint: "Même signe → positif ; signes contraires → négatif.",
    tags: ["relatif", "division", "signe", "template"],
    generate: () => genSigne("÷"),
  },
  {
    kind: "template",
    id: "relatif_division_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_division",
    difficulty: 3,
    theme: "neutral",
    hint: "Un négatif divisé par un positif reste négatif.",
    tags: ["relatif", "division", "template"],
    generate: () => genDivision("negPos"),
  },

  // ---------- RELATIF_CALCUL ----------
  {
    kind: "fixed",
    id: "relatif_calcul_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_calcul",
    difficulty: 3,
    theme: "neutral",
    text: "Calculer : (-2) × (-3) + (-4)",
    format: "qcm",
    choices: ["2", "-10", "10", "-2"],
    expected: ["2"],
    comparator: "mcq_exact",
    hint: "Commence par la multiplication.",
    explanation:
      "Définition : la multiplication est prioritaire sur l’addition.\n\n" +
      "Méthode : on calcule d’abord (-2) × (-3).\n\n" +
      "Calcul : (-2) × (-3) = 6, puis 6 + (-4) = 2.\n\n" +
      "Conclusion : le résultat est 2.",
    tags: ["relatif", "calcul", "priorites", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_calcul_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_calcul",
    difficulty: 3,
    theme: "neutral",
    text: "Calculer : 10 + (-2) × 3",
    format: "qcm",
    choices: ["4", "24", "-4", "16"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "La multiplication passe avant l’addition.",
    explanation:
      "Définition : la multiplication est prioritaire sur l’addition.\n\n" +
      "Méthode : on calcule d’abord (-2) × 3.\n\n" +
      "Calcul : (-2) × 3 = -6, puis 10 + (-6) = 4.\n\n" +
      "Conclusion : le résultat est 4.",
    tags: ["relatif", "calcul", "priorites", "qcm"],
  },
  {
    kind: "template",
    id: "relatif_calcul_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_calcul",
    difficulty: 3,
    theme: "neutral",
    hint: "Effectue la multiplication avant la soustraction.",
    tags: ["relatif", "calcul", "priorites", "template"],
    generate: () => genCalcul(3, randomChoice([2, 3, 6])),
  },
  {
    kind: "template",
    id: "relatif_calcul_tpl_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_calcul",
    difficulty: 4,
    theme: "neutral",
    hint: "La multiplication passe avant l’addition.",
    tags: ["relatif", "calcul", "priorites", "template"],
    generate: () => genCalcul(4, randomChoice([1, 4])),
  },
  {
    kind: "template",
    id: "relatif_calcul_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_calcul",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule d’abord la parenthèse, puis la division.",
    tags: ["relatif", "calcul", "parentheses", "template"],
    generate: () => genCalcul(4, randomChoice([2, 6])),
  },
  {
    kind: "template",
    id: "relatif_calcul_tpl_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_calcul",
    difficulty: 4,
    theme: "neutral",
    hint: "Parenthèse d’abord, puis multiplication.",
    tags: ["relatif", "calcul", "parentheses", "template"],
    generate: () => genCalcul(4, randomChoice([3, 5, 7])),
  },

  // ---------- RELATIF_PROBLEME ----------
  {
    kind: "fixed",
    id: "relatif_probleme_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_probleme",
    difficulty: 2,
    theme: "neutral",
    text: "Un compte bancaire est à -30 €. On y dépose 50 €. Quel est le nouveau solde ?",
    format: "qcm",
    choices: ["20", "-20", "80", "-80"],
    expected: ["20"],
    comparator: "mcq_exact",
    hint: "Calcule -30 + 50.",
    explanation:
      "Définition : un dépôt correspond à une addition.\n\n" +
      "Méthode : on ajoute 50 au solde de départ.\n\n" +
      "Calcul : -30 + 50 = 20.\n\n" +
      "Conclusion : le nouveau solde est 20 €.",
    tags: ["relatif", "probleme", "argent", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_probleme_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Il fait 3 °C, puis la température baisse de 8 °C. Quelle est la température finale ?",
    format: "qcm",
    choices: ["-5", "5", "-11", "11"],
    expected: ["-5"],
    comparator: "mcq_exact",
    hint: "Une baisse correspond à une soustraction.",
    explanation:
      "Définition : une baisse de température correspond à une soustraction.\n\n" +
      "Méthode : on retire 8 à 3.\n\n" +
      "Calcul : 3 - 8 = -5.\n\n" +
      "Conclusion : la température finale est -5 °C.",
    tags: ["relatif", "probleme", "temperature", "qcm"],
  },
  {
    kind: "template",
    id: "relatif_probleme_tpl_argent_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Un gain est positif, une dépense est négative.",
    tags: ["relatif", "probleme", "argent", "template"],
    generate: () => {
      const x = Math.random();
      if (x < 0.45) return situVariation([...SIT_ARGENT, ...SIT_SCORE]);
      if (x < 0.75) return situVariationLue([...SIT_ARGENT, ...SIT_SCORE]);
      return situDouble([...SIT_ARGENT, ...SIT_SCORE]);
    },
  },
  {
    kind: "template",
    id: "relatif_probleme_tpl_ecart_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "L’écart se calcule par la plus haute moins la plus basse.",
    tags: ["relatif", "probleme", "temperature", "ecart", "template"],
    generate: () => situEcart(ECARTS_TEMP),
  },
  {
    kind: "template",
    id: "relatif_probleme_tpl_altitude_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Sous le niveau de la mer, l’altitude est négative.",
    tags: ["relatif", "probleme", "altitude", "template"],
    generate: () => {
      const x = Math.random();
      if (x < 0.4) return situVariation(SIT_ALT);
      if (x < 0.7) return situEcart(ECARTS_ALT);
      return situVariationLue(SIT_ALT);
    },
  },
  {
    kind: "template",
    id: "relatif_probleme_tpl_double_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Additionne les deux variations à la valeur de départ.",
    tags: ["relatif", "probleme", "temperature", "double", "template"],
    generate: () => situDouble(SIT_TOUTES),
  },
  {
    kind: "fixed",
    id: "relatif_probleme_open_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment modéliser par un calcul de relatifs : « il fait -3 °C, la température baisse encore de 5 °C ».",
    format: "open",
    expected: ["addition", "négatif", "-8"],
    comparator: "contains_keyword",
    hint: "Une baisse se traduit par l’ajout d’un nombre négatif.",
    explanation:
      "Définition : une baisse se traduit par l’ajout d’un nombre négatif.\n\n" +
      "Méthode : on écrit -3 + (-5).\n\n" +
      "Calcul : -3 + (-5) = -8.\n\n" +
      "Conclusion : la température finale est -8 °C.",
    tags: ["relatif", "probleme", "open"],
  },

  // ---------- RELATIF_OPERATION_DEFI ----------
  {
    kind: "fixed",
    id: "relatif_operation_defi_fixed_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_operation_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quel est le signe de (-2) × (-3) × (-1) ?",
    format: "qcm",
    choices: ["négatif", "positif", "nul", "indéterminé"],
    expected: ["négatif"],
    comparator: "mcq_exact",
    hint: "Compte les facteurs négatifs : pair ou impair ?",
    explanation:
      "Définition : un produit est positif si le nombre de facteurs négatifs est pair, négatif s’il est impair.\n\n" +
      "Méthode : on compte les facteurs négatifs.\n\n" +
      "Calcul : il y a 3 facteurs négatifs (impair), donc le produit est négatif (le résultat est -6).\n\n" +
      "Conclusion : le signe est négatif.",
    tags: ["relatif", "defi", "signe", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_operation_defi_fixed_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_operation_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève écrit : 5 - (-3) = 2. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Soustraire -3, c’est ajouter 3.",
    explanation:
      "Définition : soustraire un négatif revient à ajouter son opposé.\n\n" +
      "Méthode : 5 - (-3) = 5 + 3.\n\n" +
      "Calcul : 5 + 3 = 8.\n\n" +
      "Conclusion : non, le résultat correct est 8.",
    tags: ["relatif", "defi", "erreur", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_operation_defi_fixed_4",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_operation_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Laquelle de ces expressions est égale à un nombre positif ?",
    format: "qcm",
    choices: ["(-4) × (-2)", "(-4) × 2", "(-4) + (-2)", "(-4) - 2"],
    expected: ["(-4) × (-2)"],
    comparator: "mcq_exact",
    hint: "Cherche le produit de deux nombres négatifs.",
    explanation:
      "Définition : le produit de deux négatifs est positif.\n\n" +
      "Méthode : on évalue chaque expression.\n\n" +
      "Calcul : (-4) × (-2) = 8 ; les autres donnent -8, -6 et -6.\n\n" +
      "Conclusion : (-4) × (-2) est positive.",
    tags: ["relatif", "defi", "signe", "qcm"],
  },
  {
    kind: "fixed",
    id: "relatif_operation_defi_fixed_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_operation_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Calculer : (-1) × (-1) × (-1) × (-1)",
    format: "qcm",
    choices: ["1", "-1", "4", "-4"],
    expected: ["1"],
    comparator: "mcq_exact",
    hint: "Compte le nombre de facteurs négatifs.",
    explanation:
      "Définition : un produit est positif si le nombre de facteurs négatifs est pair.\n\n" +
      "Méthode : il y a 4 facteurs négatifs (pair).\n\n" +
      "Calcul : (-1) × (-1) = 1, et 1 × 1 = 1.\n\n" +
      "Conclusion : le résultat est 1.",
    tags: ["relatif", "defi", "signe", "qcm"],
  },
  {
    kind: "template",
    id: "relatif_operation_defi_tpl_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_operation_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Le signe dépend de la parité du nombre de facteurs négatifs.",
    tags: ["relatif", "defi", "signe", "template"],
    generate: () => {
      const forme = randomInt(0, 2);
      let nbNeg = randomInt(2, 7);
      let text = "";
      if (forme === 0) {
        const tot = nbNeg + randomInt(1, 4);
        text = randomChoice([
          `Un produit comporte ${nbNeg} facteurs négatifs (et aucun facteur nul). Quel est le signe de ce produit ?`,
          `On multiplie ${nbNeg} nombres négatifs entre eux. Le résultat est-il positif ou négatif ?`,
          `Un produit de ${tot} facteurs non nuls contient exactement ${nbNeg} facteurs négatifs. De quel signe est-il ?`,
        ]);
      } else if (forme === 1) {
        const n = randomInt(4, 6);
        let f: number[] = [];
        do {
          f = Array.from({ length: n }, () => nz(1, 9));
        } while (f.every((v) => v > 0));
        nbNeg = f.filter((v) => v < 0).length;
        const e = f.map((v, i) => (i === 0 ? t0(v) : p(v))).join(" × ");
        text = randomChoice([
          `Sans calculer, donne le signe de ${e}.`,
          `Quel est le signe du produit ${e} ?`,
          `Le produit ${e} est-il positif ou négatif ?`,
        ]);
      } else {
        text = randomChoice([
          `On calcule (-1) × (-1) × … × (-1), avec ${nbNeg} facteurs égaux à -1. Le résultat est-il positif ou négatif ?`,
          `On multiplie le nombre -1 par lui-même jusqu’à avoir ${nbNeg} facteurs. Quel est le signe du résultat ?`,
        ]);
      }
      const result = nbNeg % 2 === 0 ? "positif" : "négatif";
      return {
        text,
        format: "qcm",
        choices: ["positif", "négatif"],
        expected: [result],
        comparator: "mcq_exact",
        explanation:
          "Définition : un produit est positif si le nombre de facteurs négatifs est pair, négatif s’il est impair.\n\n" +
          "Méthode : on compte les facteurs négatifs et on regarde la parité.\n\n" +
          `Calcul : il y a ${nbNeg} facteurs négatifs, et ${nbNeg} est ${nbNeg % 2 === 0 ? "pair" : "impair"}.\n\n` +
          `Conclusion : le produit est ${result}.`,
      };
    },
  },
  {
    kind: "template",
    id: "relatif_operation_defi_tpl_3",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_operation_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Respecte les priorités : multiplication avant addition.",
    tags: ["relatif", "defi", "calcul", "template"],
    generate: () => {
      const o = avecNegatif(randomChoice(FORMES_5));
      const text = o.text ?? poser(o.e!);
      return court(text, o.r, expl(o.def, o.meth, `${o.calc}.`, `le résultat est ${o.r}.`));
    },
  },
  {
    kind: "fixed",
    id: "relatif_operation_defi_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_operation_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique comment trouver rapidement le signe d’un long produit de nombres relatifs.",
    format: "open",
    expected: ["facteurs négatifs", "pair", "impair"],
    comparator: "contains_keyword",
    hint: "Compte le nombre de facteurs négatifs.",
    explanation:
      "Définition : le signe d’un produit dépend du nombre de facteurs négatifs.\n\n" +
      "Méthode : on compte les facteurs négatifs.\n\n" +
      "Calcul : si ce nombre est pair, le produit est positif ; s’il est impair, il est négatif.\n\n" +
      "Conclusion : on regarde la parité du nombre de facteurs négatifs.",
    tags: ["relatif", "defi", "open"],
  },

  /* =========================================================
     GÉNÉRATEURS AJOUTÉS LE 30/09/2026 : chaque étoile servie
     d'une micro a désormais au moins un gabarit (★1 de l'addition,
     de la soustraction et de la multiplication, ★2 de la division
     et des problèmes, ★4 des défis n'avaient que du figé).
  ========================================================= */
  {
    kind: "template",
    id: "relatif_addition_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 1,
    theme: "neutral",
    hint: "Sur une droite graduée : ajouter un positif fait avancer, ajouter un négatif fait reculer.",
    tags: ["relatif", "addition", "template"],
    generate: () => genAddition("simple"),
  },
  {
    kind: "template",
    id: "relatif_addition_tpl_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_addition",
    difficulty: 1,
    theme: "neutral",
    hint: "Une hausse s’ajoute avec un nombre positif, une baisse avec un nombre négatif.",
    tags: ["relatif", "addition", "situation", "template"],
    generate: () => (Math.random() < 0.5 ? situVariation(SIT_TOUTES) : genAddition("simple")),
  },
  {
    kind: "template",
    id: "relatif_soustraction_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 1,
    theme: "neutral",
    hint: "Soustraire un nombre, c’est ajouter son opposé.",
    tags: ["relatif", "soustraction", "template"],
    generate: () => genSoustraction("simple"),
  },
  {
    kind: "template",
    id: "relatif_soustraction_tpl_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_soustraction",
    difficulty: 1,
    theme: "neutral",
    hint: "La variation se calcule par : valeur finale moins valeur initiale.",
    tags: ["relatif", "soustraction", "situation", "template"],
    generate: () => (Math.random() < 0.5 ? situVariationLue(SIT_TOUTES) : genSoustraction("simple")),
  },
  {
    kind: "template",
    id: "relatif_multiplication_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_multiplication",
    difficulty: 1,
    theme: "neutral",
    hint: "Même signe → positif ; signes contraires → négatif.",
    tags: ["relatif", "multiplication", "template"],
    generate: () => genMultiplication("simple"),
  },
  {
    kind: "template",
    id: "relatif_multiplication_tpl_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_multiplication",
    difficulty: 1,
    theme: "neutral",
    hint: "Une même baisse répétée plusieurs fois : c’est un produit par un nombre négatif.",
    tags: ["relatif", "multiplication", "situation", "template"],
    generate: () => (Math.random() < 0.5 ? situProduit(6) : genMultiplication("simple")),
  },
  {
    kind: "template",
    id: "relatif_multiplication_tpl_7",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_multiplication",
    difficulty: 3,
    theme: "neutral",
    hint: "Le facteur manquant est un quotient ; trouve d’abord son signe.",
    tags: ["relatif", "multiplication", "facteur_manquant", "template"],
    generate: () => genFacteurManquant(),
  },
  {
    kind: "template",
    id: "relatif_division_tpl_5",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_division",
    difficulty: 2,
    theme: "neutral",
    hint: "Même signe → quotient positif ; signes contraires → quotient négatif.",
    tags: ["relatif", "division", "template"],
    generate: () => genDivision("simple"),
  },
  {
    kind: "template",
    id: "relatif_division_tpl_6",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_division",
    difficulty: 2,
    theme: "neutral",
    hint: "Partager une baisse en parts égales : on divise un nombre négatif.",
    tags: ["relatif", "division", "situation", "template"],
    generate: () => (Math.random() < 0.5 ? situPartage(6) : genDivision("simple")),
  },
  {
    kind: "template",
    id: "relatif_probleme_tpl_situation_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_probleme",
    difficulty: 2,
    theme: "neutral",
    hint: "Une hausse s’ajoute avec un nombre positif, une baisse avec un nombre négatif.",
    tags: ["relatif", "probleme", "template"],
    generate: () => situVariation(SIT_TOUTES),
  },
  {
    kind: "template",
    id: "relatif_probleme_tpl_variation_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_probleme",
    difficulty: 2,
    theme: "neutral",
    hint: "Variation = valeur finale − valeur initiale.",
    tags: ["relatif", "probleme", "variation", "template"],
    generate: () => situVariationLue(SIT_TOUTES),
  },
  {
    kind: "template",
    id: "relatif_probleme_tpl_repetition_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Une variation répétée est un produit ; les produits se calculent avant les additions.",
    tags: ["relatif", "probleme", "priorites", "template"],
    generate: () => randomChoice([situRepetee, situBareme, situMoyenne, () => situProduit()])(),
  },
  {
    kind: "template",
    id: "relatif_operation_defi_tpl_affirmation_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_operation_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Refais le calcul toi-même en appliquant la règle des signes.",
    tags: ["relatif", "defi", "erreur", "template"],
    generate: () => genAffirmation(),
  },
  {
    kind: "template",
    id: "relatif_operation_defi_tpl_laquelle_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_operation_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Produit ou quotient : regarde les signes ; somme : regarde le nombre le plus éloigné de zéro.",
    tags: ["relatif", "defi", "signe", "template"],
    generate: () => genLaquelle(),
  },
  {
    kind: "template",
    id: "relatif_operation_defi_tpl_manquant_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "relatif_operation",
    microId: "relatif_operation_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Utilise l’opération inverse, puis vérifie en remplaçant.",
    tags: ["relatif", "defi", "nombre_manquant", "template"],
    generate: () => genManquant(),
  },
];