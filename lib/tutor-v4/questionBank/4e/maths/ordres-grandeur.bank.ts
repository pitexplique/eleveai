// lib/tutor-v4/questionBank/4e/maths/ordres-grandeur.bank.ts
//
// ⭐ NOTION OUVERTE LE 30/08/2026 : `ordre_grandeur`. Elle ferme TROIS puces du
// thème A — les préfixes de nano à giga (4e-A-nombres-5), l'association d'un
// ordre de grandeur à un objet réel (4e-A-comparaisons-5) et la vérification
// de la vraisemblance d'un résultat (4e-A-calcul-5).
//
// ⭐ LE DÉCOUPAGE TIENT À UNE LIGNE DE FRACTURE À SENS UNIQUE : un ordre de
// grandeur a BESOIN de la notation scientifique pour s'écrire, alors que la
// notation scientifique n'a aucun besoin des ordres de grandeur. C'est ce qui
// interdit de greffer ces micros sur `puissance_ecriture`, qui serait passée à
// douze micros en mélangeant deux objets : l'ÉCRITURE d'un nombre d'un côté,
// la TAILLE DU MONDE de l'autre.
//
// ⭐ LA NOTION SŒUR EST EN PREMIÈRE — `auto_ordres_unites` porte
// `auto_num_ordre_grandeur` et `auto_num_vraisemblance`, les deux mêmes gestes.
// Leurs identifiants ne se reprennent pas (ils sont préfixés `auto_` parce
// qu'ils vivent dans les automatismes), mais leur DÉCOUPAGE est repris tel
// quel : ESTIMER est un geste, JUGER en est un autre. Et le 4e les ancre sur
// les puissances de dix, que la première n'utilise plus.
//
// ⭐ DES GÉNÉRATEURS, PAS DU FIGÉ. Le figé ne sert qu'aux VALEURS
// PARTICULIÈRES : le rappel que « micro » vaut 10⁻⁶ alors que le mot désigne
// partout ailleurs « très petit ».
//
// ⭐ LE CANVAS `number_line` PORTE LES PRÉFIXES, et c'est le seul endroit du
// dépôt où il sert d'ÉCHELLE D'EXPOSANTS : l'axe ne porte pas les nombres mais
// leurs puissances de dix, si bien que nano, micro, milli, kilo, méga et giga
// s'y répartissent RÉGULIÈREMENT, de trois en trois.
// ⚠️ Ses étiquettes sont CENTRÉES sur leur valeur : un point posé sur le
// minimum ou le maximum déborderait de la moitié de sa largeur. L'axe va donc
// de −12 à 12 alors que les points s'arrêtent à −9 et 9.
//
// ⛔⛔ 03/10/2026 — « DES QUESTIONS REVIENNENT SOUVENT ». Mesuré : 5 à 247
// squelettes d'énoncé par micro, jusqu'à 16 répétitions sur une série de 20.
// Chaque gabarit compose désormais une SITUATION (tables ci-dessous : objets du
// monde, villes et pays, achats, trajets, fichiers, appareils…) × une TOURNURE
// (3 à 5 façons de poser la même question). Mesure :
//   npx --yes tsx@4 scripts/mesurer-squelettes-coach.ts 4e ordre_grandeur
//
// ⛔ LES FAITS RÉELS SONT CHOISIS POUR QUE L'ORDRE DE GRANDEUR SOIT SANS
// AMBIGUÏTÉ : leur écriture scientifique a × 10ⁿ a un a compris entre 1 et 3.
// Au-delà (68 millions de Français = 6,8 × 10⁷), « la puissance de dix la plus
// proche » et « le 10ⁿ de l'écriture scientifique » ne donnent plus la même
// réponse, et le QCM devient injuste. Les valeurs sont dites « environ » ; les
// situations inventées (un processeur, un capteur…) sont présentées comme des
// modèles. Pour la même raison, les nombres tirés dans les estimations ont une
// mantisse entre 1 et 1,7 (produits) ou 1,3 et 2,5 (quotients).
//
// ⛔ 03/10/2026 — la conversion en notation scientifique était corrigée par
// `contains_keyword` (« 3×10^-97 » passait pour 3 × 10⁻⁹). Elle est désormais
// corrigée par `exact_text` + toutes les écritures acceptables de la réponse.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ⚠️ On écarte les doublons ET la bonne réponse, puis on coupe à trois : il faut
// donc fournir PLUS de quatre leurres, sinon le QCM tombe à trois lignes.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct)
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

/* ---------------------------------------------------------------------------
   Écriture française des nombres et petite grammaire
--------------------------------------------------------------------------- */

/** 1500 → « 1 500 », 7.5 → « 7,5 ». L'élève lit des nombres français. */
function fr(n: number): string {
  const r = Math.round(n * 1e6) / 1e6;
  const [ent, dec] = String(Math.abs(r)).split(".");
  const signe = r < 0 ? "-" : "";
  const entier = Number(ent).toLocaleString("fr-FR").replace(/[  ]/g, " ");
  return signe + entier + (dec ? "," + dec : "");
}

/** Le même nombre, à l'intérieur d'un $…$ : virgule protégée, espaces fines. */
const tex = (n: number) => fr(n).replace(",", "{,}").replace(/ /g, "\\,");

const SUP: Record<string, string> = {
  "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴",
  "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", "-": "⁻",
};
/** −6 → « ⁻⁶ ». */
const sup = (e: number) => String(e).split("").map((c) => SUP[c] ?? c).join("");

/** En français, « 1,5 litre » mais « 2 litres » : pluriel à partir de 2. */
const pluriel = (x: number) => Math.abs(x) >= 2;

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** « le diamètre » → « du diamètre », « la masse » → « de la masse », « l'altitude » → « de l'altitude ». */
function de(gn: string): string {
  if (gn.startsWith("le ")) return "du " + gn.slice(3);
  if (gn.startsWith("les ")) return "des " + gn.slice(4);
  if (/^(un|une) /.test(gn)) return "d'" + gn;
  return "de " + gn;
}
/** « le diamètre » → « au diamètre », « la masse » → « à la masse ». */
function a(gn: string): string {
  if (gn.startsWith("le ")) return "au " + gn.slice(3);
  if (gn.startsWith("les ")) return "aux " + gn.slice(4);
  return "à " + gn;
}
/** « de » devant un nom sans article : « de mètres », « d'octets » (hertz : h aspiré). */
const deNu = (n: string) => (/^[aeiouyéèê]/i.test(n) ? "d'" + n : "de " + n);

const PRENOMS = [
  "Léa", "Hugo", "Inès", "Nathan", "Chloé", "Yanis",
  "Manon", "Lucas", "Sarah", "Noah", "Jade", "Adam",
] as const;

/**
 * Toutes les écritures acceptables de m × 10^e : « 4,5×10^-9 », « 4.5 x 10^(-9) »,
 * « 4,5*10⁻⁹ »… Les espaces sont déjà tolérés par le comparateur.
 * ⛔ Pas de `contains_keyword` : « 4,5×10^-97 » doit être refusé.
 */
// ⛔ 08/10/2026 : plus de point décimal anglais dans les réponses (« 4.5×10^-9 ») —
// le comparateur change déjà la virgule de l'élève en point, « 4,5 » suffit. Le
// point de multiplication (« 6.10^3 ») s'écrit « 6. 10^3 » : le comparateur
// retire les espaces, l'élève qui tape « 6.10^3 » est donc accepté.
// `unites` : les façons d'écrire l'unité imposée par l'énoncé (« m », « mètres »),
// que l'élève peut ajouter derrière sa réponse.
function sciVariantes(m: number, e: number, unites: readonly string[] = []): string[] {
  const moins = String(e).replace("-", "−");
  const exps = [...new Set([`10^${e}`, `10^(${e})`, `10^{${e}}`, `10${sup(e)}`, `10^${moins}`, `10^(${moins})`])];
  const nus: string[] = [`${fr(m)} × 10^${e}`];
  for (const f of ["×", "x", "*", ". "]) for (const x of exps) nus.push(`${fr(m)}${f}${x}`);
  if (m === 1) nus.push(...exps);
  const avecUnite = unites.flatMap((u) => nus.map((s) => `${s} ${u}`));
  return [...new Set(unites.length ? [avecUnite[0], ...nus, ...avecUnite] : nus)];
}

/** Un entier, et ses écritures acceptables : « 5000000 », « 5 000 000 », « 5×10^6 ». */
function nombreVariantes(v: number, unites: readonly string[] = []): string[] {
  const e = Math.floor(Math.log10(v) + 1e-9);
  const m = Math.round((v / Math.pow(10, e)) * 1e6) / 1e6;
  const nus = [String(v), fr(v)];
  return [
    ...new Set([
      ...(unites.length ? [`${v} ${unites[0]}`] : []),
      ...nus,
      ...unites.flatMap((u) => nus.map((s) => `${s} ${u}`)),
      ...(e >= 3 ? sciVariantes(m, e, unites) : []),
    ]),
  ];
}

/* ---------------------------------------------------------------------------
   Les préfixes et les unités
--------------------------------------------------------------------------- */

/** Les six préfixes du programme, avec ce qui les rend concrets. */
const PREFIXES = [
  { nom: "nano", symbole: "n", exposant: -9, mot: "un milliardième", exemple: "un atome mesure environ 0,1 nanomètre" },
  { nom: "micro", symbole: "µ", exposant: -6, mot: "un millionième", exemple: "une bactérie mesure quelques micromètres" },
  { nom: "milli", symbole: "m", exposant: -3, mot: "un millième", exemple: "une pièce de 1 euro est épaisse d'environ 2 millimètres" },
  { nom: "kilo", symbole: "k", exposant: 3, mot: "mille", exemple: "un kilomètre se parcourt à pied en une dizaine de minutes" },
  { nom: "méga", symbole: "M", exposant: 6, mot: "un million", exemple: "une photo de téléphone pèse quelques mégaoctets" },
  { nom: "giga", symbole: "G", exposant: 9, mot: "un milliard", exemple: "une clé USB contient des dizaines de gigaoctets" },
] as const;

/** Le préfixe d'un exposant ; l'exposant 0 est l'unité seule. */
function prefixe(e: number): { nom: string; symbole: string } {
  return PREFIXES.find((p) => p.exposant === e) ?? { nom: "", symbole: "" };
}

const UNITES = {
  metre: { nom: "mètre", pl: "mètres", sym: "m", f: false },
  gramme: { nom: "gramme", pl: "grammes", sym: "g", f: false },
  seconde: { nom: "seconde", pl: "secondes", sym: "s", f: true },
  octet: { nom: "octet", pl: "octets", sym: "o", f: false },
  watt: { nom: "watt", pl: "watts", sym: "W", f: false },
  litre: { nom: "litre", pl: "litres", sym: "L", f: false },
  hertz: { nom: "hertz", pl: "hertz", sym: "Hz", f: false },
  volt: { nom: "volt", pl: "volts", sym: "V", f: false },
} as const;
type UniteCle = keyof typeof UNITES;

/** « kilo » + « mètre » → « kilomètre(s) », accordé à la valeur. */
function mot(e: number, u: UniteCle, valeur = 1): string {
  const U = UNITES[u];
  return prefixe(e).nom + (pluriel(valeur) ? U.pl : U.nom);
}
const motPl = (e: number, u: UniteCle) => prefixe(e).nom + UNITES[u].pl;
/** « le mètre », « la seconde », « l'octet », « le hertz ». */
const leU = (u: UniteCle) => (/^[aeiouy]/.test(UNITES[u].nom) ? "l'" : UNITES[u].f ? "la " : "le ");

// ⭐ Les préfixes qu'on rencontre VRAIMENT avec chaque unité : pas de
// « microoctet » (l'octet ne se coupe pas), pas de « gigalitre ».
const EXPOSANTS_USUELS: Record<UniteCle, number[]> = {
  metre: [-9, -6, -3, 3],
  gramme: [-6, -3, 3],
  seconde: [-9, -6, -3],
  octet: [3, 6, 9],
  watt: [-3, 3, 6, 9],
  litre: [-6, -3],
  hertz: [3, 6, 9],
  volt: [-3, 3],
};
const COMBOS = (Object.keys(EXPOSANTS_USUELS) as UniteCle[]).flatMap((u) =>
  EXPOSANTS_USUELS[u].map((e) => ({ u, e }))
);
const PAIRES_PREFIXES = (Object.keys(EXPOSANTS_USUELS) as UniteCle[]).flatMap((u) =>
  EXPOSANTS_USUELS[u].flatMap((e1, i) => EXPOSANTS_USUELS[u].slice(i + 1).map((e2) => ({ u, e1, e2 })))
);

/**
 * L'axe des EXPOSANTS, de −12 à 12. Les préfixes s'y posent de trois en trois.
 * ⚠️ Aucun point sur les bornes : `number_line` centre ses étiquettes sur leur
 * valeur, et un point posé sur le minimum ou le maximum déborde de la moitié
 * de sa largeur.
 */
function axePrefixes(surligne?: number) {
  return {
    kind: "number_line" as const,
    min: -12,
    max: 12,
    step: 3,
    points: [
      ...PREFIXES.map((p) => ({
        value: p.exposant,
        label: p.exposant === surligne ? `${p.nom} ←` : p.nom,
        color: p.exposant === surligne ? "#7c3aed" : "#0f172a",
      })),
      { value: 0, label: "unité", color: "#0f172a" },
    ],
    display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true },
    size: { width: 320, height: 150 },
  };
}

// ⭐ CONVERTIR EN NOTATION SCIENTIFIQUE : des mesures du monde, chacune avec son
// préfixe naturel et des valeurs plausibles (toutes entre 1 et 10, pour que la
// réponse soit directement a × 10ⁿ). Les situations inventées sont dites telles.
const CONVERSIONS: { e: number; u: UniteCle; gn: string; vals: number[]; t: (v: string) => string }[] = [
  { e: 3, u: "metre", gn: "cette distance", vals: [2, 3, 4, 5, 6, 7, 8, 9], t: (v) => `Une course à pied fait ${v}.` },
  { e: 3, u: "metre", gn: "cette distance", vals: [3, 4, 5, 6, 7, 8, 9], t: (v) => `Un randonneur parcourt ${v} dans la matinée.` },
  { e: 3, u: "metre", gn: "cette longueur", vals: [2, 3, 4, 5, 6, 7], t: (v) => `Un très long pont mesure ${v}.` },
  { e: -3, u: "metre", gn: "ce diamètre", vals: [3, 4, 5, 6, 8], t: (v) => `Une vis a un diamètre de ${v}.` },
  { e: -3, u: "metre", gn: "cette hauteur d'eau", vals: [2, 3, 4, 5, 6, 7, 8], t: (v) => `Pendant une averse, il tombe ${v} de pluie en une heure.` },
  { e: -6, u: "metre", gn: "cette taille", vals: [1, 1.5, 2, 2.5, 3], t: (v) => `Au microscope, une bactérie mesure environ ${v}.` },
  { e: -6, u: "metre", gn: "ce diamètre", vals: [7, 7.5, 8], t: (v) => `Un globule rouge a un diamètre d'environ ${v}.` },
  { e: -9, u: "metre", gn: "cette finesse de gravure", vals: [3, 5, 7], t: (v) => `Les circuits d'une puce électronique sont gravés avec une finesse de ${v}.` },
  { e: -3, u: "gramme", gn: "cette masse", vals: [2, 2.5], t: (v) => `Un moustique pèse environ ${v}.` },
  { e: 3, u: "gramme", gn: "cette masse", vals: [7, 7.5, 8, 8.5, 9], t: (v) => `Un vélo de course pèse ${v}.` },
  { e: 3, u: "gramme", gn: "cette masse", vals: [2, 3, 4, 5], t: (v) => `Un sac de riz pèse ${v}.` },
  { e: -3, u: "seconde", gn: "cet écart", vals: [2, 3, 4, 5, 6, 7, 8, 9], t: (v) => `À l'arrivée d'une course de natation, deux nageurs sont départagés par ${v}.` },
  { e: -9, u: "seconde", gn: "cette durée", vals: [1, 2, 3], t: (v) => `Dans un modèle simplifié, un processeur effectue une opération en ${v}.` },
  { e: -6, u: "seconde", gn: "cette durée", vals: [2, 3, 4, 5, 6, 7, 8, 9], t: (v) => `Dans un exercice de physique, un signal électrique traverse un circuit en ${v}.` },
  { e: 3, u: "octet", gn: "cette taille", vals: [2, 3, 4, 5, 6, 7, 8, 9], t: (v) => `Un courriel sans pièce jointe pèse ${v}.` },
  { e: 6, u: "octet", gn: "cette taille", vals: [2, 3, 4, 5, 6, 7, 8, 9], t: (v) => `Une photo prise avec un téléphone pèse ${v}.` },
  { e: 9, u: "octet", gn: "cette capacité", vals: [2, 4, 8], t: (v) => `Une clé USB a une capacité de ${v}.` },
  { e: 9, u: "octet", gn: "cette taille", vals: [2, 3, 4, 5, 6], t: (v) => `Un film téléchargé pèse ${v}.` },
  { e: 3, u: "watt", gn: "cette puissance", vals: [2, 2.5, 3], t: (v) => `Un four électrique a une puissance de ${v}.` },
  { e: 6, u: "watt", gn: "cette puissance", vals: [2, 3, 4, 5], t: (v) => `Une éolienne a une puissance de ${v}.` },
  { e: 9, u: "watt", gn: "cette puissance", vals: [1, 1.3, 1.5], t: (v) => `Un réacteur de centrale nucléaire a une puissance d'environ ${v}.` },
  { e: -3, u: "litre", gn: "ce volume", vals: [2, 3, 4, 5, 6, 7, 8, 9], t: (v) => `Une seringue contient ${v} de médicament.` },
  { e: 9, u: "hertz", gn: "cette fréquence", vals: [2, 2.4, 3, 3.2, 3.6], t: (v) => `Le processeur d'un ordinateur tourne à ${v}.` },
  { e: 3, u: "hertz", gn: "cette fréquence", vals: [2, 3, 4, 5, 6, 7, 8, 9], t: (v) => `Un haut-parleur émet un son aigu de ${v}.` },
  { e: -3, u: "volt", gn: "cette tension", vals: [2, 3, 4, 5, 6, 7, 8, 9], t: (v) => `Dans un montage de physique, un capteur délivre une tension de ${v}.` },
];

/* ---------------------------------------------------------------------------
   Les objets du monde et leur ordre de grandeur
   ⛔ Valeurs SÛRES, arrondies, et toutes de la forme a × 10ⁿ avec 1 ≤ a < 3,2.
--------------------------------------------------------------------------- */
type Objet = { nom: string; f: boolean; approx: string; mant: string; exposant: number; unite: "m" | "kg" | "s" | "octets" };

const OBJETS: Objet[] = [
  // Longueurs, en mètres
  { nom: "le diamètre d'un atome", f: false, approx: "environ 0,1 nanomètre", mant: "1", exposant: -10, unite: "m" },
  { nom: "la taille d'un virus de la grippe", f: true, approx: "environ 100 nanomètres", mant: "1", exposant: -7, unite: "m" },
  { nom: "la taille d'une bactérie", f: true, approx: "environ 2 micromètres", mant: "2", exposant: -6, unite: "m" },
  { nom: "le diamètre d'une alvéole pulmonaire", f: false, approx: "environ 0,2 millimètre", mant: "2", exposant: -4, unite: "m" },
  { nom: "l'épaisseur d'une pièce de 1 euro", f: true, approx: "2,33 millimètres", mant: "2,33", exposant: -3, unite: "m" },
  { nom: "la longueur d'un stylo", f: true, approx: "environ 14 centimètres", mant: "1,4", exposant: -1, unite: "m" },
  { nom: "la taille d'un adulte", f: true, approx: "environ 1,70 mètre", mant: "1,7", exposant: 0, unite: "m" },
  { nom: "la hauteur d'un immeuble de cinq étages", f: true, approx: "environ 15 mètres", mant: "1,5", exposant: 1, unite: "m" },
  { nom: "la longueur d'un terrain de football", f: true, approx: "environ 105 mètres", mant: "1,05", exposant: 2, unite: "m" },
  { nom: "l'altitude du puy de Dôme", f: true, approx: "1 465 mètres", mant: "1,465", exposant: 3, unite: "m" },
  { nom: "l'altitude du Piton des Neiges", f: true, approx: "environ 3 070 mètres", mant: "3,07", exposant: 3, unite: "m" },
  { nom: "la distance d'un semi-marathon", f: true, approx: "21,1 kilomètres", mant: "2,11", exposant: 4, unite: "m" },
  { nom: "la longueur de la Loire", f: true, approx: "environ 1 000 kilomètres", mant: "1", exposant: 6, unite: "m" },
  { nom: "le diamètre de la Terre", f: false, approx: "environ 12 700 kilomètres", mant: "1,27", exposant: 7, unite: "m" },
  { nom: "la distance de la Terre au Soleil", f: true, approx: "environ 150 millions de kilomètres", mant: "1,5", exposant: 11, unite: "m" },
  // Masses, en kilogrammes
  { nom: "la masse d'un grain de riz", f: true, approx: "environ 25 milligrammes", mant: "2,5", exposant: -5, unite: "kg" },
  { nom: "la masse d'une pièce de 1 centime", f: true, approx: "2,3 grammes", mant: "2,3", exposant: -3, unite: "kg" },
  { nom: "la masse d'une baguette de pain", f: true, approx: "environ 250 grammes", mant: "2,5", exposant: -1, unite: "kg" },
  { nom: "la masse d'un litre d'eau", f: true, approx: "environ 1 kilogramme", mant: "1", exposant: 0, unite: "kg" },
  { nom: "la masse d'une voiture", f: true, approx: "environ 1,2 tonne", mant: "1,2", exposant: 3, unite: "kg" },
  { nom: "la masse d'un autobus", f: true, approx: "environ 12 tonnes", mant: "1,2", exposant: 4, unite: "kg" },
  { nom: "la masse de la tour Eiffel", f: true, approx: "environ 10 000 tonnes", mant: "1", exposant: 7, unite: "kg" },
  // Durées, en secondes
  { nom: "la durée d'un 100 mètres pour un sprinteur", f: true, approx: "environ 10 secondes", mant: "1", exposant: 1, unite: "s" },
  { nom: "la durée d'une mi-temps de football", f: true, approx: "45 minutes, soit 2 700 secondes", mant: "2,7", exposant: 3, unite: "s" },
  { nom: "la durée d'un mois de 30 jours", f: true, approx: "2 592 000 secondes", mant: "2,592", exposant: 6, unite: "s" },
  { nom: "la durée d'une vie de 80 ans", f: true, approx: "environ 2,5 milliards de secondes", mant: "2,5", exposant: 9, unite: "s" },
  // Quantité d'information, en octets
  { nom: "la taille d'un SMS", f: true, approx: "au plus 140 octets", mant: "1,4", exposant: 2, unite: "octets" },
];

const UNITE_LONGUE: Record<Objet["unite"], string> = {
  m: "mètres",
  kg: "kilogrammes",
  s: "secondes",
  octets: "octets",
};

/** L'ordre de grandeur écrit en clair : « 10⁻⁶ m ». */
const ordreTexte = (o: Objet) => `10${sup(o.exposant)} ${o.unite}`;

// ⭐ LES POPULATIONS : villes et pays dont le nombre d'habitants s'écrit a × 10ⁿ
// avec a entre 1 et 3 (chiffres arrondis, du milieu des années 2020).
const POPULATIONS = [
  { lieu: "Paris", de: "de Paris", approx: "environ 2,1 millions", mant: "2,1", exposant: 6 },
  { lieu: "Saint-Denis, à La Réunion", de: "de Saint-Denis, à La Réunion", approx: "environ 150 000", mant: "1,5", exposant: 5 },
  { lieu: "Bordeaux", de: "de Bordeaux", approx: "environ 260 000", mant: "2,6", exposant: 5 },
  { lieu: "Lille", de: "de Lille", approx: "environ 235 000", mant: "2,35", exposant: 5 },
  { lieu: "Grenoble", de: "de Grenoble", approx: "environ 155 000", mant: "1,55", exposant: 5 },
  { lieu: "la Belgique", de: "de la Belgique", approx: "environ 11,8 millions", mant: "1,18", exposant: 7 },
  { lieu: "les Pays-Bas", de: "des Pays-Bas", approx: "environ 18 millions", mant: "1,8", exposant: 7 },
  { lieu: "la Suède", de: "de la Suède", approx: "environ 10,5 millions", mant: "1,05", exposant: 7 },
  { lieu: "le Portugal", de: "du Portugal", approx: "environ 10,5 millions", mant: "1,05", exposant: 7 },
  { lieu: "l'Australie", de: "de l'Australie", approx: "environ 27 millions", mant: "2,7", exposant: 7 },
  { lieu: "le Sénégal", de: "du Sénégal", approx: "environ 18 millions", mant: "1,8", exposant: 7 },
  { lieu: "la Tunisie", de: "de la Tunisie", approx: "environ 12 millions", mant: "1,2", exposant: 7 },
  { lieu: "l'île Maurice", de: "de l'île Maurice", approx: "environ 1,3 million", mant: "1,3", exposant: 6 },
  { lieu: "le Japon", de: "du Japon", approx: "environ 124 millions", mant: "1,24", exposant: 8 },
  { lieu: "le Brésil", de: "du Brésil", approx: "environ 210 millions", mant: "2,1", exposant: 8 },
  { lieu: "le Mexique", de: "du Mexique", approx: "environ 130 millions", mant: "1,3", exposant: 8 },
  { lieu: "la Chine", de: "de la Chine", approx: "environ 1,4 milliard", mant: "1,4", exposant: 9 },
  { lieu: "l'Inde", de: "de l'Inde", approx: "environ 1,45 milliard", mant: "1,45", exposant: 9 },
  { lieu: "le continent africain", de: "du continent africain", approx: "environ 1,5 milliard", mant: "1,5", exposant: 9 },
] as const;

/* ---------------------------------------------------------------------------
   Les estimations : produits, montants, quotients
--------------------------------------------------------------------------- */

/** Un entier de mantisse comprise entre `lo` et `hi` : 10^p × [lo ; hi], arrondi lisiblement. */
function tire(p: number, lo: number, hi: number): number {
  if (p === 0) return randomInt(Math.round(lo * 10), Math.round(hi * 10)) / 10;
  const pas = p >= 3 ? Math.pow(10, p - 2) : 1;
  const min = Math.ceil((lo * Math.pow(10, p)) / pas);
  const max = Math.floor((hi * Math.pow(10, p)) / pas);
  return randomInt(min, max) * pas;
}

// ⭐ PRODUITS : chaque facteur a une mantisse entre 1 et 1,7, si bien que le
// produit exact garde la même puissance de dix que l'estimation.
const PRODUITS: { pa: number; pb: number; t: (a: string, b: string) => string; quoi: string; u?: string }[] = [
  { pa: 2, pb: 1, t: (a, b) => `Un camion transporte ${a} caisses de ${b} bouteilles.`, quoi: "le nombre total de bouteilles" },
  { pa: 3, pb: 1, t: (a, b) => `Une salle de concert vend ${a} billets à ${b} € l'un.`, quoi: "la recette", u: "en euros" },
  { pa: 2, pb: 2, t: (a, b) => `Un livre compte ${a} pages, avec environ ${b} mots par page.`, quoi: "le nombre de mots du livre" },
  { pa: 2, pb: 2, t: (a, b) => `Un champ compte ${a} rangées de ${b} pieds de maïs.`, quoi: "le nombre de pieds de maïs" },
  { pa: 2, pb: 1, t: (a, b) => `Une imprimante imprime ${a} pages par jour pendant ${b} jours.`, quoi: "le nombre de pages imprimées" },
  { pa: 2, pb: 1, t: (a, b) => `Un cycliste parcourt ${a} km par semaine pendant ${b} semaines.`, quoi: "la distance totale", u: "en kilomètres" },
  { pa: 4, pb: 1, t: (a, b) => `Un apiculteur possède ${b} ruches d'environ ${a} abeilles chacune.`, quoi: "le nombre total d'abeilles" },
  { pa: 4, pb: 1, t: (a, b) => `Un stade de ${a} places est plein pendant ${b} matchs.`, quoi: "le nombre total de spectateurs" },
  { pa: 2, pb: 2, t: (a, b) => `Une boulangerie vend ${a} baguettes par jour pendant ${b} jours.`, quoi: "le nombre de baguettes vendues" },
  { pa: 1, pb: 2, t: (a, b) => `Un robinet qui fuit perd ${a} litres d'eau par jour pendant ${b} jours.`, quoi: "le volume d'eau perdu", u: "en litres" },
  { pa: 4, pb: 2, t: (a, b) => `Une éolienne produit ${a} kWh par jour pendant ${b} jours.`, quoi: "l'énergie produite", u: "en kWh" },
  { pa: 2, pb: 2, t: (a, b) => `Un musicien répète ${a} minutes par jour pendant ${b} jours.`, quoi: "la durée totale de répétition", u: "en minutes" },
  { pa: 3, pb: 1, t: (a, b) => `Un randonneur fait ${a} pas par kilomètre et marche ${b} kilomètres.`, quoi: "le nombre de pas" },
  { pa: 1, pb: 1, t: (a, b) => `Un potager compte ${a} plants de tomates qui donnent chacun ${b} tomates.`, quoi: "le nombre de tomates récoltées" },
  { pa: 2, pb: 2, t: (a, b) => `Une cantine sert ${a} repas par jour pendant ${b} jours d'école.`, quoi: "le nombre de repas servis" },
  { pa: 2, pb: 2, t: (a, b) => `Un train régional transporte ${a} voyageurs par trajet et fait ${b} trajets dans le mois.`, quoi: "le nombre de voyageurs transportés" },
  { pa: 3, pb: 3, t: (a, b) => `Un site internet reçoit ${a} visites par heure pendant ${b} heures.`, quoi: "le nombre total de visites" },
  { pa: 1, pb: 2, t: (a, b) => `Les ${a} nageurs d'un club parcourent chacun ${b} longueurs de bassin dans le mois.`, quoi: "le nombre total de longueurs" },
  { pa: 2, pb: 1, t: (a, b) => `Une commune plante ${a} arbres par an pendant ${b} ans.`, quoi: "le nombre d'arbres plantés" },
];

// ⭐ MONTANTS : on estime un total en euros (réponse libre, une puissance de 10).
const MONTANTS: { pa: number; pb: number; t: (a: string, b: string) => string }[] = [
  { pa: 2, pb: 1, t: (a, b) => `Les ${a} élèves de 4e d'un collège achètent chacun un cahier d'activités à ${b} €.` },
  { pa: 4, pb: 1, t: (a, b) => `Pour un match de rugby, ${a} spectateurs paient chacun ${b} € leur place.` },
  { pa: 4, pb: 1, t: (a, b) => `Une commune de ${a} habitants dépense ${b} € par habitant pour sa piscine.` },
  { pa: 2, pb: 2, t: (a, b) => `Un club de ${a} adhérents paie pour chacun une licence de ${b} €.` },
  { pa: 3, pb: 2, t: (a, b) => `Un festival vend ${a} pass de trois jours à ${b} € l'un.` },
  { pa: 2, pb: 1, t: (a, b) => `Un fleuriste vend ${a} bouquets à ${b} € pièce pour la fête des mères.` },
  { pa: 2, pb: 3, t: (a, b) => `Une agence vend ${a} voyages à ${b} € l'un.` },
  { pa: 4, pb: 1, t: (a, b) => `Un cinéma accueille ${a} spectateurs dans le mois, à ${b} € la place.` },
  { pa: 2, pb: 3, t: (a, b) => `Un magasin vend ${a} vélos électriques à ${b} € l'un.` },
  { pa: 3, pb: 0, t: (a, b) => `Une boulangerie vend ${a} croissants dans le mois, à ${b} € l'un.` },
  { pa: 3, pb: 1, t: (a, b) => `Un restaurant sert ${a} menus dans le mois, à ${b} € le menu.` },
  { pa: 2, pb: 2, t: (a, b) => `Une mairie achète ${a} arbres à planter, à ${b} € l'arbre.` },
  { pa: 2, pb: 2, t: (a, b) => `Une école achète ${a} tablettes à ${b} € l'une.` },
  { pa: 4, pb: 1, t: (a, b) => `Un péage d'autoroute voit passer ${a} voitures dans la journée, qui paient chacune ${b} €.` },
  { pa: 1, pb: 3, t: (a, b) => `Une famille rembourse sa voiture en ${a} mensualités de ${b} €.` },
  { pa: 3, pb: 0, t: (a, b) => `Une association vend ${a} tickets de tombola à ${b} € l'un.` },
];

// ⭐ QUOTIENTS : numérateur de mantisse 1,3 à 2,5, dénominateur de mantisse 1 à
// 1,3 — le quotient exact garde la puissance de dix de l'estimation.
const QUOTIENTS: { pn: number; pd: number; t: (n: string, d: string) => string; quoi: string; u?: string }[] = [
  { pn: 4, pd: 2, t: (n, d) => `Une bibliothèque range ses ${n} livres sur des étagères de ${d} livres.`, quoi: "le nombre d'étagères nécessaires" },
  { pn: 3, pd: 2, t: (n, d) => `Un trajet de ${n} km se fait en voiture à ${d} km/h de moyenne.`, quoi: "la durée du trajet", u: "en heures" },
  { pn: 5, pd: 1, t: (n, d) => `Un budget de ${n} € est partagé équitablement entre ${d} associations.`, quoi: "la part de chaque association", u: "en euros" },
  { pn: 4, pd: 1, t: (n, d) => `Une citerne de ${n} litres se vide par un robinet qui débite ${d} litres par minute.`, quoi: "la durée de la vidange", u: "en minutes" },
  { pn: 3, pd: 1, t: (n, d) => `Un fichier de ${n} mégaoctets se télécharge à ${d} mégaoctets par seconde.`, quoi: "la durée du téléchargement", u: "en secondes" },
  { pn: 4, pd: 1, t: (n, d) => `Un agriculteur récolte ${n} kg de pommes de terre et les met en sacs de ${d} kg.`, quoi: "le nombre de sacs" },
  { pn: 3, pd: 3, t: (n, d) => `Un marcheur parcourt ${n} mètres en ${d} secondes.`, quoi: "sa vitesse", u: "en mètres par seconde" },
  { pn: 7, pd: 4, t: (n, d) => `Dans un modèle simplifié, un pays de ${n} habitants compte ${d} médecins généralistes.`, quoi: "le nombre d'habitants par médecin" },
  { pn: 7, pd: 2, t: (n, d) => `Une entreprise de ${d} salariés réalise un chiffre d'affaires de ${n} € par an.`, quoi: "le chiffre d'affaires par salarié", u: "en euros" },
  { pn: 5, pd: 2, t: (n, d) => `Une forêt de ${n} arbres s'étend sur ${d} hectares.`, quoi: "le nombre d'arbres par hectare" },
  { pn: 4, pd: 2, t: (n, d) => `Un festival de ${n} spectateurs installe ${d} points d'eau.`, quoi: "le nombre de spectateurs par point d'eau" },
  { pn: 3, pd: 2, t: (n, d) => `Une piste cyclable de ${n} m est éclairée par ${d} lampadaires régulièrement espacés.`, quoi: "l'écart entre deux lampadaires", u: "en mètres" },
  { pn: 4, pd: 2, t: (n, d) => `Un conte de ${n} mots est imprimé à raison de ${d} mots par page.`, quoi: "le nombre de pages" },
  { pn: 5, pd: 1, t: (n, d) => `Une usine remplit ${n} bouteilles en ${d} heures.`, quoi: "le nombre de bouteilles remplies par heure" },
  { pn: 1, pd: 2, t: (n, d) => `Une pile de ${d} feuilles de papier mesure ${n} mm de haut.`, quoi: "l'épaisseur d'une feuille", u: "en millimètres" },
  { pn: 3, pd: 5, t: (n, d) => `Un sac de riz de ${n} g contient environ ${d} grains.`, quoi: "la masse d'un grain", u: "en grammes" },
  { pn: 2, pd: 1, t: (n, d) => `Un groupe de ${d} amis partage une addition de ${n} € au restaurant.`, quoi: "la part de chacun", u: "en euros" },
];

/** Un nombre arrondi à un seul chiffre significatif : 48 → 50, 1 230 → 1 000. */
function arrondi1(x: number): number {
  const e = Math.floor(Math.log10(x));
  return Math.round(x / Math.pow(10, e)) * Math.pow(10, e);
}

/* ---------------------------------------------------------------------------
   La vraisemblance
--------------------------------------------------------------------------- */

// ⭐ DES CALCULS DU QUOTIDIEN dont on annonce le bon résultat… ou un résultat
// décalé d'un facteur 10 ou 100.
const CALCULS: { a: [number, number]; b: readonly number[] | [number, number]; ctx: (a: string, b: string) => string; u: string }[] = [
  { a: [12, 48], b: [2, 9], ctx: (a, b) => `le prix de ${a} cahiers à ${b} € l'un`, u: " €" },
  { a: [2, 9], b: [45, 130], ctx: (a, b) => `la distance parcourue en ${a} heures à ${b} km/h`, u: " km" },
  { a: [12, 38], b: [14, 36], ctx: (a, b) => `le nombre de fauteuils d'un théâtre de ${a} rangées de ${b} fauteuils`, u: "" },
  { a: [12, 48], b: [5, 25], ctx: (a, b) => `la masse de ${a} sacs de ${b} kg`, u: " kg" },
  { a: [12, 60], b: [15, 45], ctx: (a, b) => `le nombre de pages lues en ${a} jours, à raison de ${b} pages par jour`, u: "" },
  { a: [120, 380], b: [45, 95], ctx: (a, b) => `l'aire d'un champ rectangulaire de ${a} m sur ${b} m`, u: " m²" },
  { a: [12, 45], b: [5, 20], ctx: (a, b) => `le volume d'eau contenu dans ${a} bidons de ${b} litres`, u: " litres" },
  { a: [12, 45], b: [60, 90], ctx: (a, b) => `le nombre de battements de cœur en ${a} minutes, à ${b} battements par minute`, u: "" },
  { a: [120, 480], b: [8, 25], ctx: (a, b) => `la recette de ${a} billets vendus à ${b} € l'un`, u: " €" },
  { a: [20, 90], b: [6, 10, 12] as const, ctx: (a, b) => `le nombre d'œufs dans ${a} boîtes de ${b} œufs`, u: "" },
  { a: [3, 9], b: [60, 900], ctx: (a, b) => `l'énergie consommée en ${a} heures par un appareil de ${b} W`, u: " Wh" },
  { a: [3, 12], b: [1200, 1500], ctx: (a, b) => `le nombre de pas faits sur ${a} km, à ${b} pas par kilomètre`, u: "" },
  { a: [6, 24], b: [10, 50], ctx: (a, b) => `la longueur de ${a} rouleaux de grillage de ${b} m`, u: " m" },
  { a: [18, 40], b: [25, 60], ctx: (a, b) => `le nombre de tuiles d'un toit de ${a} rangées de ${b} tuiles`, u: "" },
  { a: [12, 40], b: [25, 80], ctx: (a, b) => `le nombre de graines dans ${a} sachets de ${b} graines`, u: "" },
  { a: [15, 35], b: [22, 30], ctx: (a, b) => `le nombre d'élèves de ${a} classes de ${b} élèves`, u: "" },
];

// ⭐ DES GRANDEURS DU MONDE, SÛRES : la bonne valeur, une valeur au moins dix
// fois trop grande, une au moins dix fois trop petite.
const SITUATIONS: { obj: string; bon: string; grand: string; petit: string }[] = [
  { obj: "la masse d'un chat adulte", bon: "4 kg", grand: "4 tonnes", petit: "4 grammes" },
  { obj: "la hauteur d'une porte d'appartement", bon: "2 mètres", grand: "200 mètres", petit: "2 centimètres" },
  { obj: "la longueur d'un crayon neuf", bon: "17 centimètres", grand: "17 mètres", petit: "17 millimètres" },
  { obj: "la masse d'une pomme", bon: "150 grammes", grand: "150 kilogrammes", petit: "150 milligrammes" },
  { obj: "la durée d'un film au cinéma", bon: "2 heures", grand: "200 heures", petit: "2 minutes" },
  { obj: "la vitesse d'un cycliste en balade", bon: "15 km/h", grand: "1 500 km/h", petit: "0,15 km/h" },
  { obj: "le volume d'une grande bouteille d'eau", bon: "1,5 litre", grand: "150 litres", petit: "1,5 millilitre" },
  { obj: "la longueur d'une piscine olympique", bon: "50 mètres", grand: "50 kilomètres", petit: "50 centimètres" },
  { obj: "la masse d'une voiture", bon: "1,2 tonne", grand: "1 200 tonnes", petit: "1,2 kilogramme" },
  { obj: "le prix d'une baguette de pain", bon: "1,10 €", grand: "110 €", petit: "0,01 €" },
  { obj: "la hauteur d'un immeuble de dix étages", bon: "30 mètres", grand: "3 kilomètres", petit: "30 centimètres" },
  { obj: "l'épaisseur d'un téléphone portable", bon: "8 millimètres", grand: "8 mètres", petit: "8 micromètres" },
  { obj: "la masse d'un éléphant d'Afrique adulte", bon: "5 tonnes", grand: "5 000 tonnes", petit: "5 kilogrammes" },
  { obj: "la longueur d'une fourmi", bon: "5 millimètres", grand: "5 mètres", petit: "5 micromètres" },
  { obj: "la vitesse d'un avion de ligne", bon: "900 km/h", grand: "90 000 km/h", petit: "9 km/h" },
  { obj: "le volume d'eau d'une baignoire pleine", bon: "150 litres", grand: "15 000 litres", petit: "1,5 litre" },
  { obj: "la distance à vol d'oiseau entre Paris et Lyon", bon: "400 km", grand: "40 000 km", petit: "4 km" },
  { obj: "la taille d'une bactérie", bon: "2 micromètres", grand: "2 millimètres", petit: "2 nanomètres" },
  { obj: "la masse d'un nouveau-né", bon: "3,3 kilogrammes", grand: "330 kilogrammes", petit: "33 grammes" },
  { obj: "l'altitude du Piton des Neiges", bon: "3 070 mètres", grand: "307 kilomètres", petit: "30 mètres" },
  { obj: "la longueur d'un terrain de football", bon: "105 mètres", grand: "10,5 kilomètres", petit: "1,05 mètre" },
  { obj: "la durée d'une nuit de sommeil", bon: "8 heures", grand: "800 heures", petit: "8 minutes" },
  { obj: "la masse d'un sac de ciment", bon: "25 kilogrammes", grand: "25 tonnes", petit: "25 grammes" },
  { obj: "la hauteur de la tour Eiffel", bon: "330 mètres", grand: "33 kilomètres", petit: "3,3 mètres" },
  { obj: "le volume d'une canette de soda", bon: "33 centilitres", grand: "33 litres", petit: "33 millilitres" },
];

const VERDICTS = {
  ok: "plausible : c'est le bon ordre de grandeur",
  grand: "absurde : beaucoup trop grand",
  petit: "absurde : beaucoup trop petit",
  rien: "on ne peut rien dire sans refaire le calcul",
} as const;

// ⭐ UNE UNITÉ BIEN OU MAL CHOISIE : la valeur juste et son exposant, et les
// exposants qui la rendent absurde (au moins un facteur 1 000 d'écart).
const MESURES: { obj: string; n: string; e: number; u: UniteCle; faux: number[] }[] = [
  { obj: "l'épaisseur d'une feuille de papier", n: "0,1", e: -3, u: "metre", faux: [0, 3, -6] },
  { obj: "la longueur d'une salle de classe", n: "8", e: 0, u: "metre", faux: [3, -3, -6] },
  { obj: "la capacité d'une clé USB", n: "64", e: 9, u: "octet", faux: [3, 0] },
  { obj: "la taille d'une photo de téléphone", n: "3", e: 6, u: "octet", faux: [9, 3, 0] },
  { obj: "la masse d'un sac de riz", n: "5", e: 3, u: "gramme", faux: [0, -3] },
  { obj: "la quantité de paracétamol dans un comprimé", n: "500", e: -3, u: "gramme", faux: [0, 3, -6] },
  { obj: "le temps d'un sprinteur sur 100 mètres", n: "10", e: 0, u: "seconde", faux: [-3, -6] },
  { obj: "la taille d'une bactérie", n: "2", e: -6, u: "metre", faux: [-3, 0, -9] },
  { obj: "la taille d'un virus", n: "100", e: -9, u: "metre", faux: [-6, -3] },
  { obj: "la puissance d'une bouilloire", n: "2", e: 3, u: "watt", faux: [9, 6, 0, -3] },
  { obj: "la puissance d'un réacteur de centrale nucléaire", n: "1", e: 9, u: "watt", faux: [3, 0] },
  { obj: "la fréquence du processeur d'un ordinateur", n: "3", e: 9, u: "hertz", faux: [3, 0] },
  { obj: "la longueur d'un semi-marathon", n: "21", e: 3, u: "metre", faux: [0, -3] },
  { obj: "la longueur d'une fourmi", n: "5", e: -3, u: "metre", faux: [3, 0, -6] },
  { obj: "le volume d'une cuillère à café", n: "5", e: -3, u: "litre", faux: [0, -6] },
  { obj: "le volume d'une canette", n: "330", e: -3, u: "litre", faux: [0, -6] },
  { obj: "la tension d'une pile bâton", n: "1,5", e: 0, u: "volt", faux: [3, -3] },
  { obj: "la tension d'une prise électrique en France", n: "230", e: 0, u: "volt", faux: [3, -3] },
  { obj: "la durée d'un clignement d'œil", n: "300", e: -3, u: "seconde", faux: [0, -6] },
  { obj: "l'épaisseur d'un cheveu", n: "70", e: -6, u: "metre", faux: [-3, 0, -9] },
  { obj: "la masse d'un grain de riz", n: "25", e: -3, u: "gramme", faux: [0, 3, -6] },
  { obj: "la distance de la Terre à la Lune", n: "384 000", e: 3, u: "metre", faux: [0, -3] },
  { obj: "la masse d'une voiture", n: "1 200", e: 3, u: "gramme", faux: [0, -3] },
  { obj: "la taille d'un courriel sans pièce jointe", n: "5", e: 3, u: "octet", faux: [9, 6] },
];
const valeurDe = (n: string) => Number(n.replace(/ /g, "").replace(",", "."));

const UNITE_VERDICTS = {
  ok: "l'ordre de grandeur est cohérent",
  grand: "absurde : l'unité choisie est beaucoup trop grande",
  petit: "absurde : l'unité choisie est beaucoup trop petite",
} as const;

/* ---------------------------------------------------------------------------
   Le défi : conversions à corriger, conversions à faire
--------------------------------------------------------------------------- */

// Les préfixes d'usage, unité seule comprise (exposant 0).
const ECHELONS_CONV: Partial<Record<UniteCle, number[]>> = {
  metre: [-6, -3, 0, 3],
  gramme: [-3, 0, 3],
  octet: [0, 3, 6, 9],
  litre: [-3, 0],
  watt: [0, 3, 6, 9],
  seconde: [-6, -3, 0],
};
const PAIRES_CONV = (Object.keys(ECHELONS_CONV) as UniteCle[]).flatMap((u) => {
  const es = ECHELONS_CONV[u]!;
  return es.flatMap((grand) => es.filter((petit) => petit < grand && grand - petit <= 6).map((petit) => ({ u, grand, petit })));
});

// ⭐ CONVERSIONS DANS LA VIE COURANTE, du grand vers le petit (le résultat est entier).
const CONVERSIONS_DEFI: { u: UniteCle; grand: number; petit: number; vals: number[]; t: (v: string) => string }[] = [
  { u: "metre", grand: 3, petit: 0, vals: [3, 4, 5, 6, 8, 12, 15, 18], t: (v) => `Un sentier de randonnée mesure ${v}.` },
  { u: "metre", grand: 3, petit: -3, vals: [2, 3, 4, 5, 6, 7, 8, 9], t: (v) => `Une course à pied fait ${v}.` },
  { u: "metre", grand: 0, petit: -3, vals: [2, 3, 4], t: (v) => `Une planche mesure ${v} de long.` },
  { u: "metre", grand: -3, petit: -6, vals: [3, 4, 5, 6, 8], t: (v) => `Une vis a un diamètre de ${v}.` },
  { u: "metre", grand: 3, petit: 0, vals: [5, 6, 8, 10, 12, 15], t: (v) => `Un coureur s'entraîne sur une boucle de ${v}.` },
  { u: "gramme", grand: 3, petit: 0, vals: [1, 2, 5], t: (v) => `Un paquet de farine pèse ${v}.` },
  { u: "gramme", grand: 3, petit: -3, vals: [1, 2], t: (v) => `Un melon pèse ${v}.` },
  { u: "gramme", grand: 0, petit: -3, vals: [8, 9, 10, 11], t: (v) => `Un sachet de levure contient ${v} de levure.` },
  { u: "gramme", grand: 3, petit: 0, vals: [12, 15, 18, 20, 23], t: (v) => `Une valise pèse ${v}.` },
  { u: "octet", grand: 9, petit: 6, vals: [4, 8, 16, 32, 64], t: (v) => `Une clé USB a une capacité de ${v}.` },
  { u: "octet", grand: 6, petit: 3, vals: [2, 3, 4, 5, 6, 7, 8, 9], t: (v) => `Une photo pèse ${v}.` },
  { u: "octet", grand: 9, petit: 0, vals: [2, 3, 4, 5, 6], t: (v) => `Un film pèse ${v}.` },
  { u: "octet", grand: 6, petit: 0, vals: [3, 4, 5, 6, 7, 8], t: (v) => `Une chanson pèse ${v}.` },
  { u: "watt", grand: 3, petit: 0, vals: [1, 2, 3], t: (v) => `Un radiateur électrique a une puissance de ${v}.` },
  { u: "watt", grand: 6, petit: 3, vals: [2, 3, 4, 5, 6], t: (v) => `Une éolienne a une puissance de ${v}.` },
  { u: "watt", grand: 9, petit: 6, vals: [2, 3, 4, 5], t: (v) => `Une grande centrale électrique a une puissance de ${v}.` },
  { u: "litre", grand: 0, petit: -3, vals: [1, 1.5, 2], t: (v) => `Une bouteille contient ${v} d'eau.` },
  { u: "seconde", grand: 0, petit: -3, vals: [10, 11, 12], t: (v) => `Un sprinteur court le 100 mètres en ${v}.` },
  { u: "seconde", grand: -3, petit: -6, vals: [100, 150, 200, 250, 300], t: (v) => `Dans un enregistrement, une note très brève dure ${v}.` },
  { u: "hertz", grand: 9, petit: 6, vals: [2, 3], t: (v) => `Le processeur d'un ordinateur tourne à ${v}.` },
  { u: "hertz", grand: 3, petit: 0, vals: [2, 3, 4, 5, 6, 7, 8, 9], t: (v) => `Un haut-parleur émet un son de ${v}.` },
];

export const ordresGrandeurBank: TutorBankItemV4[] = [
  /* =========================================================================
     ORDRE_PREFIXE — nano, micro, milli, kilo, méga, giga
  ========================================================================= */
  {
    kind: "template",
    id: "4e_ordre_prefixe_tpl_1_puissance",
    niveau: "4e",
    matiere: "maths",
    notionId: "ordre_grandeur",
    microId: "ordre_prefixe",
    difficulty: 2,
    theme: "neutral",
    hint: "Les préfixes vont de trois en trois : milli, micro, nano vers le bas ; kilo, méga, giga vers le haut.",
    tags: ["ordre", "prefixe", "qcm", "template", "canvas"],
    generate: () => {
      const { u, e } = randomChoice(COMBOS);
      const p = PREFIXES.find((x) => x.exposant === e)!;
      const U = UNITES[u];
      const m = mot(e, u);
      const sym = p.symbole + U.sym;
      const correct = `$10^{${p.exposant}}$`;
      const support = randomChoice(["dans un manuel de sciences", "sur une fiche technique", "dans un exercice de physique", "sur une notice"] as const);
      const tournure = randomInt(0, 4);
      const text =
        tournure === 0
          ? `Dans le mot « ${m} », par quelle puissance de 10 le préfixe « ${p.nom} » multiplie-t-il ${leU(u)}${U.nom} ?`
          : tournure === 1
            ? `1 ${m} = … ${U.pl}. Par quelle puissance de 10 faut-il remplacer les points ?`
            : tournure === 2
              ? `On lit « ${sym} » (${m}) ${support}. Que vaut le préfixe « ${p.nom} » en puissance de 10 ?`
              : tournure === 3
                ? `${U.f ? "Une" : "Un"} ${m}, c'est combien ${deNu(U.pl)} ? Choisis la bonne puissance de 10.`
                : `Quelle puissance de 10 se cache derrière le préfixe du mot « ${m} » (symbole ${sym}) ?`;
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          `$10^{${-p.exposant}}$`,
          `$10^{${p.exposant > 0 ? p.exposant - 3 : p.exposant + 3}}$`,
          `$10^{${p.exposant > 0 ? p.exposant + 3 : p.exposant - 3}}$`,
          `$10^{${p.exposant > 0 ? 2 : -2}}$`,
          `$10^{${p.exposant > 0 ? 12 : -12}}$`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : un préfixe est une puissance de dix écrite en un mot. Les six du programme vont de trois en trois.\n\n" +
          "Méthode : on se rappelle le sens — vers le PETIT pour milli, micro, nano ; vers le GRAND pour kilo, méga, giga.\n\n" +
          `Calcul : « ${p.nom} » vaut ${p.mot}, soit $10^{${p.exposant}}$ : 1 ${m} $= 10^{${p.exposant}}$ ${U.nom}.\n\n` +
          `Conclusion : ⭐ pour s'en souvenir, ${p.exemple}.`,
        canvas: axePrefixes(p.exposant),
      };
    },
  },
  {
    kind: "template",
    id: "4e_ordre_prefixe_tpl_2_convertir",
    niveau: "4e",
    matiere: "maths",
    notionId: "ordre_grandeur",
    microId: "ordre_prefixe",
    difficulty: 3,
    theme: "neutral",
    hint: "On remplace le préfixe par sa puissance de dix ; le nombre devant ne change pas.",
    tags: ["ordre", "prefixe", "convertir", "template"],
    generate: () => {
      const c = randomChoice(CONVERSIONS);
      const p = prefixe(c.e);
      const n = randomChoice(c.vals);
      const valeur = `${fr(n)} ${mot(c.e, c.u, n)}`;
      const pl = UNITES[c.u].pl;
      const phrase = c.t(valeur);
      const tournure = randomInt(0, 3);
      const question =
        tournure === 0
          ? `Écris ${c.gn} en ${pl}, en notation scientifique.`
          : tournure === 1
            ? `Combien cela fait-il ${deNu(pl)} ? Donne le résultat en notation scientifique.`
            : tournure === 2
              ? `Convertis ${c.gn} en ${pl} et écris le résultat sous la forme $a \\times 10^{n}$.`
              : `En ${pl}, que vaut ${c.gn} ? Réponds en notation scientifique.`;
      return {
        text: `${phrase} ${question}`,
        format: "short",
        expected: sciVariantes(n, c.e, [UNITES[c.u].sym, UNITES[c.u].pl, UNITES[c.u].nom]),
        comparator: "exact_text",
        explanation:
          "Définition : un préfixe se remplace par sa puissance de dix, et le nombre reste devant.\n\n" +
          "Méthode : on écrit le nombre, puis « fois dix puissance » l'exposant du préfixe.\n\n" +
          `Calcul : « ${p.nom} » vaut $10^{${c.e}}$, donc ${valeur} $= ${tex(n)} \\times 10^{${c.e}}$ ${pl}.\n\n` +
          `Conclusion : ⚠️ le nombre devant ne change PAS. Seul le préfixe devient une puissance de dix.`,
      };
    },
  },
  {
    // ⭐ VALEUR PARTICULIÈRE : « micro » veut dire « très petit » dans la langue
    // courante — microbe, micro-onde, microscope — mais il vaut exactement
    // 10⁻⁶ en mathématiques. Ce décalage se retient, il ne se génère pas.
    kind: "fixed",
    id: "4e_ordre_prefixe_fixed_micro",
    niveau: "4e",
    matiere: "maths",
    notionId: "ordre_grandeur",
    microId: "ordre_prefixe",
    difficulty: 3,
    theme: "neutral",
    text: "Dans la langue courante, « micro » veut dire « très petit ». En mathématiques, que vaut exactement le préfixe micro ?",
    format: "qcm",
    choices: [
      "$10^{-6}$, soit un millionième",
      "$10^{-3}$, soit un millième",
      "$10^{-9}$, soit un milliardième",
      "« très petit », sans valeur précise",
    ],
    expected: ["$10^{-6}$, soit un millionième"],
    comparator: "mcq_exact",
    hint: "Micro se place entre milli et nano.",
    explanation:
      "Définition : en mathématiques et en sciences, chaque préfixe a une valeur EXACTE, pas une valeur d'ambiance.\n\n" +
      "Méthode : on redescend l'échelle de trois en trois — milli vaut $10^{-3}$, micro vaut $10^{-6}$, nano vaut $10^{-9}$.\n\n" +
      "Calcul : micro $= 10^{-6}$, soit un millionième.\n\n" +
      "Conclusion : ⚠️ c'est le piège du vocabulaire. « Microbe » et « microscope » veulent dire « petit » ; le préfixe micro, lui, veut dire « un millionième », et rien d'autre.",
    tags: ["ordre", "prefixe", "valeur_particuliere", "vocabulaire", "qcm"],
  },
  {
    kind: "template",
    id: "4e_ordre_prefixe_tpl_3_comparer",
    niveau: "4e",
    matiere: "maths",
    notionId: "ordre_grandeur",
    microId: "ordre_prefixe",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte combien il y a de rangs de trois entre les deux préfixes.",
    tags: ["ordre", "prefixe", "comparer", "qcm", "template", "canvas"],
    generate: () => {
      const paire = randomChoice(PAIRES_PREFIXES);
      const [ea, eb] = shuffle([paire.e1, paire.e2]);
      const u = paire.u;
      const U = UNITES[u];
      const k = Math.abs(ea - eb);
      const eGrand = Math.max(ea, eb);
      const ePetit = Math.min(ea, eb);
      const tournure = randomInt(0, 3);
      const sfx = tournure === 0 ? " fois" : "";
      const text =
        tournure === 0
          ? `Combien de fois 1 ${mot(ea, u)} est-${U.f ? "elle" : "il"} plus ${ea > eb ? "grand" : "petit"}${U.f ? "e" : ""} que 1 ${mot(eb, u)} ?`
          : tournure === 1
            ? `Combien faut-il ${deNu(motPl(ePetit, u))} pour faire 1 ${mot(eGrand, u)} ?`
            : tournure === 2
              ? `Par combien faut-il multiplier 1 ${mot(ePetit, u)} pour obtenir 1 ${mot(eGrand, u)} ?`
              : `Quel est le rapport entre 1 ${mot(eGrand, u)} et 1 ${mot(ePetit, u)} ?`;
      const correct = `$10^{${k}}$${sfx}`;
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          `$10^{${k + 3}}$${sfx}`,
          `$10^{${Math.max(1, k - 3)}}$${sfx}`,
          `${k}${sfx}`,
          `$10^{${-k}}$${sfx}`,
          `$10^{${Math.abs(ea) + Math.abs(eb) + 3}}$${sfx}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : comparer deux préfixes, c'est SOUSTRAIRE leurs exposants — jamais les soustraire eux-mêmes.\n\n" +
          "Méthode : on écrit les deux puissances de dix, puis on regarde l'écart des exposants.\n\n" +
          `Calcul : « ${prefixe(eGrand).nom} » vaut $10^{${eGrand}}$ et « ${prefixe(ePetit).nom} » vaut $10^{${ePetit}}$. L'écart des exposants vaut $${eGrand} - ${ePetit < 0 ? `(${ePetit})` : ePetit} = ${k}$, donc 1 ${mot(eGrand, u)} $= 10^{${k}}$ ${motPl(ePetit, u)}.\n\n` +
          `Conclusion : ⚠️ l'erreur fréquente est de répondre ${k} — c'est l'écart des EXPOSANTS, pas le rapport des nombres.`,
        canvas: axePrefixes(ea),
      };
    },
  },

  /* =========================================================================
     ORDRE_ASSOCIER — la taille du monde
  ========================================================================= */
  {
    kind: "template",
    id: "4e_ordre_associer_tpl_1_objet",
    niveau: "4e",
    matiere: "maths",
    notionId: "ordre_grandeur",
    microId: "ordre_associer",
    difficulty: 3,
    theme: "neutral",
    hint: "Un ordre de grandeur ne se calcule pas : il se compare à ce qu'on connaît déjà.",
    tags: ["ordre", "associer", "qcm", "template"],
    generate: () => {
      const o = randomChoice(OBJETS);
      const ul = UNITE_LONGUE[o.unite];
      const correct = `environ $10^{${o.exposant}}$ ${o.unite}`;
      const tournure = randomInt(0, 3);
      const text =
        tournure === 0
          ? `Quel est l'ordre de grandeur ${de(o.nom)}, en ${ul} ?`
          : tournure === 1
            ? `Parmi ces puissances de 10, laquelle donne le mieux l'ordre de grandeur ${de(o.nom)} (en ${ul}) ?`
            : tournure === 2
              ? `${cap(o.nom)}, exprimé${o.f ? "e" : ""} en ${ul}, est de l'ordre de… ?`
              : `Sans calculer, associe ${a(o.nom)} son ordre de grandeur en ${ul}.`;
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          `environ $10^{${o.exposant + 3}}$ ${o.unite}`,
          `environ $10^{${o.exposant - 3}}$ ${o.unite}`,
          `environ $10^{${-o.exposant}}$ ${o.unite}`,
          `environ $10^{${o.exposant + 6}}$ ${o.unite}`,
          `environ $10^{${o.exposant - 6}}$ ${o.unite}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : l'ordre de grandeur d'une mesure est la puissance de dix de son écriture scientifique $a \\times 10^{n}$, quand $a$ est proche de 1. Il ne s'agit pas d'être exact, mais d'être dans le bon rang.\n\n" +
          "Méthode : on se raccroche à un repère connu — un adulte mesure environ $10^{0}$ mètre, soit 1 mètre.\n\n" +
          `Calcul : ${o.nom} vaut ${o.approx}, soit environ $${o.mant.replace(",", "{,}")} \\times 10^{${o.exposant}}$ ${o.unite} : son ordre de grandeur est ${ordreTexte(o)}.\n\n` +
          `Conclusion : ⭐ ces ordres se retiennent comme des repères, pas comme des résultats. Ils servent ensuite à juger si un calcul est vraisemblable.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_ordre_associer_tpl_2_ranger",
    niveau: "4e",
    matiere: "maths",
    notionId: "ordre_grandeur",
    microId: "ordre_associer",
    difficulty: 4,
    theme: "neutral",
    hint: "On compare les exposants, pas les noms.",
    tags: ["ordre", "associer", "ranger", "qcm", "template", "canvas"],
    generate: () => {
      // ⚠️ On ne range que des grandeurs de MÊME unité, et un seul objet par
      // exposant : deux objets du même rang rendraient DEUX rangements corrects.
      const unite = randomChoice(["m", "m", "kg", "s"] as const);
      const parExposant = new Map<number, Objet>();
      for (const o of shuffle(OBJETS.filter((x) => x.unite === unite))) {
        if (!parExposant.has(o.exposant)) parExposant.set(o.exposant, o);
      }
      const trois = shuffle([...parExposant.values()]).slice(0, 3);
      const tries = [...trois].sort((x, y) => x.exposant - y.exposant);
      const correct = tries.map((o) => o.nom).join(" < ");
      // ⚠️ Les cinq autres rangements sont ÉNUMÉRÉS, pas tirés au sort : trois
      // mélanges au hasard retombaient sur le bon ordre ou l'un sur l'autre.
      const [x, y, z] = tries;
      const faux = [
        [z, y, x],
        [y, x, z],
        [x, z, y],
        [z, x, y],
        [y, z, x],
      ].map((perm) => perm.map((o) => o.nom).join(" < "));
      const liste = shuffle([...trois]).map((o) => o.nom).join(" ; ");
      const tournure = randomInt(0, 2);
      const text =
        tournure === 0
          ? `Range du plus petit au plus grand : ${liste}.`
          : tournure === 1
            ? `Classe ces grandeurs dans l'ordre croissant : ${liste}.`
            : `Quel est le bon rangement, du plus petit au plus grand, de ces trois grandeurs : ${liste} ?`;
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, faux),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : ranger des grandeurs, c'est ranger leurs EXPOSANTS — un exposant plus grand donne toujours un nombre plus grand, quel que soit le chiffre devant.\n\n" +
          "Méthode : on écrit chaque grandeur en puissance de dix, dans la même unité, puis on range les exposants.\n\n" +
          `Calcul : ${tries.map((o) => `${o.nom} ≈ ${ordreTexte(o)}`).join(", puis ")}.\n\n` +
          "Conclusion : ⚠️ un exposant NÉGATIF plus grand en valeur absolue donne un nombre plus PETIT : $10^{-6}$ est plus petit que $10^{-3}$.",
        canvas: {
          kind: "tableau_donnees",
          headers: ["grandeur", "ordre de grandeur"],
          rows: tries.map((o) => ({ values: [o.nom, ordreTexte(o)] })),
          highlight: { row: 0 },
          caption: "du plus petit au plus grand",
          display: { compact: true, striped: true },
          size: { width: 320 },
        },
      };
    },
  },
  {
    kind: "template",
    id: "4e_ordre_associer_tpl_3_population",
    niveau: "4e",
    matiere: "maths",
    notionId: "ordre_grandeur",
    microId: "ordre_associer",
    difficulty: 3,
    theme: "neutral",
    hint: "Un million, c'est $10^{6}$ ; un milliard, c'est $10^{9}$.",
    tags: ["ordre", "associer", "population", "qcm", "template"],
    generate: () => {
      const p = randomChoice(POPULATIONS);
      const correct = `environ $10^{${p.exposant}}$`;
      const tournure = randomInt(0, 3);
      const text =
        tournure === 0
          ? `Quel est l'ordre de grandeur du nombre d'habitants ${p.de} ?`
          : tournure === 1
            ? `${cap(p.lieu)} : combien d'habitants, à une puissance de 10 près ?`
            : tournure === 2
              ? `La population ${p.de} est de l'ordre de… ?`
              : `Sans chercher le chiffre exact, quelle puissance de 10 donne le mieux la population ${p.de} ?`;
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          `environ $10^{${p.exposant + 1}}$`,
          `environ $10^{${p.exposant - 1}}$`,
          `environ $10^{${p.exposant + 2}}$`,
          `environ $10^{${p.exposant - 2}}$`,
          `environ $10^{${p.exposant + 4}}$`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : un ordre de grandeur donne le RANG, pas le chiffre exact. Une population change tous les ans ; son ordre de grandeur, non.\n\n" +
          "Méthode : on écrit la population sous la forme $a \\times 10^{n}$ ; ici $a$ est proche de 1, donc l'ordre de grandeur est $10^{n}$.\n\n" +
          `Calcul : la population ${p.de} est d'${p.approx}${/milli/.test(p.approx) ? " d'habitants" : " habitants"} (chiffre arrondi), soit environ $${p.mant.replace(",", "{,}")} \\times 10^{${p.exposant}}$.\n\n` +
          "Conclusion : ⭐ c'est précisément ce qui rend l'ordre de grandeur utile : il reste vrai des années, quand le nombre exact est faux dès le lendemain.",
      };
    },
  },

  /* =========================================================================
     ORDRE_ESTIMER — arrondir, puis multiplier des puissances de dix
  ========================================================================= */
  {
    kind: "template",
    id: "4e_ordre_estimer_tpl_1_produit",
    niveau: "4e",
    matiere: "maths",
    notionId: "ordre_grandeur",
    microId: "ordre_estimer",
    difficulty: 3,
    theme: "neutral",
    hint: "On arrondit chaque facteur à une puissance de dix, puis on ajoute les exposants.",
    tags: ["ordre", "estimer", "qcm", "template"],
    generate: () => {
      const s = randomChoice(PRODUITS);
      const va = tire(s.pa, 1, 1.7);
      const vb = tire(s.pb, 1, 1.7);
      const k = s.pa + s.pb;
      const phrase = s.t(fr(va), fr(vb));
      const quoiU = s.u ? `${s.quoi}, ${s.u}` : s.quoi;
      const tournure = randomInt(0, 3);
      const text =
        tournure === 0
          ? `${phrase} Quel est l'ordre de grandeur ${de(quoiU)} ?`
          : tournure === 1
            ? `${phrase} Sans poser la multiplication, estime ${quoiU} : quelle puissance de 10 choisis-tu ?`
            : tournure === 2
              ? `${phrase} ${cap(s.quoi)} est plutôt de l'ordre de… ?`
              : `${phrase} Pour contrôler un calcul, on cherche l'ordre de grandeur ${de(s.quoi)}. Lequel est le bon ?`;
      const correct = `environ $10^{${k}}$`;
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          `environ $10^{${k + 1}}$`,
          `environ $10^{${k - 1}}$`,
          `environ $10^{${k + 2}}$`,
          `environ $10^{${s.pa * s.pb}}$`,
          `environ $10^{${Math.max(s.pa, s.pb)}}$`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : estimer un ordre de grandeur, c'est remplacer chaque nombre par la puissance de dix la plus proche, puis calculer.\n\n" +
          "Méthode : on arrondit, puis on AJOUTE les exposants — car multiplier des puissances de dix revient à ajouter leurs exposants.\n\n" +
          `Calcul : $${tex(va)} \\approx 10^{${s.pa}}$ et $${tex(vb)} \\approx 10^{${s.pb}}$, donc le produit vaut environ $10^{${s.pa}} \\times 10^{${s.pb}} = 10^{${k}}$. (Le calcul exact donne ${fr(va * vb)}, qui est bien de cet ordre.)\n\n` +
          (s.pa * s.pb !== k
            ? `Conclusion : ⚠️ on AJOUTE les exposants, on ne les multiplie pas : $10^{${s.pa}} \\times 10^{${s.pb}}$ ne fait pas $10^{${s.pa * s.pb}}$.`
            : `Conclusion : ⚠️ on AJOUTE les exposants : $10^{${s.pa}} \\times 10^{${s.pb}} = 10^{${s.pa} + ${s.pb}}$. Ici, multiplier 2 par 2 donnerait le même nombre par hasard — la règle reste l'addition.`),
      };
    },
  },
  {
    kind: "template",
    id: "4e_ordre_estimer_tpl_2_situation",
    niveau: "4e",
    matiere: "maths",
    notionId: "ordre_grandeur",
    microId: "ordre_estimer",
    difficulty: 4,
    theme: "neutral",
    hint: "On arrondit les deux nombres à des puissances de dix avant de multiplier.",
    tags: ["ordre", "estimer", "probleme", "template"],
    generate: () => {
      const s = randomChoice(MONTANTS);
      const va = tire(s.pa, 1, 1.7);
      const vb = tire(s.pb, 1, 1.7);
      const k = s.pa + s.pb;
      const estimation = Math.pow(10, k);
      const phrase = s.t(fr(va), fr(vb));
      const tournure = randomInt(0, 3);
      const question =
        tournure === 0
          ? "Quel est l'ordre de grandeur du montant total, en euros ?"
          : tournure === 1
            ? "Estime la somme totale : à quelle puissance de 10 correspond-elle, en euros ?"
            : tournure === 2
              ? "Sans calculer exactement, combien d'euros cela fait-il, à une puissance de 10 près ?"
              : "Donne l'ordre de grandeur du total payé, en euros.";
      return {
        text: `${phrase} ${question} (Réponds par 10, 100, 1 000…)`,
        format: "short",
        expected: [`${estimation} €`, String(estimation), fr(estimation), `${fr(estimation)} €`, `10^${k}`, `10${sup(k)}`, `10^${k} €`, `10${sup(k)} €`],
        comparator: "number_equal",
        explanation:
          "Définition : un ordre de grandeur remplace chaque nombre par la puissance de dix la plus proche.\n\n" +
          "Méthode : on arrondit d'abord, on multiplie ensuite. On ne calcule JAMAIS le produit exact pour l'arrondir après — ce serait faire le travail qu'on cherche à éviter.\n\n" +
          `Calcul : $${tex(va)} \\approx ${tex(Math.pow(10, s.pa))}$ et $${tex(vb)} \\approx ${tex(Math.pow(10, s.pb))}$, donc le total vaut environ $${tex(Math.pow(10, s.pa))} \\times ${tex(Math.pow(10, s.pb))} = ${tex(estimation)}$ €.\n\n` +
          `Conclusion : ⭐ le total exact vaut ${fr(va * vb)} €. L'estimation ne le donne pas — elle dit dans quel RANG il tombe, et c'est ce qui permet de repérer une erreur de facteur dix.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_ordre_estimer_tpl_3_quotient",
    niveau: "4e",
    matiere: "maths",
    notionId: "ordre_grandeur",
    microId: "ordre_estimer",
    difficulty: 5,
    theme: "neutral",
    hint: "Diviser des puissances de dix, c'est SOUSTRAIRE les exposants.",
    tags: ["ordre", "estimer", "quotient", "qcm", "template"],
    generate: () => {
      const s = randomChoice(QUOTIENTS);
      const vn = tire(s.pn, 1.3, 2.5);
      const vd = tire(s.pd, 1, 1.3);
      const k = s.pn - s.pd;
      const phrase = s.t(fr(vn), fr(vd));
      const quoiU = s.u ? `${s.quoi}, ${s.u}` : s.quoi;
      const tournure = randomInt(0, 2);
      const text =
        tournure === 0
          ? `${phrase} Quel est l'ordre de grandeur ${de(quoiU)} ?`
          : tournure === 1
            ? `${phrase} Estime ${quoiU} : choisis la bonne puissance de 10.`
            : `${phrase} Sans poser la division, que vaut environ ${quoiU} ?`;
      const correct = `environ $10^{${k}}$`;
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          `environ $10^{${s.pn + s.pd}}$`,
          `environ $10^{${-k}}$`,
          `environ $10^{${k + 1}}$`,
          `environ $10^{${k - 1}}$`,
          `environ $10^{${s.pn}}$`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : diviser deux puissances de dix revient à SOUSTRAIRE leurs exposants.\n\n" +
          "Méthode : on arrondit chaque nombre à une puissance de dix, puis exposant du haut moins exposant du bas.\n\n" +
          `Calcul : $${tex(vn)} \\approx 10^{${s.pn}}$ et $${tex(vd)} \\approx 10^{${s.pd}}$, donc $10^{${s.pn}} \\div 10^{${s.pd}} = 10^{${s.pn} - ${s.pd < 0 ? `(${s.pd})` : s.pd}} = 10^{${k}}$. (Le calcul exact donne environ ${fr(Math.round((vn / vd) * Math.pow(10, 2 - k)) / Math.pow(10, 2 - k))}.)\n\n` +
          `Conclusion : ⚠️ le piège est d'ajouter au lieu de soustraire. On ajoute pour un PRODUIT, on soustrait pour un QUOTIENT.`,
      };
    },
  },

  /* =========================================================================
     ORDRE_VRAISEMBLANCE — juger un résultat sans le refaire
  ========================================================================= */
  {
    kind: "template",
    id: "4e_ordre_vraisemblance_tpl_1_facteur_dix",
    niveau: "4e",
    matiere: "maths",
    notionId: "ordre_grandeur",
    microId: "ordre_vraisemblance",
    difficulty: 4,
    theme: "neutral",
    hint: "Arrondis chaque nombre à un seul chiffre, multiplie, et compare au résultat annoncé.",
    tags: ["ordre", "vraisemblance", "qcm", "template", "canvas"],
    generate: () => {
      const c = randomChoice(CALCULS);
      const va = randomInt(c.a[0], c.a[1]);
      const vb = c.b.length === 2 ? randomInt(c.b[0], c.b[1]) : randomChoice(c.b);
      const exact = va * vb;
      const juste = Math.random() < 0.5;
      const annonce = juste ? exact : exact * randomChoice([10, 100, 0.1] as const);
      const ra = arrondi1(va);
      const rb = arrondi1(vb);
      const est = ra * rb;
      const ctx = c.ctx(fr(va), fr(vb));
      const ann = `${fr(annonce)}${c.u}`;
      const prenom = randomChoice(PRENOMS);
      const tournure = randomInt(0, 3);
      const text =
        tournure === 0
          ? `${prenom} calcule ${ctx} et annonce ${ann}. Sans refaire le calcul, que peut-on dire ?`
          : tournure === 1
            ? `On a calculé ${ctx} et trouvé ${ann}. Ce résultat est-il plausible ?`
            : tournure === 2
              ? `Résultat annoncé pour ${ctx} : ${ann}. Que dit l'ordre de grandeur ?`
              : `${prenom} trouve ${ann} pour ${ctx}. Ce résultat tient-il la route ?`;
      const correct = juste
        ? "plausible : le bon nombre de chiffres"
        : "faux : l'ordre de grandeur ne colle pas";
      return {
        text,
        format: "qcm",
        choices: shuffle([
          "plausible : le bon nombre de chiffres",
          "faux : l'ordre de grandeur ne colle pas",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : contrôler la vraisemblance, c'est comparer l'ordre de grandeur du résultat annoncé à celui qu'on attend — sans refaire le calcul.\n\n" +
          "Méthode : on arrondit chaque nombre à un seul chiffre significatif, on multiplie, puis on compare.\n\n" +
          `Calcul : ${fr(va)} ≈ ${fr(ra)} et ${fr(vb)} ≈ ${fr(rb)}, donc on attend environ ${fr(ra)} × ${fr(rb)} = ${fr(est)}${c.u}.\n\n` +
          (juste
            ? `Conclusion : ${ann} est bien dans ce rang. Le résultat est plausible — ce qui ne veut pas dire exact, mais permet de continuer.`
            : `Conclusion : ⚠️ ${ann} n'est pas dans ce rang (le bon résultat est ${fr(exact)}${c.u}). C'est l'erreur de virgule ou de zéro la plus courante, et elle se repère en trois secondes.`),
        canvas: {
          kind: "tableau_donnees",
          headers: ["ce qu'on attend", "ce qui est annoncé"],
          rows: [{ values: [`≈ ${fr(est)}${c.u}`, ann] }],
          highlight: { col: 1 },
          caption: juste ? "même rang" : "pas le même rang",
          display: { compact: true, striped: true },
          size: { width: 320 },
        },
      };
    },
  },
  {
    kind: "template",
    id: "4e_ordre_vraisemblance_tpl_2_situation",
    niveau: "4e",
    matiere: "maths",
    notionId: "ordre_grandeur",
    microId: "ordre_vraisemblance",
    difficulty: 4,
    theme: "neutral",
    hint: "Le résultat respecte-t-il le SENS de la situation ? Compare-le à ce que tu connais.",
    tags: ["ordre", "vraisemblance", "sens", "qcm", "template"],
    generate: () => {
      const s = randomChoice(SITUATIONS);
      const cas = randomChoice(["ok", "grand", "petit"] as const);
      const val = cas === "ok" ? s.bon : cas === "grand" ? s.grand : s.petit;
      const prenom = randomChoice(PRENOMS);
      const tournure = randomInt(0, 3);
      const text =
        tournure === 0
          ? `Un élève calcule ${s.obj} et trouve ${val}. Que peut-on dire de ce résultat ?`
          : tournure === 1
            ? `Dans un exercice, on obtient ${val} pour ${s.obj}. Ce résultat est-il vraisemblable ?`
            : tournure === 2
              ? `${prenom} affirme que ${s.obj} est d'environ ${val}. Qu'en dis-tu ?`
              : `Résultat annoncé pour ${s.obj} : ${val}. Sans refaire de calcul, que peut-on dire ?`;
      const correct = VERDICTS[cas];
      return {
        text,
        format: "qcm",
        choices: shuffle([VERDICTS.ok, VERDICTS.grand, VERDICTS.petit, VERDICTS.rien]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : un résultat peut être faux sans qu'on ait besoin de refaire le calcul — il suffit qu'il contredise ce qu'on sait du monde.\n\n" +
          "Méthode : on se demande dans quel rang le résultat DEVRAIT tomber, et on compare.\n\n" +
          `Calcul : ${s.obj} est de l'ordre de ${s.bon}. ` +
          (cas === "ok"
            ? `${cap(val)}, c'est bien ce rang.\n\n`
            : cas === "grand"
              ? `${cap(val)}, c'est au moins dix fois trop.\n\n`
              : `${cap(val)}, c'est au moins dix fois trop peu.\n\n`) +
          "Conclusion : ⭐ ce réflexe fait gagner des points sans rien calculer — et il sert bien au-delà des mathématiques.",
      };
    },
  },
  {
    kind: "template",
    id: "4e_ordre_vraisemblance_tpl_3_unite",
    niveau: "4e",
    matiere: "maths",
    notionId: "ordre_grandeur",
    microId: "ordre_vraisemblance",
    difficulty: 5,
    theme: "neutral",
    hint: "Regarde d'abord si l'unité est plausible pour cet objet.",
    tags: ["ordre", "vraisemblance", "unite", "qcm", "template"],
    generate: () => {
      const m = randomChoice(MESURES);
      const bon = Math.random() < 0.4;
      const eLu = bon ? m.e : randomChoice(m.faux);
      const x = valeurDe(m.n);
      const val = `${m.n} ${mot(eLu, m.u, x)}`;
      const cas = eLu === m.e ? "ok" : eLu > m.e ? "grand" : "petit";
      const prenom = randomChoice(PRENOMS);
      const tournure = randomInt(0, 3);
      const text =
        tournure === 0
          ? `On lit : « ${cap(m.obj)} : ${val}. » Qu'en penses-tu ?`
          : tournure === 1
            ? `Dans un exposé, ${prenom} écrit que ${m.obj} est de ${val}. L'unité est-elle bien choisie ?`
            : tournure === 2
              ? `Une fiche indique ${val} pour ${m.obj}. Cet ordre de grandeur est-il cohérent ?`
              : `${cap(m.obj)} vaudrait ${val}. Vraisemblable, ou erreur d'unité ?`;
      const ecart = Math.abs(eLu - m.e);
      const nomLu = prefixe(eLu).nom || "l'unité seule";
      return {
        text,
        format: "qcm",
        choices: shuffle([UNITE_VERDICTS.ok, UNITE_VERDICTS.grand, UNITE_VERDICTS.petit]),
        expected: [UNITE_VERDICTS[cas]],
        comparator: "mcq_exact",
        explanation:
          "Définition : une unité mal choisie se repère à l'ordre de grandeur, avant tout calcul.\n\n" +
          "Méthode : on compare l'exposant du préfixe lu à celui qu'on attend pour cet objet.\n\n" +
          `Calcul : ${m.obj} est d'environ ${m.n} ${mot(m.e, m.u, x)}, soit un préfixe en $10^{${m.e}}$ ; on lit ${nomLu === "l'unité seule" ? "l'unité seule" : `« ${nomLu} »`}, en $10^{${eLu}}$.\n\n` +
          (cas === "ok"
            ? "Conclusion : les deux exposants sont les mêmes, la lecture est cohérente."
            : `Conclusion : ⚠️ l'écart est un facteur $10^{${ecart}}$ — c'est absurde. ⭐ Une unité n'est pas une étiquette qu'on colle : elle porte un ordre de grandeur.`),
      };
    },
  },

  /* =========================================================================
     ORDRE_DEFI
  ========================================================================= */
  {
    kind: "template",
    id: "4e_ordre_defi_tpl_1_combien_de_fois",
    niveau: "4e",
    matiere: "maths",
    notionId: "ordre_grandeur",
    microId: "ordre_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "On soustrait les exposants des deux ordres de grandeur.",
    tags: ["ordre", "defi", "comparer", "qcm", "template"],
    generate: () => {
      const unite = randomChoice(["m", "m", "kg", "s"] as const);
      const candidats = OBJETS.filter((o) => o.unite === unite);
      let deux = shuffle(candidats).slice(0, 2);
      // ⚠️ Un écart d'au moins deux rangs : à un seul rang, les chiffres devant
      // (1 kg contre 0,25 kg) pèsent autant que l'exposant, et « 10¹ fois » devient discutable.
      while (Math.abs(deux[0].exposant - deux[1].exposant) < 2) deux = shuffle(candidats).slice(0, 2);
      const [petit, grand] = deux.sort((x, y) => x.exposant - y.exposant);
      const k = grand.exposant - petit.exposant;
      const tournure = randomInt(0, 2);
      const sfx = tournure === 0 ? " fois" : "";
      const text =
        tournure === 0
          ? `Environ combien de fois ${grand.nom} est-${grand.f ? "elle" : "il"} plus grand${grand.f ? "e" : ""} que ${petit.nom} ?`
          : tournure === 1
            ? `Par combien faut-il multiplier ${petit.nom} pour obtenir ${grand.nom}, en ordre de grandeur ?`
            : `Quel est l'ordre de grandeur du rapport entre ${grand.nom} et ${petit.nom} ?`;
      const correct = `environ $10^{${k}}$${sfx}`;
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          `environ $10^{${k + 2}}$${sfx}`,
          `environ $10^{${Math.max(1, k - 2)}}$${sfx}`,
          `environ ${k}${sfx}`,
          `environ $10^{${grand.exposant}}$${sfx}`,
          `environ $10^{${Math.abs(grand.exposant) + Math.abs(petit.exposant) + 2}}$${sfx}`,
          `environ $10^{${k + 1}}$${sfx}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : comparer deux ordres de grandeur, c'est diviser l'un par l'autre — donc SOUSTRAIRE leurs exposants.\n\n" +
          "Méthode : on écrit les deux ordres dans la même unité, puis on fait la différence des exposants.\n\n" +
          `Calcul : ${grand.nom} ≈ ${ordreTexte(grand)} et ${petit.nom} ≈ ${ordreTexte(petit)}, donc le rapport vaut $10^{${grand.exposant}} \\div 10^{${petit.exposant}} = 10^{${k}}$.\n\n` +
          `Conclusion : ⭐ un rapport de $10^{${k}}$ n'a souvent pas d'équivalent dans l'expérience quotidienne — c'est exactement pour cela qu'on écrit en puissances de dix plutôt qu'en chiffres.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_ordre_defi_tpl_2_erreur_a_trouver",
    niveau: "4e",
    matiere: "maths",
    notionId: "ordre_grandeur",
    microId: "ordre_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Fais la conversion toi-même, puis cherche le FACTEUR entre ton résultat et celui annoncé.",
    tags: ["ordre", "defi", "vraisemblance", "qcm", "template"],
    generate: () => {
      const { u, grand, petit } = randomChoice(PAIRES_CONV);
      const n = grand - petit === 6 ? randomInt(2, 9) : randomChoice([2, 3, 4, 5, 6, 7, 8, 9, 12, 15, 25, 40, 75]);
      const juste = n * Math.pow(10, grand - petit);
      const annonce = randomChoice([juste / 1000, juste * 1000]);
      const diag = (v: number) =>
        v > annonce ? `il manque un facteur ${fr(v / annonce)}` : `il y a un facteur ${fr(annonce / v)} de trop`;
      const choix = (v: number) => `c'est ${fr(v)} ${mot(petit, u, v)} : ${diag(v)}`;
      const correct = choix(juste);
      const leurres = [juste * 1000, juste * 10, juste / 10, juste / 1000]
        .filter((v) => v !== annonce && Number.isInteger(v) && v >= 1)
        .map(choix);
      const de1 = `${fr(n)} ${mot(grand, u, n)}`;
      const vers = `${fr(annonce)} ${mot(petit, u, annonce)}`;
      const prenom = randomChoice(PRENOMS);
      const tournure = randomInt(0, 2);
      const text =
        tournure === 0
          ? `${prenom} convertit ${de1} en ${motPl(petit, u)} et trouve ${vers}. Où est l'erreur ?`
          : tournure === 1
            ? `Conversion à vérifier : ${de1} = ${vers}. Que faut-il corriger ?`
            : `Dans une copie, on lit « ${de1} font ${vers} ». Quelle est l'erreur ?`;
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [...leurres, "il n'y a pas d'erreur"]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : les erreurs d'ordre de grandeur sont presque toujours des facteurs 10, 100 ou 1 000 — jamais des erreurs de calcul fines.\n\n" +
          "Méthode : on écrit les deux unités en puissances de dix, on fait la conversion, puis on cherche le rapport entre le juste et l'annoncé.\n\n" +
          `Calcul : 1 ${mot(grand, u)} $= 10^{${grand - petit}}$ ${motPl(petit, u)}, donc ${de1} $= ${tex(n)} \\times 10^{${grand - petit}}$ ${motPl(petit, u)}, soit ${fr(juste)} ${mot(petit, u, juste)}. L'annonce ${vers} est ${annonce < juste ? "1 000 fois trop petite" : "1 000 fois trop grande"}.\n\n` +
          "Conclusion : ⭐ chercher le FACTEUR entre les deux — 10, 100, 1 000 — mène droit à l'erreur, parce qu'il dit combien de rangs ont été perdus.",
      };
    },
  },
  {
    kind: "template",
    id: "4e_ordre_defi_tpl_3_prefixe_et_calcul",
    niveau: "4e",
    matiere: "maths",
    notionId: "ordre_grandeur",
    microId: "ordre_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "On remplace d'abord chaque préfixe par sa puissance de dix.",
    tags: ["ordre", "defi", "prefixe", "template"],
    generate: () => {
      const c = randomChoice(CONVERSIONS_DEFI);
      const v = randomChoice(c.vals);
      const d = c.grand - c.petit;
      const resultat = Math.round(v * Math.pow(10, d));
      const pl = motPl(c.petit, c.u);
      const phrase = c.t(`${fr(v)} ${mot(c.grand, c.u, v)}`);
      const tournure = randomInt(0, 2);
      const question =
        tournure === 0
          ? `Combien cela fait-il ${deNu(pl)} ?`
          : tournure === 1
            ? `Convertis cette valeur en ${pl}.`
            : `Exprime cette mesure en ${pl}.`;
      const nomGrand = prefixe(c.grand).nom || "l'unité seule";
      const nomPetit = prefixe(c.petit).nom || "l'unité seule";
      return {
        text: `${phrase} ${question} (Réponds par un nombre.)`,
        format: "short",
        expected: nombreVariantes(resultat, [mot(c.petit, c.u, resultat), mot(c.petit, c.u, 1), prefixe(c.petit).symbole + UNITES[c.u].sym]),
        comparator: "number_equal",
        explanation:
          "Définition : passer d'un préfixe à un autre, c'est soustraire leurs exposants.\n\n" +
          "Méthode : on écrit les deux en puissances de dix, puis on divise.\n\n" +
          `Calcul : ${nomGrand} correspond à $10^{${c.grand}}$ et ${nomPetit} à $10^{${c.petit}}$, donc 1 ${mot(c.grand, c.u)} $= 10^{${c.grand}} \\div 10^{${c.petit}} = 10^{${d}}$ ${pl}. Ainsi ${fr(v)} ${mot(c.grand, c.u, v)} $= ${tex(v)} \\times 10^{${d}}$, soit ${fr(resultat)} ${mot(c.petit, c.u, resultat)}.\n\n` +
          (c.petit < 0
            ? `Conclusion : ⚠️ soustraire un exposant NÉGATIF, c'est l'ajouter. Et le nombre obtenu doit être plus GRAND que ${fr(v)}, puisqu'on passe à une unité plus petite.`
            : `Conclusion : ⚠️ le nombre obtenu doit être plus GRAND que ${fr(v)}, puisqu'on passe à une unité plus petite : il en faut davantage.`),
      };
    },
  },
];
